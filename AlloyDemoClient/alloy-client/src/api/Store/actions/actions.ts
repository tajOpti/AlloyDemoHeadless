// actions.ts

import { Dispatch } from 'redux';
import { UPDATE_MODEL, UPDATE_CONTEXT } from '../Types';
import { ContentResolver, ContextMode, ResolvedContentStatus } from '@episerver/content-delivery';

// Define action creators
export const updateModelByUrl = (url: string) => async (dispatch: Dispatch) => {
    const contentResolver = new ContentResolver();

    try {
        const resolvedContent = await contentResolver.resolveContent(url, true);

        dispatch({
            type: UPDATE_MODEL,
            payload: {
                model: resolvedContent.content,
                status: resolvedContent.status
            }
        });

        const context = {
            isEditable: resolvedContent.mode === ContextMode.Edit,
            inEditMode: resolvedContent.mode === ContextMode.Edit
        };

        dispatch({
            type: UPDATE_CONTEXT,
            payload: context
        });
    } catch (error) {
        console.error('Failed to update model by URL:', error);
        // Handle error if needed
    }
};
