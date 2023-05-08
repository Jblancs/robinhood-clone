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

# ------------------------------------------------------------------------------
@bank_account_routes.route("/", methods=["POST"])
def create_bank_account():
    '''
    create a bank account for current user
    '''

    current_user_id = current_user.to_dict()["id"]
    res = request.get_json()

    form = BankAccountForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_bank_account = BankAccount(
            user_id=current_user_id,
            bank=res["bank"],
            account_type=res["account_type"],
            account_number=res["account_number"]
        )
        db.session.add(new_bank_account)
        db.session.commit()
        return new_bank_account.to_dict()

    return {'errors': form_errors_obj_list(form.errors)},401

# ------------------------------------------------------------------------------
@bank_account_routes.route("/<int:id>", methods=["PUT"])
def update_bank_account(id):
    '''
    update an existing bank account
    '''

    res = request.get_json()
    bank_account = BankAccount.query.get(id)

    bank_account.account_type = res["account_type"]
    bank_account.account_number = res["account_number"]
    db.session.commit()

    return bank_account.to_dict()

# ------------------------------------------------------------------------------
@bank_account_routes.route("/<int:id>", methods=["DELETE"])
def delete_bank_account(id):
    '''
    delete an existing user bank account
    '''

    bank_account = BankAccount.query.get(id)
    
