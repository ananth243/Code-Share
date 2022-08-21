import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Chakra from "./config/Chakra";
import AuthState from "./provider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Chakra>
      <AuthState>
        <App />
      </AuthState>
    </Chakra>
  </React.StrictMode>
);
