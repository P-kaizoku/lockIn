import { useNavigate } from "react-router";
import { motion } from "motion/react";

const Hello = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/dashboard");
  }, 2500);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1.5 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        exit={{ opacity: 0, scale: 0 }}
        className="text-4xl font-bold text-gray-800 mb-4"
      >
        Hello!
      </motion.h1>
      <p className="text-lg text-gray-600 mb-8">Welcome to LockIn</p>
    </div>
  );
};

export default Hello;
