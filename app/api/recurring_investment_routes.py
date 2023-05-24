from flask import Blueprint, jsonify, session, request
from app.models import db, RecurringInvestment
from ..forms import recurring_investment_form
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, print_data
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

    form = recurring_investment_form()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
            new_recurring_inv = RecurringInvestment(
                ticker=res["ticker"],
                portfolio_id=user_portfolio_id,
                shares=res["shares"],
                start_date=res["start_date"],
                frequency=res["frequency"],
                paused=False
            )
            db.session.add(new_recurring_inv)
            db.session.commit()
            return new_recurring_inv.to_dict()

    return {'errors': form_errors_obj_list(form.errors)},401

# ------------------------------------------------------------------------------
@recurring_investment_routes.route("/<int:id>", methods=["PUT"])
def update_recurring_investment(id):
    '''
    update recurring investment information or pause/resume
    '''

    res = request.get_json()
    recurring_inv = RecurringInvestment.query.get(id)
    paused_boolean = recurring_inv.paused

    if res["type"] == "pause":
        recurring_inv.paused = not paused_boolean

        db.session.commit()
        return recurring_inv.to_dict()

    else:
        recurring_inv.shares=res["shares"]
        recurring_inv.start_date=res["start_date"]
        recurring_inv.frequency=res["frequency"]

        db.session.commit()
        return recurring_inv.to_dict()
