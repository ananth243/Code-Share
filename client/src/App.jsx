import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./routes/Index";
import Id from "./routes/Id";
import Links from "./routes/Links";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Navbar>
        <Router>
          <Routes>
            <Route element={<Index />} path="/" />
            <Route path="my-links" element={<Links />} />
            <Route element={<Id />} path=":id" />
          </Routes>
        </Router>
      </Navbar>
    </GoogleOAuthProvider>
  );
}

export default App;
