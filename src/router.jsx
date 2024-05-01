import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/client/Home";
import Orders from "./pages/client/Orders";
import Cart from "./pages/client/Cart";
import Leaderboard from "./pages/client/Leaderboard";
import SectionsTemplate from "./components/templates/SectionsTemplate";
import DashboardTemplate from "./components/templates/DashboardTemplate";
import MainDashboard from "./pages/employee/MainDashboard";
import DashboardOrders from "./pages/employee/DashboardOrders";
import DashboardIngredients from "./pages/employee/DashboardIngredients";
import DashboardProducts from "./pages/employee/DashboardProducts";
import DashboardClients from "./pages/employee/DashboardClients";
import DashboardEmployees from "./pages/employee/DashboardEmployees";
import Login from "./pages/Login";
import Register from "./pages/client/Register";

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
            }
        ]
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
            element: <MainDashboard />
          },
          {
            path: "orders",
            element: <DashboardOrders />
          },
          {
            path: "ingredients",
            element: <DashboardIngredients />
          },
          {
            path: "products",
            element: <DashboardProducts />
          },
          {
            path: "clients",
            element: <DashboardClients />
          },
          {
            path: "employees",
            element: <DashboardEmployees />
          },
        ]
      },
]);

export default router;