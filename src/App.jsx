import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import Navbar from "./components/Navbar";
import Index from "./routes/Index";

function App() {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  return (
    <Navbar>
      <Router>
        <Routes>
          <Route element={<Index />} path="/" />
          <Route element={<div className="App">Error</div>} path="/404" />
          <Route path="*" element={<div className="App">Error</div>} />
        </Routes>
      </Router>
    </Navbar>
  );
}

export default App;
