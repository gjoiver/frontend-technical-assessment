import { createBrowserRouter } from "react-router-dom";
import { PortfolioPage } from "@portfolio/presentation/pages/PortfolioPage";
import { ProductsPage } from "@products/presentation/pages/ProductsPage";
import { AppLayout } from "./AppLayout";
import { portfolioInteractor } from "./di/portfolioInteractor";
import { productsInteractor } from "./di/productsInteractor";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <PortfolioPage interactor={portfolioInteractor} />,
      },
      {
        path: "/products",
        element: <ProductsPage interactor={productsInteractor} />,
      },
    ],
  },
]);
