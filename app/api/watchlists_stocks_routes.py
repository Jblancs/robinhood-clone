from flask import Blueprint, jsonify, session, request
from app.models import Stock, Watchlist, watchlists_stocks, db
from flask_login import current_user
from sqlalchemy import insert, delete
from ..utils import to_dict_list, form_errors_obj_list, current_user_portfolio, print_data

watchlists_stocks_routes = Blueprint('watchlists_stocks', __name__)


@watchlists_stocks_routes.route("/", methods=["POST"])
def add_stock_to_list():
    '''
    Add a stock to one or multiple watchlists
    '''
    res = request.get_json()

    for addInfo in res:
        added_stock = insert(watchlists_stocks).values(
            watchlist_id=addInfo["watchlist_id"],
            ticker=addInfo["ticker"]
        )
        db.session.execute(added_stock)

    db.session.commit()

    return {"Response": "Successfully added stocks to watchlist(s)"}

# ------------------------------------------------------------------------------
@watchlists_stocks_routes.route("/", methods=["DELETE"])
def delete_stock_from_list():
    '''
    remove a stock from one or multiple watchlists
    '''
    res = request.get_json()

    for deleteInfo in res:
        removeStock = delete(watchlists_stocks).where(
            watchlists_stocks.c.watchlist_id == deleteInfo["watchlist_id"] & watchlists_stocks.c.ticker == deleteInfo["ticker"]
        )

    db.session.commit()

    return {"Response": f"Successfully deleted stock from watchlist(s)"}
