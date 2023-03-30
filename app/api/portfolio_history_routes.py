from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment, Portfolio, PortfolioHistory
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, print_data

portfolio_history_routes = Blueprint('portfolio_history', __name__)


@portfolio_history_routes.route('/')
def get_all_portfolio_history():
    '''
    get a list of a users portfolio history
    '''
    portfolio_id = current_user.to_dict()["portfolio"]["id"]
    history_data = PortfolioHistory.query.filter(PortfolioHistory.portfolio_id == portfolio_id).order_by(PortfolioHistory.id)
    history_list = to_dict_list(history_data)

    return history_list
