import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/client/Home/Home";
import Orders from "./pages/client/Orders";
import Cart from "./pages/client/Cart";
import Leaderboard from "./pages/client/Leaderboard";
import SectionsTemplate from "./components/Templates/SectionsTemplate/SectionsTemplate";
import DashboardTemplate from "./components/Templates/DashboardTemplate";
import MainDashboard from "./pages/employee/MainDashboard";
import DashboardOrders from "./pages/employee/DashboardOrders";
import DashboardIngredients from "./pages/employee/DashboardIngredients";
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
    element: <Home />, // parcialmente feito
  },
  {
    path: "/sections", // TODO
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
    path: "/login", // feito
    element: <Login />,
  },
  {
    path: "/register", // feito
    element: <Register />,
  },
  {
    path: "/dashboard", // TODO
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
        path: "ingredients",
        element: <DashboardIngredients />,
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
