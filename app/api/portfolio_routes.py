from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, PortfolioHistory, db
from flask_login import current_user, login_user, logout_user, login_required

portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('/')
def get_portfolio():
    '''
    Get portfolio and portfolio history information to display on graph
    '''
    user = current_user.to_dict()
    portfolio_data = Portfolio.query.filter(Portfolio.user_id == user["id"])

    portfolio = list(portfolio_data)[0].to_dict()

    return portfolio


