from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment, Portfolio
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user

stock_routes = Blueprint('stock', __name__)


@stock_routes.route('/<string:ticker>')
def get_stock_info(ticker):
    stock = Stock.query.get(ticker)
    stock_dict = stock.to_dict()
    return stock_dict


