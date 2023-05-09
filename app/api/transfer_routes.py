from flask import Blueprint, jsonify, session, request
from app.models import db, Transfer
from datetime import datetime
from flask_login import current_user
from ..utils import to_dict_list, form_errors_obj_list, print_data

transfer_routes = Blueprint('transfer', __name__)

@transfer_routes.route("/")
def get_user_transfers():
    '''
    get a list of ALL current users transfers
    '''

    current_user_id = current_user.to_dict()["id"]

    transfer_data = Transfer.query.filter(Transfer.user)
