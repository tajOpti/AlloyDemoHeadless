const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const https = require('https'); // Import the 'https' module

async function getData() {
    try {
        const response = await axios.get('https://localhost:5000/api/episerver/v3.0/site', {
            httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Pass the 'rejectUnauthorized' option
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    getData();
});
