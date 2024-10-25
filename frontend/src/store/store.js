// ./frontend/src/store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// import thunk from 'redux-thunk';
// import and export thunk in the same line
import {thunk} from 'redux-thunk';

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

// function to configure the Redux store
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
} 

export { thunk, configureStore };