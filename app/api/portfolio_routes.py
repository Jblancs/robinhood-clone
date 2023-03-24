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

    portfolio_history_data = PortfolioHistory.query.filter(
        PortfolioHistory.portfolio_id == portfolio["id"])

    portfolio_history = [history.to_dict()
                         for history in list(portfolio_history_data)]
    portfolio["history"] = portfolio_history

    print("\n\n\n\n\n *************", portfolio_history_data)

    return portfolio


@portfolio_routes.route('/', methods=["POST"])
def create_portfolio():
    '''
    Creates portfolio on sign up
    '''
    res = request.get_json()

    new_portfolio = Portfolio(
        user_id=res["user_id"],
        buying_power=0
    )
    db.session.add(new_portfolio)
    db.session.commit()
    return new_portfolio.to_dict()
