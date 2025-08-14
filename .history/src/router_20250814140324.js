import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import SearchPage from "./pages/SearchPage";
import FilterPage from "./pages/FilterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/filter",
    element: <FilterPage />,
  },
  {
    path: "/movie/:id",
    element: <MovieInfoPage />,
  },
  {
    path: "/tv/:id",
    element: <MovieInfoPage />,
  },
  {
    path: "/watch/movie/:id",
    element: <WatchPage />,
  },
  {
    path: "/watch/tv/:id/:season/:episode",
    element: <WatchPage />,
  },
]);

export default router;