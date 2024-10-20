import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Wrapper from "../pages/Wrapper";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import VerifyEmail from "../pages/VerifyEmail";
import Seller from "../pages/Seller";
import Vehicles from "../pages/Vehicles";
import PrivateRoutes from "../hoc/privateRoutes";
import Profile from "../pages/Profile";

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
        path: "/registartion",
        element: <Registration />,
      },
      {
        path: "/verifyEmail",
        element: <VerifyEmail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/seller",
        element: (
          <PrivateRoutes>
            <Seller />
          </PrivateRoutes>
        ),
      },
      {
        path: "/vehilcles",
        element: <Vehicles />,
      },
      {
        path:"/profile",
        element: <Profile/>
      }
    ],
  },
]);

export const AllRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
