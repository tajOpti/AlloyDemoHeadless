// actions/appContextActions.ts

export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const setModalVisibilityAction = (showModal: boolean) => ({
    type: SET_MODAL_VISIBILITY,
    payload: {
        showModal
    }
});

export const toggleModalAction = () => ({
    type: TOGGLE_MODAL
});
