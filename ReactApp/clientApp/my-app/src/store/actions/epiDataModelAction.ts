// actions/epiDataModelActions.ts

export const EPI_DATA_MODEL_UPDATE = 'EPI_DATA_MODEL_UPDATE'; // Define and export the action type constant

import { ContentResolver, ResolvedContentStatus, ContextMode } from '@episerver/content-delivery';
import { UPDATE_MODEL } from '../Types';
import { updateEpiContextAction } from '../actions/epiContextAction'; // Import the action creator for updating the epi context

export const updateModelAction = (payload: any) => ({
    type: UPDATE_MODEL,
    payload
});

export const updateModelByUrl = (friendlyUrl: string) => async (dispatch: any) => {
    const contentResolver = new ContentResolver();
    try {
        const resolvedContent = await contentResolver.resolveContent(friendlyUrl, true);

        dispatch(updateModelAction({
            model: resolvedContent.content,
            status: resolvedContent.status
        }));

        const context = {
            isEditable: resolvedContent.mode === ContextMode.Edit,
            inEditMode: resolvedContent.mode === ContextMode.Edit,
        };

        dispatch(updateEpiContextAction(context)); // Dispatch the action to update the epi context directly
    } catch (error) {
        console.error('Failed to update model by URL:', error);
        // Handle error if needed
    }
};

export const updateModelByContentLink = (contentLink: string) => async (dispatch: any) => {
    const contentResolver = new ContentResolver();
    try {
        const resolvedContent = await contentResolver.resolveContent(contentLink, true);

        dispatch(updateModelAction({
            model: resolvedContent.content,
            status: resolvedContent.status
        }));

        const context = {
            isEditable: resolvedContent.mode === ContextMode.Edit,
            inEditMode: resolvedContent.mode === ContextMode.Edit,
        };

        dispatch(updateEpiContextAction(context)); // Dispatch the action to update the epi context directly
    } catch (error) {
        console.error('Failed to update model by content link:', error);
        // Handle error if needed
    }
};
