import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useAuth } from "./provider/AuthProvider";
import Navbar from "./components/Navbar";

function App() {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  return (
    <Navbar>
      <Router>
        <Routes>
          <Route element={<div className="App">Hello World</div>} path="/" />
          <Route element={<div className="App">Error</div>} path="/404" />
          <Route path="*" element={<div className="App">Error</div>} />
        </Routes>
      </Router>
    </Navbar>
  );
}

export default App;
