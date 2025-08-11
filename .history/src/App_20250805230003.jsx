import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FilterPage from "./pages/FilterPage";
import DetailPage from "./pages/DetailPage";
import WatchPage from "./pages/WatchPage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter" element={<FilterPage />} />

        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="/movie/:id/watch" element={<WatchPage />} />
        <Route path="/tv/:id" element={<DetailPage />} />
        <Route path="/tv/:id/watch" element={<WatchPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
