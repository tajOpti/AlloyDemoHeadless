import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import authService from './authService';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Similar setup as before, but within useEffect
    // Set up Episerver Content Delivery API configuration
    const apiUrl = `${process.env.REACT_APP_CONTENT_DELIVERY_API}/api/episerver/v3.0`;
    // You may want to store this apiUrl in a state if it changes during runtime

    // Set up defaultConfig properties
    const defaultConfig = {
      apiUrl,
      getAccessToken: () => authService.getAccessToken(),
      selectAllProperties: true,
      expandAllProperties: true,
    };

    // Update isLoggedIn and username state based on user authentication
    authService.getUser().then(user => {
      if (user && !user.expired) {
        setIsLoggedIn(true);
        setUsername(user.profile.name);
      }
    });

    // Load Episerver CMS client resources if in edit/preview mode
    if (window.location.search.includes('epieditmode')) {
      const communicationScript = document.createElement('script');
      communicationScript.src = `${process.env.REACT_APP_CONTENT_DELIVERY_API}/episerver/cms/latest/clientresources/communicationinjector.js`;
      document.body.appendChild(communicationScript);
    }

    // Clean up function
    return () => {
      // Remove script element if necessary
      // This function will be called when the component unmounts
    };
  }, []); // Empty dependency array to run effect only once on mount

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div>
      <h1>Simple React App</h1>
      <Router>
        <Navigation isLoggedIn={isLoggedIn} username={username} logout={logout} />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Router>
    </div>
  );
};

export default App;