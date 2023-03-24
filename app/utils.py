from flask_login import current_user
from app.models import Portfolio, Investment



def current_user_portfolio():
    '''
    Grabs the current logged in users portfolio information in to_dict format
    '''
    user = current_user.to_dict()
    portfolio_data = Portfolio.query.filter(Portfolio.user_id == user["id"]).one()
    portfolio = portfolio_data.to_dict()
    return portfolio

# ------------------------------------------------------------------------------

def to_dict_list(data):
    '''
    turn a query into a to_dict list
    '''
    return [item.to_dict() for item in list(data)]

# ------------------------------------------------------------------------------

def form_errors_obj_list(validation_errors):
    '''
    Simple function that turns the WTForms validation errors into a simple list
    '''
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append({field:error})
    return errorMessages

# ------------------------------------------------------------------------------
# for output testing (not for actual functionality use)
def output_test():
    user = current_user.to_dict()
    test_data = Investment.query.filter(
        Investment.ticker == "AAPL",
        Investment.portfolio_id == user["portfolio"]["id"]
        ).first()

    print("\n\n\n Output Test: \n\n\n", test_data, "\n\n\n\n")
    return test_data
