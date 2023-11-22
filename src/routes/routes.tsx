// import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";

// TODO: Add your routes here
// This route is created for demonstration purposes

export const routes = [
  {
    path: "/",
    element: <PortfolioPage />,
  },
  {
    path: "/:id",
    element: <PortfolioPage />,
  },
  {
    path: "*",
    element: <PortfolioPage />,
  },
];
