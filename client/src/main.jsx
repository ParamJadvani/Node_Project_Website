import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import ThemeProvider from "./theme/Theme";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
