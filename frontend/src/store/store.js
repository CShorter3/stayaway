// ./frontend/src/store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({

});

let enhancer;
// prepare enhancer to apply relevant middlewares to the store's dispath method
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

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
} 

export default {store, configureStore}; // double check consequence of object export multiple