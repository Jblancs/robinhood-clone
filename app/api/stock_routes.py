from flask import Blueprint, jsonify, session, request
from app.models import Stock, db
from flask_login import current_user, login_user, logout_user, login_required

stock_routes = Blueprint('stock', __name__)


@stock_routes.route('/<string:ticker>')
def get_stock_info(ticker):
    stock = Stock.query.get(ticker)
    stock_dict = stock.to_dict()
    return stock_dict

# @stock_routes.route('/<string:ticker>', methods=["POST"])
# def buy
