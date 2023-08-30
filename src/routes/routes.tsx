import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: ":id",
    element: <PortfolioPage />,
  },
];
