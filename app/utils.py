from flask_login import current_user
from app.models import Portfolio, Investment, RecurringInvestment, Transaction, db
from datetime import datetime, timedelta
import requests
import os
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.combining import AndTrigger
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger


def current_user_portfolio():
    '''
    Grabs the current logged in users portfolio information in to_dict format
    '''
    user = current_user.to_dict()
    portfolio_data = Portfolio.query.filter(Portfolio.user_id == user["id"]).one()
    portfolio = portfolio_data.to_dict()
    return portfolio

# ------------------------------------------------------------------------------

def to_dict_list(data):
    '''
    turn a query into a to_dict list
    '''
    return [item.to_dict() for item in list(data)]

# ------------------------------------------------------------------------------

def form_errors_obj_list(validation_errors):
    '''
    Simple function that turns the WTForms validation errors into a simple list
    '''
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append({field:error})
    return errorMessages

# ------------------------------------------------------------------------------
def get_datetime_obj(date):
    '''
    converts JS UTC date string to python datetime obj
    '''

    js_date_format = '%a, %d %b %Y %H:%M:%S %Z'
    datetime_obj = datetime.strptime(date, js_date_format)
    return datetime_obj


# ------------------------------------------------------------------------------
# for output testing (not for actual functionality use)
def print_data(test_data):
    print("\n\n", "Printing data:", "\n\n", test_data, "\n\n\n\n")
    return

# ------------------------------------------------------------------------------
def get_stock_price(ticker):
    '''
    api request to get a stocks price at last close
    '''

    stock_ticker = ticker.upper()
    API_KEY = os.environ.get('API_KEY')
    url = f'https://api.polygon.io/v2/aggs/ticker/{stock_ticker}/prev?adjusted=true&apiKey={API_KEY}'

    res = requests.get(url)

    if res.status == "OK":
        data = res.json()
        stock_price = data.results.c

        return stock_price

    else:
        return f"Error: {res.resultsCount} results found"


# Recurring investment scheduler -----------------------------------------------
scheduler = BackgroundScheduler()
scheduler.get_jobs()

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
