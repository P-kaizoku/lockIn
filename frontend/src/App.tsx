import Hello from "./pages/Hello";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Titlebar from "./components/titlebar";

const App = () => {
  return (
    <div className="min-h-screen bg-bg">
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
