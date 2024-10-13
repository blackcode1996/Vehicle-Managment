import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication";
import Wrapper from "../pages/Wrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        index: true,
        path: "/auth",
        element: <Authentication />,
      },
    ],
  },
]);

export const AllRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
