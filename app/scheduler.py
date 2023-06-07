from flask_login import current_user
from app.models import Portfolio, Investment, RecurringInvestment, Transaction, db
from datetime import datetime, timedelta
from .utils import get_stock_price
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.combining import AndTrigger
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger

# Recurring investment scheduler -----------------------------------------------
scheduler = BackgroundScheduler()

# ------------------------------------------------------------------------------
def recur_job_function(recur_info):
    '''
    Handles scheduled execution of a recurring investment. If there is enough buying power
    create a transaction, update/create investment and update buying power
    '''

    portfolio = Portfolio.query.get(recur_info.portfolio_id)
    recurring_inv = RecurringInvestment.query.get(recur_info.id)
    investment = Investment.query.filter(
        Investment.portfolio_id == recur_info.portfolio_id,
        Investment.ticker == recur_info.ticker
        ).first()

    stock_price = get_stock_price(recur_info.ticker)
    total_cost = round((stock_price * recur_info.shares),2)

    # if you do not have enough buying power pause the job
    if not recur_info.paused and portfolio.buying_power < total_cost:
        scheduler.pause_job(recur_info.id)
        recurring_inv.paused = True
        db.session.commit()
        return

    # otherwise create transaction, update buying power, and update or create an investment
    else:

        transaction_date = datetime.now()
        day_of_week = transaction_date.weekday()
        if day_of_week == 5:
            transaction_date = datetime.now() + timedelta(days=2)
        if day_of_week == 6:
            transaction_date = datetime.now() + timedelta(days=1)

        # create a new transaction
        new_transaction = Transaction(
            ticker=recur_info.ticker,
            portfolio_id=recur_info.portfolio_id,
            total_cost=total_cost,
            shares=recur_info.shares,
            type="buy",
            date=transaction_date
        )
        db.session.add(new_transaction)
        db.session.commit()

        # update buying power
        portfolio.buying_power = portfolio.buying_power - total_cost
        db.session.commit()

        # update or create an investment
        if investment:
            investment.value = investment.value + total_cost
            investment.shares = investment.shares + recurring_inv.shares
            db.session.commit()
        else:
            new_investment = Investment(
                ticker=recur_info.ticker,
                portfolio_id=recur_info.portfolio_id,
                value=total_cost,
                shares=recurring_inv.shares,
            )
            db.session.add(new_investment)
            db.session.commit()

        return

# ------------------------------------------------------------------------------
def setup_apscheduler(recur_info, res):
    '''
    sets up apscheduler using recurring investment info
    '''

    if res["frequency"] == "Daily":
        trigger = AndTrigger([IntervalTrigger(days=1), CronTrigger(day_of_week='mon,tue,wed,thurs,fri')])

    elif res["frequency"] == "Weekly":
        trigger = IntervalTrigger(days=7)

    elif res["frequency"] == "Bi-Weekly":
        trigger = IntervalTrigger(days=14)

    elif res["frequency"] == "Weekly":
        trigger = IntervalTrigger(days=31)

    job_start_date = recur_info.start_date
    job_id = recur_info.id

    scheduler.add_job(
        recur_job_function,
        args=[recur_info],
        trigger=trigger,
        start_date=job_start_date,
        id=f'{job_id}',
    )

    return
