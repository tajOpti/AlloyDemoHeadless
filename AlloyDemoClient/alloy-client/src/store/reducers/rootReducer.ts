// reducers/rootReducer.ts

import { combineReducers } from 'redux';
import epiDataModelReducer, { initialState as epiDataModelState } from './epiDataModelReducer';
import epiContextReducer, { initialState as epiContextState } from './epiContextReducer';
import appContextReducer, { initialState as appContextState } from './appContextReducer';

export const getRootReducer = () => combineReducers({
    epiDataModel: epiDataModelReducer,
    epiContext: epiContextReducer,
    appContext: appContextReducer,
});

export const getInitialState = () => ({
    epiDataModel: undefined,
    epiContext: undefined,
    appContext: undefined
});
