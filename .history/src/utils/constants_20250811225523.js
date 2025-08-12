// API Constants
export const API_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
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
  { iso_3166_1: "AR", name: "Argentina" },
  { iso_3166_1: "CL", name: "Chile" },
  { iso_3166_1: "CO", name: "Colombia" },
];

// Filter Options
export const FILTER_OPTIONS = {
  SORT_BY: [
    { value: "popularity.desc", label: "Phổ biến giảm dần" },
    { value: "popularity.asc", label: "Phổ biến tăng dần" },
    { value: "vote_average.desc", label: "Đánh giá cao nhất" },
    { value: "vote_average.asc", label: "Đánh giá thấp nhất" },
    { value: "release_date.desc", label: "Mới nhất" },
    { value: "release_date.asc", label: "Cũ nhất" },
    { value: "title.asc", label: "Tên A-Z" },
    { value: "title.desc", label: "Tên Z-A" },
  ],

  AGE_RATINGS: [
    { value: "G", label: "G - Mọi lứa tuổi" },
    { value: "PG", label: "PG - Có sự hướng dẫn" },
    { value: "PG-13", label: "PG-13 - Từ 13 tuổi" },
    { value: "R", label: "R - Từ 17 tuổi" },
    { value: "NC-17", label: "NC-17 - Từ 18 tuổi" },
    { value: "NR", label: "NR - Chưa phân loại" },
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
  return COUNTRY_MAP[countryCode] || countryCode;
};
