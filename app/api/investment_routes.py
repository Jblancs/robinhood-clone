from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment, Portfolio
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list

investment_routes = Blueprint('investment', __name__)

@investment_routes.route("/")
def get_current_user_investments():
    '''
    get a list of ALL current user Investments
    '''
    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    investment_data = Investment.query.filter(Investment.portfolio_id == portfolio_id).order_by(Investment.id).desc()
    investment_list = to_dict_list(investment_data)

    return investment_list

# ------------------------------------------------------------------------------
@investment_routes.route("/<string:ticker>")
def get_investment_by_ticker(ticker):
    '''
    get a current user investment info for a specific stock
    '''
    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    investment_data = Investment.query.filter(
        Investment.portfolio_id == portfolio_id,
        Investment.ticker == ticker
        ).first()

    if investment_data:
        investment = investment_data.to_dict()
        return investment
    else:
        return {"message": "You do not own this stock"}

# ------------------------------------------------------------------------------
@investment_routes.route("/<string:ticker>", methods=["POST"])
def create_new_investment(ticker):
    '''
    Creates an investment when buying a stock for the the first time
    '''
    res = request.get_json()
    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    new_investment = Investment(
        ticker=ticker,
        portfolio_id=portfolio_id,
        value=res["total_cost"],
        shares=res["shares"],
    )
    db.session.add(new_investment)
    db.session.commit()

    return new_investment.to_dict()

# ------------------------------------------------------------------------------
@investment_routes.route("/<string:ticker>", methods=["PUT"])
def update_investment(ticker):
    '''
    Updates an investment when buying/selling a stock you own
    '''
    res = request.get_json()
    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    investment = Investment.query.filter(
        Investment.portfolio_id == portfolio_id,
        Investment.ticker == ticker
        ).one()

    investment.value = investment["value"] + res["total_cost"]
    investment.shares = investment["shares"] + res["shares"]

    db.session.commit()
    return investment.to_dict()

# ------------------------------------------------------------------------------
@investment_routes.route("/<string:ticker>", methods=["DELETE"])
def delete_investment(ticker):
    '''
    Deletes an investment when selling all shares of a stock you own
    '''

    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    investment = Investment.query.filter(
        Investment.portfolio_id == portfolio_id,
        Investment.ticker == ticker
        ).one()

    db.session.delete(investment)

    return {"Response": f"Successfully sold all shares of {ticker}"}
