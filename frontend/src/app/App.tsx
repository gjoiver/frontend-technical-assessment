import { RouterProvider } from "react-router-dom";
import { AppThemeProvider } from "@shared/ui/theme/AppThemeProvider";
import { ErrorBoundary } from "./ErrorBoundary";
import { router } from "./router";

export function App() {
  return (
    <AppThemeProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </AppThemeProvider>
  );
}
