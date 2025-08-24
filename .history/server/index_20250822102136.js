require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY; // Đặt API key trong file .env phía server
const BASE_URL = 'https://api.themoviedb.org/3';

// Proxy endpoint cho popular movies
app.get('/api/movie/popular', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: req.query.language || 'vi-VN',
        page: req.query.page || 1,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint cho movie detail
app.get('/api/movie/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${req.params.id}`, {
      params: {
        api_key: API_KEY,
        language: req.query.language || 'vi-VN',
        append_to_response: req.query.append_to_response,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm các endpoint proxy khác nếu cần

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
