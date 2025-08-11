import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // Có thể thêm các route khác ở đây sau
      // {
      //   path: "/movies",
      //   element: <Movies />,
      // },
      // {
      //   path: "/movie/:id",
      //   element: <MovieDetail />,
      // },
      // {
      //   path: "/tv",
      //   element: <TvShows />,
      // },
      // {
      //   path: "/tv/:id",
      //   element: <TvDetail />,
      // },
    ],
  },
]);

export default router;