// reducers/appContextReducer.ts

import { SET_MODAL_VISIBILITY, TOGGLE_MODAL } from '../actions/appContextAction';

export const initialState = {
    showModal: false
};

const appContextReducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
    switch (type) {
        case SET_MODAL_VISIBILITY: return { ...state, ...payload };
        case TOGGLE_MODAL: return { ...state, showModal: !state.showModal };
        default: return state;
    }
};

export default appContextReducer;
