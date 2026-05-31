import { RouterProvider } from "react-router-dom";
import { AppThemeProvider } from "@shared/ui/theme/AppThemeProvider";
import { router } from "./router";

export function App() {
  return (
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  );
}
