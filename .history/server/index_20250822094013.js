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

// Movie credits
app.get('/api/movie/:id/credits', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/movie/${id}/credits`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movie images
app.get('/api/movie/:id/images', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/movie/${id}/images`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movie videos
app.get('/api/movie/:id/videos', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/movie/${id}/videos`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movie recommendations
app.get('/api/movie/:id/recommendations', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/movie/${id}/recommendations`, req.query);
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

// TV credits
app.get('/api/tv/:id/credits', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/tv/${id}/credits`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TV images
app.get('/api/tv/:id/images', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/tv/${id}/images`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TV videos
app.get('/api/tv/:id/videos', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/tv/${id}/videos`, req.query);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TV recommendations
app.get('/api/tv/:id/recommendations', async (req, res) => {
  const { id } = req.params;
  try {
    const url = buildUrl(`${BASE_URL}/tv/${id}/recommendations`, req.query);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
