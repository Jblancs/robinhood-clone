from flask import Blueprint, jsonify, session, request
from app.models import db, RecurringInvestment
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

    
