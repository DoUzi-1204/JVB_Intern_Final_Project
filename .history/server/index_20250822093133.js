import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3'; // Ví dụ với TMDB

// Proxy endpoint
app.get('/api/:path', async (req, res) => {
  const { path } = req.params;
  const query = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/${path}`, {
      params: { ...query, api_key: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
