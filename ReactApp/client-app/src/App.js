import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../src/Component/Home';
import About from '../src/Component/About';
import Contact from '../src/Component/Contact';
import NotFound from '../src/Component/NotFound';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Home ALone</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </nav>
);


const App = () => {


  const routeConfig = [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/contact", component: Contact },
    // Add more route definitions as needed
  ]

  const generateRoutes = routeConfig.map(route => (
    <Route key={route.path} path={route.path} element={<route.component />} />
  ));

  return (
    <div>
      <h1>Simple React App</h1>
      <Navigation />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {generateRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
};

export default App;