import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { AppTheme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";
import "./assets/styles/style.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </Provider>
    </BrowserRouter>
  );
};
