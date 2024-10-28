import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Wrapper from "../pages/Wrapper";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import VerifyEmail from "../pages/VerifyEmail";
import Seller from "../pages/Seller";
import Vehicles from "../pages/Vehicles";
import AdminPrivateRoutes from "../hoc/AdminPrivateRoutes/privateRoutes";
import CustomerPrivateRoutes from "../hoc/CustomerPrivateRoutes/PrivateRoutes";
import Profile from "../pages/Profile";
import PageNotFound from "../components/PageNotFound";
import AboutSection from "../pages/About";
import ContactUs from "../pages/ContactUs";

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
          <AdminPrivateRoutes>
            <Seller />
          </AdminPrivateRoutes>
        ),
      },
      {
        path: "/vehicles",
        element: (
          <CustomerPrivateRoutes>
            <Vehicles />
          </CustomerPrivateRoutes>
        
        ),
      },
      {
        path:"/profile",
        element: <Profile/>
      },
      {
        path:"/about",
        element: <AboutSection/>
      },
      {
        path:"/contact",
        element: <ContactUs/>
      },
      {
        path:"*",
        element: <PageNotFound/>
      }
    ],
  },
]);

export const AllRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
