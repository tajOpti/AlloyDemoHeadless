// reducers.ts

import { combineReducers } from 'redux';
import { ResolvedContentStatus } from '@episerver/content-delivery';
import { AppState, EpiContextState, EpiDataModelState, AppActionTypes, EpiContextActionTypes, EpiDataModelActionTypes, SHOW_MODAL, HIDE_MODAL, UPDATE_CONTEXT, UPDATE_MODEL } from '../Types';

// Define initial states
const initialAppState: AppState = {
    modalShowing: false
};

const initialEpiContextState: EpiContextState = {
    inEditMode: false,
    isEditable: false
};

const initialEpiDataModelState: EpiDataModelState = {
    model: {},
    modelLoaded: false,
    status: ResolvedContentStatus.Unknown // Set to appropriate initial value
};

// Define reducers
const appReducer = (state = initialAppState, action: AppActionTypes): AppState => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                modalShowing: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                modalShowing: false
            };
        default:
            return state;
    }
};

const epiContextReducer = (state = initialEpiContextState, action: EpiContextActionTypes): EpiContextState => {
    switch (action.type) {
        case UPDATE_CONTEXT:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

const epiDataModelReducer = (state = initialEpiDataModelState, action: EpiDataModelActionTypes): EpiDataModelState => {
    switch (action.type) {
        case UPDATE_MODEL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    app: appReducer,
    epiContext: epiContextReducer,
    epiDataModel: epiDataModelReducer
});

export default rootReducer;
