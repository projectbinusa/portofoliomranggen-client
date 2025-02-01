import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar"; // Make sure Sidebar.jsx exists in src/components/
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Sidebar /> Sidebar visible on all pages */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Sidebar />} />

            <Route path="/sidebar" element={<Sidebar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
