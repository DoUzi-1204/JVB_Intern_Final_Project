// Simple Express proxy server to protect API key
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY; // Put your API key in .env (not .env.local)
const BASE_URL = 'https://api.themoviedb.org/3'; // Change to your API base URL

// Example proxy endpoint
app.get('/api/discover/movie', async (req, res) => {
  try {
    const { page = 1, ...filters } = req.query;
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        page,
        ...filters
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more endpoints as needed

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
