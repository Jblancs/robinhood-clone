from flask_login import current_user
from app.models import Portfolio, Investment, RecurringInvestment, Transaction, db
from datetime import datetime, timedelta
from .utils import get_stock_price
from pytz import utc
import os
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.combining import AndTrigger
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor


# Recurring investment scheduler setup -------------------------------------------
DATABASE_URL = os.environ.get('DATABASE_URL')

jobstores = {
    'default': SQLAlchemyJobStore(url=DATABASE_URL)
}

executors = {
    'default': ThreadPoolExecutor(20),
    'processpool': ProcessPoolExecutor(5)
}

job_defaults = {
    'coalesce': False,
    'max_instances': 3
}

scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors, job_defaults=job_defaults, timezone=utc)

# ------------------------------------------------------------------------------
def setup_trigger(frequency, job_start_date):
    '''
    get trigger parameter for a recurring investment job
    '''

    if frequency == "Daily":
        trigger = AndTrigger([IntervalTrigger(days=1, start_date=job_start_date), CronTrigger(day_of_week='mon,tue,wed,thurs,fri')])

    elif frequency == "Weekly":
        trigger = IntervalTrigger(days=7, start_date=job_start_date)

    elif frequency == "Bi-Weekly":
        trigger = IntervalTrigger(days=14, start_date=job_start_date)

    elif frequency == "Weekly":
        trigger = IntervalTrigger(days=31, start_date=job_start_date)

    return trigger

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
def setup_recur_job(recur_info, res):
    '''
    sets up apscheduler using recurring investment info
    '''

    job_start_date = recur_info.start_date
    frequency = res["frequency"]

    trigger = setup_trigger(frequency, job_start_date)

    job_id = f'{recur_info.id}'

    scheduler.add_job(
        recur_job_function,
        args=[recur_info],
        trigger=trigger,
        id=job_id,
        replace_existing=True,
        jitter=60
    )

    return {"success": f"Job {job_id} has been added"}

# ------------------------------------------------------------------------------
def edit_recur_job(recur_info, res):
    '''
    function to edit a recurring investment job from APscheduler
    '''

    job_start_date = res["start_date"]
    frequency = res["frequency"]
    job_id = f'{recur_info.id}'

    trigger = setup_trigger(frequency, job_start_date)

    scheduler.reschedule_job(job_id, trigger=trigger)

    return {"success": f"Job {job_id} has been updated"}

# ------------------------------------------------------------------------------
def remove_recur_job(job_id):
    '''
    function to delete a recurring investment job from APscheduler
    '''

    scheduler.remove_job(f'{job_id}')
    return {"success": f"Job {job_id} has been removed"}

# ------------------------------------------------------------------------------
def pause_recur_job(job_id):
    '''
    function to pause an active recurring investment job from APscheduler
    '''

    scheduler.pause_job(f'{job_id}')
    return {"success": f"Job {job_id} has been paused"}

# ------------------------------------------------------------------------------
def resume_recur_job(job_id):
    '''
    function to resume a paused recurring investment job from APscheduler
    '''

    scheduler.resume_job(f'{job_id}')
    return {"success": f"Job {job_id} has been resumed"}
