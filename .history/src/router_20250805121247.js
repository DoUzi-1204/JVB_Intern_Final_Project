import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MovieDetail from "./pages/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "/tv/:id",
    element: <MovieDetail />,
  },
]);

export default router;
