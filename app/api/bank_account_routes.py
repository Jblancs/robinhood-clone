from flask import Blueprint, jsonify, session, request
from app.models import db, BankAccount
from ..forms import BankAccountForm
from datetime import datetime
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, print_data
import math

bank_account_routes = Blueprint('bank_account', __name__)


@bank_account_routes.route("/")
def get_user_bank_accounts():
    '''
    get a list of ALL current users bank accounts
    '''

    current_user_id = current_user.to_dict()["id"]

    bank_account_data = BankAccount.query.filter(BankAccount.user_id == current_user_id)

    if bank_account_data:
        bank_account_list = to_dict_list(bank_account_data)
        return bank_account_list
    else:
        return {"error": "Please add a payment method"}
