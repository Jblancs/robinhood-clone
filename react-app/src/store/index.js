import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import investReducer from './investment';
import portfolioReducer from './portfolio';
import session from './session'
import transactionReducer from './transaction';
import historyReducer from './portfolioHistory';
import stockReducer from './stock';
import watchlistsReducer from './watchlist';
import bankReducer from './bankAccount';
import transferReducer from './transfer';
import recurringReducer from './recurring';

const rootReducer = combineReducers({
  session,
  portfolio: portfolioReducer,
  investments: investReducer,
  transactions: transactionReducer,
  history: historyReducer,
  stock: stockReducer,
  watchlists: watchlistsReducer,
  bank: bankReducer,
  transfers: transferReducer,
  recurring: recurringReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
