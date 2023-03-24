from flask import Blueprint, jsonify, session, request
from app.models import db, Transaction, Portfolio
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list

transaction_routes = Blueprint('transaction', __name__)


@transaction_routes.route('/current')
def get_current_user_transactions():
    '''
    get a list of ALL current user transactions
    '''
    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    transaction_data = Transaction.query.filter(Transaction.portfolio_id == portfolio_id).order_by(Transaction.id).desc()
    transaction_list = to_dict_list(transaction_data)

    return transaction_list

# ------------------------------------------------------------------------------
@transaction_routes.route('/<string:ticker>')
def get_transaction_by_ticker(ticker):
    '''
    get a list of current user transactions for a specific stock
    '''
    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    transaction_data = Transaction.query.filter(
        Transaction.portfolio_id == portfolio_id,
        Transaction.ticker == ticker
        ).order_by(Transaction.id)

    transaction_list = to_dict_list(transaction_data)

    return transaction_list

# ------------------------------------------------------------------------------
@transaction_routes.route('/<string:ticker>', methods=["POST"])
def create_transaction(ticker):
    '''
    get a list of current user transactions for a specific stock
    '''
    user = current_user.to_dict()
    portfolio_id = user["portfolio"]["id"]
    res = request.get_json()

    if res["type"] == "buy":
        form = TransactionBuyForm()
    else:
        form = TransactionSellForm()

    if form.validate_on_submit():
        new_transaction = Transaction(
            ticker=ticker,
            portfolio_id=portfolio_id,
            total_cost=res["total_cost"],
            shares=res["shares"],
            date=datetime.now()
        )
        db.session.add(new_transaction)
        db.session.commit()

    return {'errors': form_errors_obj_list(form.errors)}, 401