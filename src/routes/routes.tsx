import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";
import EditPage from "../pages/EditPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import CreateUserPage from "../pages/CreateUserPage";
import DocumentPage from "../pages/DocumentPage";
import CookieProtect from "./cookieProtect";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/edit",
    element: (
      <CookieProtect>
        <EditPage />
      </CookieProtect>
    ),
  },
  {
    path: "/login",
    element: (
      <CookieProtect>
        <LoginPage />
      </CookieProtect>
    ),
  },
  {
    path: "/create",
    element: (
      <CookieProtect>
        <CreateUserPage />
      </CookieProtect>
    ),
  },
  {
    path: "docs/*",
    element: <DocumentPage />,
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
