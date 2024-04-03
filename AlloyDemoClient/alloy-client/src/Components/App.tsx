import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import epi from "../api/epi";
import { useState, useEffect } from 'react';


const App = () => {

  const [contentData, setContentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const url = "https://localhost:5000/api/episerver/v3.0/content/6/?expand=*";
        const url = "https://localhost:5000/en/whitepaper/";
        const params = getParamsFromUrl(url);
        const response = await epi.getContentByContentLink(6, params, {});
        //const response2 = await epi.getContentByFriendlyUrl(url, params);
        setContentData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [])

  // const getContent = async () => {
  //   const params = getParamsFromUrl("https://localhost:5000/api/episerver/v3.0/content/1/?expand=*");
  //   const response = await epi.getContentByContentLink(1, params, {});
  //   return response.data;
  // }

  const getParamsFromUrl = (url: string): { [key: string]: string } => {
    const searchParams = new URLSearchParams(url);
    const params: { [key: string]: string } = {};

    const iterator = searchParams.entries();
    let entry = iterator.next();
    while (!entry.done) {
      const [key, value] = entry.value;
      params[key] = value;
      entry = iterator.next();
    }

    return params;
  };

  //getContent();
  return (
    <div>
      <h1>Hello</h1>
      {contentData && (
        <div>
          { }
        </div>
      )}
    </div>
  )
};

export default App;
