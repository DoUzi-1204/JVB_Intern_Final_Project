import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FilterPage from "./pages/FilterPage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<FilterPage />} />

        {/* Routes cho phim */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id/watch" element={<MovieWatch />} />

        {/* Routes cho TV shows */}
        <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/tv/:id/watch" element={<TvWatch />} />

        {/* Routes khác */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TvShows />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
