import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="363893782422-tl7m81rdlv6e038aeevqetofdg3gctbs.apps.googleusercontent.com">
      <StrictMode>
        <App />
      </StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
