import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.TMDB_API_KEY || process.env.API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.warn('Warning: TMDB API key (TMDB_API_KEY or API_KEY) is not set in server environment.');
}

app.get('/api/*', async (req, res) => {
  const path = req.path.replace(/^\/api/, '');
  const qs = new URLSearchParams(req.query);
  if (API_KEY) qs.set('api_key', API_KEY);
  const url = `${TMDB_BASE}${path}?${qs.toString()}`;
  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'proxy error', details: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Proxy server listening on ${port}`));
