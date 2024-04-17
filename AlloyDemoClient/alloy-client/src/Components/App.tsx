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


// const App = () => {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     // Similar setup as before, but within useEffect
//     // Set up Episerver Content Delivery API configuration
//     const apiUrl = `${process.env.REACT_APP_CONTENT_DELIVERY_API}/api/episerver/v3.0`;
//     // You may want to store this apiUrl in a state if it changes during runtime

//     // Set up defaultConfig properties
//     const defaultConfig = {
//       apiUrl,
//       getAccessToken: () => authService.getAccessToken(),
//       selectAllProperties: true,
//       expandAllProperties: true,
//     };

//     // Update isLoggedIn and username state based on user authentication
//     authService.getUser().then((user: any) => {
//       if (user && !user.expired) {
//         setIsLoggedIn(true);
//         setUsername(user.profile.name);
//       }
//     });

//     // Load Episerver CMS client resources if in edit/preview mode
//     if (window.location.search.includes('epieditmode')) {
//       const communicationScript = document.createElement('script');
//       communicationScript.src = `${process.env.REACT_APP_CONTENT_DELIVERY_API}/episerver/cms/latest/clientresources/communicationinjector.js`;
//       document.body.appendChild(communicationScript);
//     }

//     // Clean up function
//     return () => {
//       // Remove script element if necessary
//       // This function will be called when the component unmounts
//     };
//   }, []); // Empty dependency array to run effect only once on mount


//   const routeConfig = [
//     { path: "/", component: Home },
//     { path: "/about", component: About },
//     { path: "/contact", component: Contact },
//     // Add more route definitions as needed
//   ]

//   const generateRoutes = routeConfig.map(route => (
//     <Route key={route.path} path={route.path} element={<route.component />} />
//   ));
//   return (
//     <div>
//       <h1>Simple React App</h1>
//       <Navigation />
//       <Routes>
//         {generateRoutes}
//         <Route path="*" element={<NotFound />} />
//       </Routes>

//     </div>
//   );
// };

// const App = () => {

//   const [contentData, setContentData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = "https://localhost:5000/api/episerver/v3.0/content/6/?expand=*";
//         //const url = "https://localhost:5000/en/whitepaper/";
//         const params = getParamsFromUrl(url);
//         const response = await epi.getContentByContentLink(6, params, {});
//         //const response2 = await epi.getContentByFriendlyUrl(url, params);
//         setContentData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData()
//   }, [])

//   const getParamsFromUrl = (url: string): { [key: string]: string } => {
//     const searchParams = new URLSearchParams(url);
//     const params: { [key: string]: string } = {};

//     const iterator = searchParams.entries();
//     let entry = iterator.next();
//     while (!entry.done) {
//       const [key, value] = entry.value;
//       params[key] = value;
//       entry = iterator.next();
//     }

//     return params;
//   };

//   //getContent();
//   return (
//     <div>
//       <h1>Hello</h1>
//       {/* Render ContentView if contentData is not null */}
//       {contentData && <ContentView data={contentData} />}
//     </div>
//   )
// };


export default App;
