// API Constants
const PROXY = import.meta.env.VITE_API_PROXY || "";

export const API_CONFIG = {
  // If VITE_API_PROXY is set (e.g. https://my-proxy.example), use the proxy's base
  // otherwise default to the TMDB base (used only if you're calling TMDB directly).
  BASE_URL: PROXY ? `${PROXY}` : "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p",
};

// Danh sách quốc gia phổ biến có phim
export const POPULAR_MOVIE_COUNTRIES = [
  { iso_3166_1: "US", name: "Hoa Kỳ" },
  { iso_3166_1: "KR", name: "Hàn Quốc" },
  { iso_3166_1: "JP", name: "Nhật Bản" },
  { iso_3166_1: "CN", name: "Trung Quốc" },
  { iso_3166_1: "VN", name: "Việt Nam" },
  { iso_3166_1: "TH", name: "Thái Lan" },
  { iso_3166_1: "IN", name: "Ấn Độ" },
  { iso_3166_1: "GB", name: "Anh" },
  { iso_3166_1: "FR", name: "Pháp" },
  { iso_3166_1: "DE", name: "Đức" },
  { iso_3166_1: "IT", name: "Ý" },
  { iso_3166_1: "ES", name: "Tây Ban Nha" },
  { iso_3166_1: "RU", name: "Nga" },
  { iso_3166_1: "CA", name: "Canada" },
  { iso_3166_1: "AU", name: "Úc" },
  { iso_3166_1: "BR", name: "Brazil" },
  { iso_3166_1: "MX", name: "Mexico" },
];

// Filter Options
export const FILTER_OPTIONS = {
  SORT_BY: [
    { value: "popularity.desc", label: "Phổ biến" },
    { value: "vote_average.desc", label: "Điểm TMDB" },
    { value: "release_date.desc", label: "Ngày phát hành" },
    { value: "revenue.desc", label: "Doanh thu" },
    { value: "title.asc", label: "A-Z" },
  ],

  AGE_RATINGS: [
    { value: "G", label: "<strong>G</strong> (Mọi lứa tuổi)" },
    { value: "PG", label: "<strong>PG</strong> (Có sự hướng dẫn)" },
    { value: "PG-13", label: "<strong>PG-13</strong> (Từ 13 tuổi)" },
    { value: "R", label: "<strong>R</strong> (Từ 17 tuổi)" },
    { value: "NC-17", label: "<strong>NC-17</strong> (Từ 18 tuổi)" },
    { value: "NR", label: "<strong>NR</strong> (Chưa phân loại)" },
  ],

  YEARS: (() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
  })(),
};

// Helper function to get country name
export const getCountryName = (countryCode) => {
  const country = POPULAR_MOVIE_COUNTRIES.find(
    (c) => c.iso_3166_1 === countryCode
  );
  return country ? country.name : countryCode;
};
