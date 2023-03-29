import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import investReducer from './investment';
import portfolioReducer from './portfolio';
import session from './session'
import transactionReducer from './transaction';
import historyReducer from './portfolioHistory';
import stockReducer from './stock';

const rootReducer = combineReducers({
  session,
  portfolio: portfolioReducer,
  investments: investReducer,
  transactions: transactionReducer,
  history: historyReducer,
  stock: stockReducer
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
