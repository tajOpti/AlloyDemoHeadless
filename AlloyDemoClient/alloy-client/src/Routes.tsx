// Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import PageComponentSelector from '../src/Components/PageComponentSelector';
import NotFound from '../src/Components/NotFound';

const Routes = () => {
    return (
        <Router>
            {<Route path="/" element={<><div>Hello world</div></>} />}
            <Route path="/NotFound" element={<NotFound />} />
        </Router>
    );
};

export default Routes;
