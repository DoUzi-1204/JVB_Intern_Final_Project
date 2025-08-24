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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
