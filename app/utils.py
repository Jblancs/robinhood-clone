from flask_login import current_user
from app.models import Portfolio



def current_user_portfolio():
    '''
    Grabs the current logged in users portfolio information
    '''
    user = current_user.to_dict()
    portfolio_data = Portfolio.query.filter(Portfolio.user_id == user["id"])
    portfolio = list(portfolio_data)[0].to_dict()
    return portfolio
