from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment
from ..forms import TransactionForm
from datetime import datetime
from flask_login import current_user


from flask_login import current_user, login_user, logout_user, login_required

stock_routes = Blueprint('stock', __name__)


@stock_routes.route('/<string:ticker>')
def get_stock_info(ticker):
    stock = Stock.query.get(ticker)
    stock_dict = stock.to_dict()
    return stock_dict

@stock_routes.route('/buy/<string:ticker>', methods=["POST"])
def buy_stock(ticker):
    '''
    Buy specific stock for first time and create a transaction, investment and update portfolio buying power
    '''
    user = current_user.to_dict()
    res = request.get_json()
    portfolio

    form = TransactionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_transaction = Transaction(
            ticker=ticker,
            portfolio_id=user["portfolio"]["id"],
            total_cost=res["total_cost"],
            shares=res["shares"],
            date=datetime.now()
        )

        portfolio

        new_investment = Investment(
            ticker=ticker,
            portfolio_id=user["portfolio"]["id"],
            value=res["total_cost"],
            shares=res["shares"],
        )
