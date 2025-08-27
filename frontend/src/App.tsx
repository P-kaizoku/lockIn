import Hello from "./pages/Hello";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Titlebar from "./components/titlebar";

const App = () => {
  return (
    <div className="min-h-screen bg-neutral-800 text-indigo-200">
      <Titlebar />
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
