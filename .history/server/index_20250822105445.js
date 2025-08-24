require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

app.get('/api/slider', async (req, res) => {
	const { type, category, limit } = req.query;
	if (!API_KEY || !type || !category) return res.status(400).json({ error: 'Missing params or API key' });

	try {
		// Chỉ cho phép các giá trị hợp lệ
		const allowedTypes = ['movie', 'tv'];
		const allowedCategories = ['popular', 'top_rated', 'upcoming', 'now_playing', 'airing_today', 'on_the_air'];
		if (!allowedTypes.includes(type) || !allowedCategories.includes(category)) {
			return res.status(400).json({ error: 'Invalid type or category' });
		}

		const url = `${BASE_URL}/${type}/${category}?api_key=${API_KEY}&language=vi-VN&page=1`;
		const response = await fetch(url);
		const data = await response.json();
		data.results = data.results ? data.results.slice(0, Number(limit) || 15) : [];
		res.json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
