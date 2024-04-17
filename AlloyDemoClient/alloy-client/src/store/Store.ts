import { createStore, applyMiddleware, Store, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getRootReducer, getInitialState } from '../store/reducers/rootReducer';
import { ContentResolver } from '@episerver/content-delivery';
import { thunk } from 'redux-thunk';

interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

declare var process: {
    env: {
        NODE_ENV: string
    }
};

const contentResolver = new ContentResolver();

const middleware = applyMiddleware(thunk as any);
let composeEnhancers = compose;

if (
    process.env.NODE_ENV === 'development' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const store: Store = createStore(
    getRootReducer(),
    getInitialState(),
    composeEnhancers(middleware)
);

export default store;
