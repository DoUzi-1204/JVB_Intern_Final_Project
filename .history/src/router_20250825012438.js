import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage";
import MovieInfoPage from "./pages/MovieInfoPage";
import SearchPage from "./pages/SearchPage";
import FilterPage from "./pages/FilterPage";
import ActorDetailPage from "./pages/ActorDetailPage";

const basename = import.meta.env.BASE_URL || "/";

// createBrowserRouter will respect absolute paths; the app itself will use
// the BASE_URL provided by Vite for asset and route basenames on GitHub Pages.
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
  {
    path: "/actor/:id",
    element: <ActorDetailPage />,
  },
]);

export default router;
