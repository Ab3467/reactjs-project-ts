import React from "react";
import NewTask from "./NewTask";
import { Button } from "./ui/button";

// Define the type for a task
type Task = {
  id: number;
  text: string;
};

// Define the types for the props
type TasksProps = {
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
  tasks: Task[];
};

const Tasks: React.FC<TasksProps> = ({ onAdd, onDelete, tasks }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet!
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <Button variant="outline" onClick={() => onDelete(task.id)}>
                Clear
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
