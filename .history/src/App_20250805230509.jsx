import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FilterPage from "./pages/FilterPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import WatchPage from "./pages/WatchPage";
import "./App.css"; Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FilterPage from "./pages/FilterPage";
import MovieDetail from "./pages/MovieDetail";
import WatchPage from "./pages/WatchPage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<FilterPage />} />

        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id/watch" element={<WatchPage />} />
        <Route path="/tv/:id" element={<MovieDetail />} />
        <Route path="/tv/:id/watch" element={<WatchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
