// Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PageComponentSelector from '../Components/PageComponentSelector';
import NotFound from '../Components/NotFound';

const Routes: React.FC = () => {
    return (
        <Router>
            <Route path="/" element={<PageComponentSelector />} />
            <Route path="/NotFound" element={<NotFound />} />
        </Router>
    );
};

export default Routes;
