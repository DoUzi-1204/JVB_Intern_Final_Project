import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to build URL with query params
function buildUrl(url, params) {
  const searchParams = new URLSearchParams({ ...params, api_key: API_KEY });
  return `${url}?${searchParams.toString()}`;
}

// Discover endpoint (movie/tv)
app.get('/api/discover/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/discover/${type}`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movie popular
app.get('/api/movie/popular', async (req, res) => {
  try {
    const url = buildUrl(`${BASE_URL}/movie/popular`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movie detail
app.get('/api/movie/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/movie/${id}`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TV detail
app.get('/api/tv/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/tv/${id}`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Person detail
app.get('/api/person/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/person/${id}`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Person popular
app.get('/api/person/popular', async (req, res) => {
  try {
    const url = buildUrl(`${BASE_URL}/person/popular`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fallback for other endpoints
app.get('/api/:category/:id/:subpath?', async (req, res) => {
  const { category, id, subpath } = req.params;
  let url = `${BASE_URL}/${category}/${id}`;
  if (subpath) url += `/${subpath}`;
  try {
    url = buildUrl(url, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
