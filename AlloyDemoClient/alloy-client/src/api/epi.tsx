/**
 * Wraps the calls to the ContentDeliveryAPI. It's used by the redux
 * `epiDataModel` module and the `ArtistContainerPage` component.
 */

import axios from 'axios';

const get = (baseURL: any, url: any, parameters: any, headers: any) => {
    return axios({
        method: 'get',
        baseURL: baseURL,
        url: url,
        params: parameters,
        headers: {
            'Accept-Language': '*',
            ...headers
        }
    });
};

const applicationPath = document.documentElement.dataset.applicationPath;
const parameters = {
    expand: '*'
};

export default {
    /**
     * Getting content with the content link is the default way of calling the ContentDeliveryAPI.
     * It is used in MusicFestival to get:
     *  - block data
     *  - updated data after a `beta/contentSaved` message, which has the content link
     */
    getContentByContentLink: (contentLink: number, params = {}, headers: any) =>
        get(`${applicationPath}api/episerver/v2.0/`, `content/${contentLink}`, { ...parameters, ...params }, headers),

    /**
     * Getting data from ContentDeliveryAPI through regular routing (friendly URLs) was added in ContentDeliveryAPI 2.3.0.
     * It is used in MusicFestival to get:
     *  - page data, through the redux `epiDataModel` module
     */
    getContentByFriendlyUrl: (friendlyUrl: any, params = {}) =>
        get('/', friendlyUrl, { ...parameters, ...params }, { Accept: 'application/json' }),

    /**
     * Getting the children of the page with ContentDeliveryAPI is enabled by
     * the extensions in Infrastructure/ContentDeliveryExtendedRouting.
     * It is used in MusicFestival to get:
     *  - artist list in ArtistContainerPage.jsx
     */
    getChildren(friendlyUrl: any, params = {}) {
        // Split URL into path and queries
        const urlPieces = friendlyUrl.split('?');
        // In View mode we might visit the URL with or without a trailing / (i.e. "http://localhost:56312/en/artists" or "http://localhost:56312/en/artists/")
        const pathname = (urlPieces[0].endsWith('/') ? urlPieces[0] : urlPieces[0] + '/');
        // In Edit mode we'll have URL queries (i.e. "/EPiServer/CMS/Content/en/artists,,6/?epieditmode=True")
        const queries = urlPieces[1] ? '?' + urlPieces[1] : '';

        // Concatenate the friendly URL with "/children" for the Content API
        const callUrl = pathname + 'children' + queries;

        return this.getContentByFriendlyUrl(callUrl, params);
    }
};
