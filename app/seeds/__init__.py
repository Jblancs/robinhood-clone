from flask.cli import AppGroup
from .users import seed_users, undo_users
from .portfolio_seed import seed_portfolio, undo_portfolio
from .portfolio_history_seed import seed_portfolio_history, undo_portfolio_history
from .investment_seed import seed_investment, undo_investment
from .stock_seed import seed_stock, undo_stock
from .transaction_seed import seed_transaction, undo_transaction
from .transfer_seed import seed_transfer, undo_transfer
from .watchlist_seed import seed_watchlist, undo_watchlist
from .watchlist_stock_seed import seed_watchlist_stock, undo_watchlist_stock


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_transfer()
        undo_transaction()
        undo_investment()
        undo_watchlist_stock()
        undo_stock()
        undo_watchlist()
        undo_portfolio_history()
        undo_portfolio()
        undo_users()
    seed_users()
    seed_portfolio()
    seed_portfolio_history()
    seed_watchlist()
    seed_stock()
    seed_watchlist_stock()
    seed_investment()
    seed_transaction()
    seed_transfer()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_transfer()
    undo_transaction()
    undo_investment()
    undo_watchlist_stock()
    undo_stock()
    undo_watchlist()
    undo_portfolio_history()
    undo_portfolio()
    undo_users()
    # Add other undo functions here
