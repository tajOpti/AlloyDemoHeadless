// reducers/epiDataModelReducer.ts

import { EPI_DATA_MODEL_UPDATE } from '../actions/epiDataModelAction';

export const initialState = {
    model: {},
    modelLoaded: false
};

const epiDataModelReducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
    switch (type) {
        case EPI_DATA_MODEL_UPDATE:
            return {
                ...state,
                model: payload,
                modelLoaded: true
            };
        default:
            return state;
    }
};

export default epiDataModelReducer;
