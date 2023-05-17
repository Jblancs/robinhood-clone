from flask import Blueprint, jsonify, session, request
from app.models import db, Transfer
from ..forms import TransferWithdrawForm, TransferDepositForm
from datetime import datetime
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, print_data

transfer_routes = Blueprint('transfer', __name__)


@transfer_routes.route("/")
def get_user_transfers():
    '''
    get a list of ALL current users transfers
    '''

    current_user_id = current_user.to_dict()["id"]

    transfer_data = Transfer.query.filter(Transfer.user_id == current_user_id)


    if transfer_data:
        transfer_list = to_dict_list(transfer_data)
        return transfer_list
    else:
        return {"error": "No transfers made for this user"}

# ------------------------------------------------------------------------------
@transfer_routes.route("/", methods=["POST"])
def create_transfer():
    '''
    create a transfer for the current user
    '''

    user = current_user.to_dict()
    res = request.get_json()

    if res["type"] == "Deposit":
        form = TransferDepositForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
    else:
        form = TransferWithdrawForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_transfer = Transfer(
            portfolio_id=user["portfolio"]["id"],
            bank_account_id=res["bank_account_id"],
            user_id=user["id"],
            amount=res["amount"],
            type=res["type"],
            date=datetime.now()
        )
        db.session.add(new_transfer)
        db.session.commit()
        return new_transfer.to_dict()

    return {'errors': form_errors_obj_list(form.errors)}, 401
