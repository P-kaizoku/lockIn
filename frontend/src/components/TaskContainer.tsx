import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  timer: { start: Date; end: Date };
};

const TaskContainer = () => {
  const [tasks, settasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const task: Task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      timer: { start: new Date(), end: new Date() },
    };

    settasks([...tasks, task]);
    setNewTask("");
  };

  return (
    <div className="max-w-sm mx-auto mt-16 min-h-[400px] rounded-2xl bg-neutral-500 shadow-neutral-300 shadow-sm overflow-hidden">
      <h2 className="text-xl font-bold text-center text-neutral-100 bg-neutral-800 p-2">
        Today's tasks
      </h2>
      <p>
        {tasks.length === 0 ? "No tasks for today" : "You have tasks for today"}
      </p>
      <p>
        {tasks.length > 0 && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title} - {task.completed ? "Completed" : "In Progress"}
              </li>
            ))}
          </ul>
        )}
      </p>
      <span>
        <label htmlFor="new-task">Add a new task:</label>
        <input
          type="text"
          id="new-task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </span>
    </div>
  );
};

export default TaskContainer;
