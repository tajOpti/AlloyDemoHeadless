import React from 'react';

const log = () => {
    return <div>Not Found</div>;
};
const NotFound: React.FC = () => {
    return (
        <div>
            Not Found Content
            {log()}
        </div>
    );
};

export default NotFound;