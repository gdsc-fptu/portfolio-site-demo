import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";
import EditPage from "../pages/EditPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateUserPage from "../pages/CreateUserPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/edit",
    element: <EditPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create",
    element: <CreateUserPage />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "/:id",
    element: <PortfolioPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
