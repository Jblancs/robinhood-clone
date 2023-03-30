from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, PortfolioHistory, Watchlist, watchlists_stocks, db
from app.forms import WatchlistForm
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

    return watchlists_list

# ------------------------------------------------------------------------------
@watchlists_routes.route("/<int:id>", methods=["POST"])
def create_watchlist(id):
    '''
    create a user watchlist
    '''
    res = request.get_json()
    form = WatchlistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_watchlist = Watchlist(
            user_id=res["userId"],
            name=res["name"]
        )
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()

    return {'errors': form_errors_obj_list(form.errors)}, 401


# ------------------------------------------------------------------------------
@watchlists_routes.route("/<int:id>", methods=["PUT"])
def update_watchlist(id):
    '''
    update name of a user watchlist
    '''
    res = request.get_json()
    watchlist = Watchlist.query.get(id)

    watchlist.name = res["name"]
    db.session.commit()

    return watchlist.to_dict()

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
