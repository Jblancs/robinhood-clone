from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, PortfolioHistory, db
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, current_user_portfolio

portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('/')
def get_portfolio():
    '''
    Get portfolio and portfolio history information to display on graph
    '''
    user = current_user.to_dict()
    portfolio = Portfolio.query.get(user["portfolio"]["id"])

    # portfolio_history_data = PortfolioHistory.query.filter(
    #     PortfolioHistory.portfolio_id == user["portfolio"]["id"])

    # portfolio_history_list = to_dict_list(portfolio_history_data)

    # user["portfolio"]["history"] = portfolio_history_list

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
