// ./frontend/src/store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({

});

let enhancer;
// prepare enhancer to apply middlewares to the store's dispatch method
if(import.meta.env.MODE === 'production'){
    // apply thunk in production envioment
    enhancer = applyMiddleware(thunk);
} else {
    // apply thunk, compose, and logger in development environment
    const logger = (await import("redux-logger")).default;
    const composeEnhancers = 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// allow create Redux store the option to take a preloaded state
const configureStore = (preloadedState) => {
    // plus the root reducer and enhancer
    return createStore(rootReducer, preloadedState, enhancer)
} 

export default configureStore;