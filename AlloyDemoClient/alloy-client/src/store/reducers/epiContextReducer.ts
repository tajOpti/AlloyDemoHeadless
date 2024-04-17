// reducers/epiContextReducer.ts

import { EPI_UPDATE_CONTEXT } from '../actions/epiContextAction';

export const initialState = {
    inEditMode: false,
    isEditable: false
};

const epiContextReducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
    switch (type) {
        case EPI_UPDATE_CONTEXT:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};

export default epiContextReducer;
