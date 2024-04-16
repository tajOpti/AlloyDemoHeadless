// store/store.ts

import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { getRootReducer, getInitialState } from '../store/reducers/rootReducer';
import ReduxThunk from 'redux-thunk';
import { compose } from 'redux';
import { ContentResolver } from '@episerver/content-delivery';

const contentResolver = new ContentResolver();

const middleware = [ReduxThunk.withExtraArgument(contentResolver)];

const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const initStore = (): Store => {
    return createStore(
        getRootReducer(),
        getInitialState(),
        enhancer
    );
};

export default initStore;
