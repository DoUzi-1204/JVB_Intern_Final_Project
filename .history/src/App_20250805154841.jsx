import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Thêm các route khác ở đây */}
        {/* <Route path="/movies" element={<Movies />} /> */}
        {/* <Route path="/movie/:id" element={<MovieDetail />} /> */}
        {/* <Route path="/tv" element={<TvShows />} /> */}
        {/* <Route path="/tv/:id" element={<TvDetail />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
