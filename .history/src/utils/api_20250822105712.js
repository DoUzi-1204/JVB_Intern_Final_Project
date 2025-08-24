// Hàm gọi API backend proxy cho slider
export async function fetchSlider(type, category, limit = 15) {
	const response = await fetch(`/api/slider?type=${type}&category=${category}&limit=${limit}`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return await response.json();
}

// Hàm gọi API backend proxy cho preview
export async function fetchPreview(type, id) {
	const response = await fetch(`/api/preview/${type}/${id}`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return await response.json();
}
