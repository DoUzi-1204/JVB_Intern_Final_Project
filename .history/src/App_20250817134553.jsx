import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import FilterPage from "./pages/FilterPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import Loading from "./components/Loading";
import usePageRefresh from "./hooks/usePageRefresh";
import "./App.css";

function App() {
  const { isPageRefreshing } = usePageRefresh();

  return (
    <>
      <ScrollToTop />
      {/* Global loading overlay for page refresh */}
      {isPageRefreshing && <Loading />}

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/movie/:id" element={<MovieInfoPage />} />
        <Route path="/tv/:id" element={<MovieInfoPage />} />

        {/* New watch page routes */}
        <Route path="/watch/movie/:id" element={<WatchPage />} />
        <Route path="/watch/tv/:id/:season/:episode" element={<WatchPage />} />

        {/* Legacy watch page routes for compatibility */}
        <Route path="/movie/:id/watch" element={<WatchPage />} />
        <Route path="/tv/:id/watch" element={<WatchPage />} />
        <Route path="/tv/:id/:season/:episode/watch" element={<WatchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
