from flask import Blueprint, jsonify, session, request
from app.models import db, RecurringInvestment
from ..forms import RecurringInvestmentForm
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, print_data, get_datetime_obj
from ..scheduler import setup_recur_job, edit_recur_job, remove_recur_job, pause_recur_job, resume_recur_job
from datetime import datetime

recurring_investment_routes = Blueprint('recurring_investment', __name__)

@recurring_investment_routes.route("/")
def get_user_recurring_investments():
    '''
    get a list of ALL current users recurring investments
    '''

    user_portfolio_id = current_user.to_dict()["portfolio"]["id"]

    bank_account_data = RecurringInvestment.query.filter(RecurringInvestment.portfolio_id == user_portfolio_id)
    bank_account_data_list = list(bank_account_data)

    if bank_account_data_list:
        bank_account_list = to_dict_list(bank_account_data)
        return bank_account_list
    else:
        return {"error": "No recurring investments set up for this user"}

# ------------------------------------------------------------------------------
@recurring_investment_routes.route("/", methods=["POST"])
def create_recurring_investment():
    '''
    create recurring investment for current user
    '''

    user_portfolio_id = current_user.to_dict()["portfolio"]["id"]
    res = request.get_json()

    form = RecurringInvestmentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        # create recurring investment
        new_recurring_inv = RecurringInvestment(
            ticker=res["ticker"],
            portfolio_id=user_portfolio_id,
            shares=res["shares"],
            start_date=get_datetime_obj(res["start_date"]),
            frequency=res["frequency"],
            paused=False
        )
        db.session.add(new_recurring_inv)
        db.session.commit()

        recur_to_dict = new_recurring_inv.to_dict()

        # set up apscheduler for recurring investment
        # setup_recur_job(new_recurring_inv, res)

        return recur_to_dict

    return {'errors': form_errors_obj_list(form.errors)},401

# ------------------------------------------------------------------------------
@recurring_investment_routes.route("/<int:id>", methods=["PUT"])
def update_recurring_investment(id):
    '''
    update recurring investment information
    '''

    res = request.get_json()
    recurring_inv = RecurringInvestment.query.get(id)

    recurring_inv.shares=res["shares"]
    recurring_inv.start_date=get_datetime_obj(res["start_date"])
    recurring_inv.frequency=res["frequency"]

    db.session.commit()

    # update recurring job info
    # edit_recur_job(recurring_inv, res)

    return recurring_inv.to_dict()

# ------------------------------------------------------------------------------
@recurring_investment_routes.route("/pause/<int:id>", methods=["PUT"])
def pause_recurring_investment(id):
    '''
    pause/resume recurring investment
    '''

    res = request.get_json()
    recurring_inv = RecurringInvestment.query.get(id)

    print_data(res)

    if res["type"] == "pause":
        recurring_inv.paused = True

        db.session.commit()

        # pause recurring investment
        # pause_recur_job(id)

        return recurring_inv.to_dict()

    elif res["type"] == "resume":
        recurring_inv.paused = False

        db.session.commit()

        # resume recurring investment
        # resume_recur_job(id)

        return recurring_inv.to_dict()

# ------------------------------------------------------------------------------
@recurring_investment_routes.route("/<int:id>", methods=["DELETE"])
def delete_recurring_investment(id):
    '''
    delete an existing recurring investment
    '''

    recurring_inv = RecurringInvestment.query.get(id)
    ticker = recurring_inv.ticker
    db.session.delete(recurring_inv)
    db.session.commit()

    # delete recurring investment
    # remove_recur_job(id)

    return {"Response": f"Successfully ended recurring investment for stock {ticker}"}
