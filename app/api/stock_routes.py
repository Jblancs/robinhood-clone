from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, PortfolioHistory, db
from flask_login import current_user, login_user, logout_user, login_required

stock_routes = Blueprint('stock', __name__)
