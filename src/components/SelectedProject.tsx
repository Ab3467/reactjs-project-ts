import React, { useRef } from "react";
import Tasks from "./Tasks";
import { Button } from "./ui/button";
import { Project, Task as TaskType } from "./Types";

interface SelectedProProps {
  project: Project;
  onDelete: () => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  tasks: TaskType[];
}

const SelectedPro: React.FC<SelectedProProps> = ({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
}) => {
  const taskInputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const taskText = taskInputRef.current?.value ?? "";
    if (taskText.trim()) {
      onAddTask(taskText);
      if (taskInputRef.current) taskInputRef.current.value = "";
    }
  };

  return (
    <div className="w-2/3 h-full bg-stone-50 px-12 py-16 rounded-xl">
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-stone-500 text-lg">{project.title}</h2>
        <Button onClick={onDelete} variant="ghost">Delete</Button>
      </div>
      <p className="text-stone-400 my-2">{project.description}</p>
      <p className="text-stone-200 text-sm">{project.duedate}</p>

      <hr className="my-6 border-0 h-px bg-stone-300" />

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          ref={taskInputRef}
          placeholder="New task"
          className="w-full py-2 px-4 rounded-md bg-stone-100 text-stone-800"
        />
        <Button type="submit">Add</Button>
      </form>

      <ul className="mt-8">
        {tasks.map((task) => (
          <Tasks key={task.id} task={task} onDeleteTask={onDeleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default SelectedPro;
