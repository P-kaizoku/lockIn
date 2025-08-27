// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Ribbon from "../components/Ribbon";
import TaskContainer from "../components/TaskContainer";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Dashboard = () => {
  //   const navigate = useNavigate();
  const [value, setValue] = useState<Value>(new Date());

  return (
    <div className="  bg-bg min-h-screen pt-8">
      {/* <button onClick={() => navigate("/")}>back</button> */}
      <Ribbon />
      <TaskContainer />
    </div>
  );
};

export default Dashboard;
