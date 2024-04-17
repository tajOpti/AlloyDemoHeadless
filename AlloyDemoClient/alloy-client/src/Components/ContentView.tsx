import React from 'react';


interface Image {
    value: { url: string }
};

interface Language {
    link: string;
    displayName: string;
    name: string;
}

interface ContentLink {
    id: number;
    workId: number;
    guidValue: string;
    providerName: string | null;
    url: string | null;
    expanded: string | null;
    image: Image | null;
    value: (ContentLink & { image?: Image })[]; // Modify this line
}

interface Content {
    contentLink: ContentLink;
    name: string;
    language: Language;
    existingLanguages: Language[];
    masterLanguage: Language;
    contentType: string[];
    parentLink: ContentLink;
    routeSegment: string;
    url: string;
    changed: string;
    created: string;
    startPublish: string;
    stopPublish: string | null;
    saved: string;
    status: string;
    category: {
        value: {
            id: number;
            name: string;
            description: string;
        }[];
        propertyDataType: string;
    };
    metaTitle: {
        value: string;
        propertyDataType: string;
    };
    pageImage: {
        value: ContentLink;
        url: string;
        propertyDataType: string;
    };
    metaKeywords: {
        value: string[] | null;
        propertyDataType: string;
    };
    teaserText: {
        value: string;
        propertyDataType: string;
    };
    hideSiteHeader: {
        value: null;
        propertyDataType: string;
    };
    metaDescription: {
        value: string;
        propertyDataType: string;
    };
    hideSiteFooter: {
        value: null;
        propertyDataType: string;
    };
    uniqueSellingPoints: {
        value: string[];
        propertyDataType: string;
    };
    mainBody: string;
    // mainBody: {
    //     value: string;
    //     propertyDataType: string;
    // };
    mainContentArea: {
        value: (ContentLink & { image?: Image })[]; // Modify this line
        expandedValue: Image[]; // Modify this line to include Image[]
        propertyDataType: string;
    };
    relatedContentArea: {
        value: ContentLink[];
        propertyDataType: string;
    };
    disableIndexing: {
        value: null;
        propertyDataType: string;
    };
}

interface LanguageInfoProps {
    language: Language;
}

const UniqueSellingPointsProps: string[] = [];

interface MainBodyProps {
    body: string;
}

const LanguageInfo: React.FC<LanguageInfoProps> = ({ language }) => (
    <div>
        <h4>Language Info</h4>
        <p>Language: {language.displayName}</p>
        <p>Language Code: {language.name}</p>
    </div>
);

const UniqueSellingPoints: React.FC<any> = ({ points }) => (
    <div>
        <h4>Unique Selling Points</h4>
        <ul>
            {points.map((point: string, index: number) => (
                <li key={index}>{point}</li>
            ))}
        </ul>
    </div>
);

const MainBody: React.FC<MainBodyProps> = ({ body }) => (
    <div>
        <h4>Main Body</h4>
        <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
);

const ContentView: React.FC<{ data: Content }> = ({ data }) => (
    <div className="content-view">
        <h1>Content Details</h1>
        <LanguageInfo language={data.language} />
        <h2>{data.name}</h2>
        <p>Content Type: {data.contentType.join(', ')}</p>
        <p>URL: <a href={data.url}>{data.url}</a></p>
        <p>Created: {new Date(data.created).toLocaleDateString()}</p>
        <p>Status: {data.status}</p>
        <p>Route Segment: {data.routeSegment}</p>
        <p>Changed: {new Date(data.changed).toLocaleDateString()}</p>
        <p>Start Publish: {new Date(data.startPublish).toLocaleDateString()}</p>
        <p>Stop Publish: {data.stopPublish ? new Date(data.stopPublish).toLocaleDateString() : 'N/A'}</p>
        <p>Saved: {new Date(data.saved).toLocaleDateString()}</p>
        {data.pageImage && data.pageImage.url && data.pageImage.url && (
            <img src={data.pageImage.url} alt="Page Image" className="page-image" />
        )}

        {data.metaTitle && <p>Meta Title: {data.metaTitle.value}</p>}
        {data.metaKeywords && <p>Meta Keywords: {data.metaKeywords.value?.join(', ')}</p>}
        {data.teaserText && <p>Teaser Text: {data.teaserText.value}</p>}
        {data.metaDescription && <p>Meta Description: {data.metaDescription.value}</p>}
        {data.hideSiteHeader && <p>Hide Site Header: {data.hideSiteHeader.value}</p>}
        {data.hideSiteFooter && <p>Hide Site Footer: {data.hideSiteFooter.value}</p>}
        {data.disableIndexing && <p>Disable Indexing: {data.disableIndexing.value}</p>}
        {data.uniqueSellingPoints && <UniqueSellingPoints points={data.uniqueSellingPoints} />}
        {data.mainBody && <MainBody body={data.mainBody} />}


        Main Content Area


        {data.mainContentArea && (
            <div>
                {data.mainContentArea.expandedValue.map((contents, index) => (
                    <>{contents}</>
                    // <div key={index}>
                    //     {<><img src={contents.image.value.url} alt="Page Image" className="page-image" /></>}
                    //     {data.pageImage && data.pageImage.value && data.pageImage.value.url && (
                    //         <img src={data.pageImage.value.url} alt="Page Image" className="page-image" />
                    //     )}
                    // </div>
                ))}
            </div>
        )}
        {/* Related Content Area */}
        {/* {data.relatedContentArea && ( */}
        <div>
            <h4>Related Content Area</h4>

        </div>
        {/* )} */}
    </div>
);

export default ContentView;
