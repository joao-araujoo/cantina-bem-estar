import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import Orders from "./pages/client/Orders";
import Cart from "./pages/client/Cart";
import Leaderboard from "./pages/client/Leaderboard";
import SectionsTemplate from "./Templates/SectionsTemplate/SectionsTemplate";
import DashboardTemplate from "./Templates/DashboardTemplate/DashboardTemplate";
import MainDashboard from "./pages/employee/MainDashboard";
import DashboardOrders from "./pages/employee/DashboardOrders";
import DashboardProducts from "./pages/employee/DashboardProducts";
import DashboardClients from "./pages/employee/DashboardClients";
import DashboardEmployees from "./pages/employee/DashboardEmployees";
import Login from "./pages/Login/Index";
import Register from "./pages/client/Register";
import Account from "./pages/client/Account";
import Help from "./pages/client/Help";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sections",
    element: <SectionsTemplate />,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <DashboardTemplate />,
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      {
        path: "orders",
        element: <DashboardOrders />,
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "clients",
        element: <DashboardClients />,
      },
      {
        path: "employees",
        element: <DashboardEmployees />,
      },
    ],
  },
]);

export default router;
