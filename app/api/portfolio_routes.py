from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, PortfolioHistory, db
from flask_login import current_user
from ..utils import print_data

portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('/')
def get_portfolio():
    '''
    Get portfolio and portfolio history information to display on graph
    '''
    user = current_user.to_dict()
    portfolio = Portfolio.query.get(user["portfolio"]["id"])

    return portfolio.to_dict()

# ------------------------------------------------------------------------------
@portfolio_routes.route('/', methods=["POST"])
def create_portfolio():
    '''
    Creates portfolio on sign up
    '''
    res = request.get_json()

    new_portfolio = Portfolio(
        user_id=res["userId"],
        buying_power=0
    )
    db.session.add(new_portfolio)
    db.session.commit()
    return new_portfolio.to_dict()

# ------------------------------------------------------------------------------
@portfolio_routes.route('/', methods=["PUT"])
def update_portfolio():
    '''
    Update buying power when you buy/sell stocks
    '''
    res = request.get_json()
    user = current_user.to_dict()
    portfolio = Portfolio.query.get(user["portfolio"]["id"])

    if res["type"] == "buy":
        portfolio.buying_power = portfolio.buying_power - res["total_cost"]
        db.session.commit()
    else:
        portfolio.buying_power = portfolio.buying_power + res["total_cost"]
        db.session.commit()

    return portfolio.to_dict()

# ------------------------------------------------------------------------------
@portfolio_routes.route('/transfer', methods=["PUT"])
def transfer_buying_power():
    '''
    Update buying power when you make a deposit/withdrawal
    '''

    res = request.get_json()
    user = current_user.to_dict()
    portfolio = Portfolio.query.get(user["portfolio"]["id"])

    print_data("transfer form", res)

    if res["type"] == "Deposit":
        portfolio.buying_power = portfolio.buying_power + float(res["amount"])
        db.session.commit()
    else:
        portfolio.buying_power = portfolio.buying_power - float(res["amount"])
        db.session.commit()

    return portfolio.to_dict()
