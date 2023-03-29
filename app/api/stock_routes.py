from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment, Portfolio
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user

stock_routes = Blueprint('stock', __name__)


@stock_routes.route('/<string:ticker>')
def get_stock_info(ticker):
    '''
    Get stock info from db
    '''
    stock = Stock.query.get(ticker)
    if not stock:
        return {"error":"stock not in database"}
    else:
        stock_dict = stock.to_dict()
        return stock_dict


@stock_routes.route('/', methods=["POST"])
def add_stock():
    '''
    Add stock info to db
    '''
    res = request.get_json()


    added_stock = Stock(
        ticker=res["ticker"],
        name=res["name"],
        description=res["description"],
        employees=res["employees"],
        listed=res["listed"],
    )

    print

    db.session.add(added_stock)
    db.session.commit()
    return added_stock.to_dict()
