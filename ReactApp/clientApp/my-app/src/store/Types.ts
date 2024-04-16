// types.ts

// Define types for the state
export interface AppState {
    modalShowing: boolean;
}

export interface EpiContextState {
    inEditMode: boolean;
    isEditable: boolean;
}

export interface EpiDataModelState {
    model: any; // Define the type of your model
    modelLoaded: boolean;
    status: string; // Define the type of status according to your needs
}

// Define action types
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const UPDATE_CONTEXT = 'UPDATE_CONTEXT';
export const UPDATE_MODEL = 'UPDATE_MODEL';

// Define action interfaces
interface ShowModalAction {
    type: typeof SHOW_MODAL;
}

interface HideModalAction {
    type: typeof HIDE_MODAL;
}

interface UpdateContextAction {
    type: typeof UPDATE_CONTEXT;
    payload: EpiContextState;
}

interface UpdateModelAction {
    type: typeof UPDATE_MODEL;
    payload: EpiDataModelState;
}

export type AppActionTypes = ShowModalAction | HideModalAction;
export type EpiContextActionTypes = UpdateContextAction;
export type EpiDataModelActionTypes = UpdateModelAction;
