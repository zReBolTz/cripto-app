import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import ErrorPage from "./pages/error";
import LayoutPage from "./components/layout";

const router = createBrowserRouter([
  {
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:cripto",
        element: <Detail />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export { router };
