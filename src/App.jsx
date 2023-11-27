import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AppTheme } from "./theme";

export const App = () => {
  return (
    <BrowserRouter>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </BrowserRouter>
  );
};
