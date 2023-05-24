from flask import Blueprint, jsonify, session, request
from app.models import db, RecurringInvestment
from datetime import datetime

recurring_investment_routes = Blueprint('recurring_investment', __name__)
