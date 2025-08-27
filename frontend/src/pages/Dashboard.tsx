import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4 bg-bg min-h-screen">
      <button onClick={() => navigate("/")}>back</button>
    </div>
  );
};

export default Dashboard;
