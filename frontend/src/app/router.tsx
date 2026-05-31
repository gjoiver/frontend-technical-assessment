import { createBrowserRouter } from "react-router-dom";
import { PortfolioPage } from "@portfolio/presentation/pages/PortfolioPage";
import { portfolioInteractor } from "./di/portfolioInteractor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PortfolioPage interactor={portfolioInteractor} />,
  },
]);
