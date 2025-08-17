// Simple Express backend to proxy TMDB API requests and hide API key
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Proxy endpoint for TMDB discover
app.get('/api/discover', async (req, res) => {
  try {
    const params = new URLSearchParams({ ...req.query, api_key: API_KEY });
    const url = `${BASE_URL}/discover/movie?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
});

// Proxy endpoint for TMDB detail (movie/tv)
app.get('/api/:mediaType/:id', async (req, res) => {
  try {
    const { mediaType, id } = req.params;
    const params = new URLSearchParams({ ...req.query, api_key: API_KEY });
    const url = `${BASE_URL}/${mediaType}/${id}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
});

// Add more endpoints as needed for credits, videos, images, etc.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
