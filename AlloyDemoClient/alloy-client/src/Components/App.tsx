import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import epi from "../api/epi";


// App.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import authService from './authService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const history = useNavigate();

  useEffect(() => {
    // Set up configuration
    // Handle authentication
  }, []);

  const login = () => {
    //authService.login();
  };

  const logout = () => {
    //authService.logout();
  };

  return (
    <div>
      <nav className="Page-container LoginBar">
        <button className="btn" onClick={login} style={{ display: !isLoggedIn ? 'block' : 'none' }}>Login</button>
        <button className="btn" onClick={logout} style={{ display: isLoggedIn ? 'block' : 'none' }}>{username}, Logout</button>
      </nav>
      {/* Router View */}
    </div>
  );
};

export default App;
