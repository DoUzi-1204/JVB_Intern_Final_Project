require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

app.get('/api/preview/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  if (!API_KEY || !id || !type) return res.status(400).json({ error: 'Missing params or API key' });

  const endpoint = type === 'movie' ? 'movie' : 'tv';
  const appendResponse = type === 'movie' ? 'release_dates' : 'content_ratings';

  try {
    // Vietnamese data
    const viRes = await fetch(`${BASE_URL}/${endpoint}/${id}?language=vi-VN&api_key=${API_KEY}&append_to_response=${appendResponse}`);
    const viData = await viRes.json();
    // English data
    const enRes = await fetch(`${BASE_URL}/${endpoint}/${id}?language=en-US&api_key=${API_KEY}&append_to_response=${appendResponse}`);
    const enData = await enRes.json();

    res.json({ vi: viData, en: enData, mediaType: type });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/slider', async (req, res) => {
  const { endpoint, limit } = req.query;
  if (!API_KEY || !endpoint) return res.status(400).json({ error: 'Missing params or API key' });

  try {
    // Gọi TMDB API với endpoint và limit
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=vi-VN`;
    const response = await fetch(url);
    const data = await response.json();
    // Trả về đúng số lượng kết quả nếu cần
    data.results = data.results ? data.results.slice(0, Number(limit) || 15) : [];
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
