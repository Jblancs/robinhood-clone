from flask_login import current_user
from app.models import Portfolio, Investment
from datetime import datetime



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
def get_datetime_obj(date):
    '''
    converts JS date string to python datetime obj
    '''

    js_date_format = '%a, %d %b %Y %H:%M:%S %Z'
    datetime_obj = datetime.strptime(date, js_date_format)
    return datetime_obj


# ------------------------------------------------------------------------------
# for output testing (not for actual functionality use)
def print_data(test_data):
    print("\n\n", "Printing data:", "\n\n", test_data, "\n\n\n\n")
    return
