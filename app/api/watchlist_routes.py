from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, PortfolioHistory, Watchlist, watchlists_stocks, db
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, current_user_portfolio, print_data

watchlists_routes = Blueprint('watchlists', __name__)


@watchlists_routes.route("/")
def get_user_watchlists():
    '''
    get a list of ALL current user watchlists
    '''
    user_id = current_user.to_dict()["id"]
    watchlists_data = Watchlist.query.filter(Watchlist.user_id == user_id)
    watchlists_list = to_dict_list(watchlists_data)

    stocks_data = watchlists_stocks.filter(watchlists_stocks.c.watchlist_id == 1).all()

    print_data("watchlist stocks", stocks_data)
    return watchlists_list

# ------------------------------------------------------------------------------
@watchlists_routes.route("/<int:id>", methods=["POST"])
def create_watchlist():
    '''
    create a user watchlist
    '''
    res = request.get_json()

    new_watchlist = Watchlist(
        user_id=res["userId"],
        name=res["name"]
    )
    db.session.add(new_watchlist)
    db.session.commit()
    return new_watchlist.to_dict()

# ------------------------------------------------------------------------------
@watchlists_routes.route("/<int:id>", methods=["DELETE"])
def delete_watchlist(id):
    '''
    delete a user watchlist
    '''
    watchlist = Watchlist.query.get(id)

    db.session.delete(watchlist)
    db.session.commit()
    return {"Response": f"Successfully deleted watchlist {id}"}

# ------------------------------------------------------------------------------

