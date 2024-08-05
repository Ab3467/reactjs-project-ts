import React, { useRef, useState } from "react";
import Tasks from "./Tasks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Project, Task as TaskType } from "./Types";
import Modal from "./Modal"; // Import the Modal component

type SelectedProProps = {
  project: Project;
  onDeleteProject: () => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  tasks: TaskType[];
}

const SelectedPro: React.FC<SelectedProProps> = ({
 project,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
  tasks,
}) => {
  const taskInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
      e.preventDefault();

    const taskText = taskInputRef.current?.value ?? "";
    if (taskText.trim() === "") {
      alert("Please enter task first");
      return;
    }

    onAddTask(taskText);
    if (taskInputRef.current) taskInputRef.current.value = "";
  };

  const handleDeleteConfirmation = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteProject();
    setIsModalOpen(false);
  };

  return (
    <div className="w-2/3 h-full bg-stone-50 px-12 py-16 rounded-xl">
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-stone-500 text-lg">{project.title}</h2>
        <Button onClick={handleDeleteConfirmation} variant="secondary">Delete Project</Button>
      </div>
      <p className="text-stone-400 my-2">{project.description}</p>
      <p className="text-stone-200 text-sm">{project.duedate}</p>

      {/* Thematic Break */}
      <hr className="my-6 border-0 h-px bg-stone-300" /> 

      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          type="text"
          ref={taskInputRef}
          placeholder="Enter new task"
          className="w-full py-2 px-4 rounded-md bg-stone-100 text-stone-800"
        />
        <Button type="submit" variant="ghost">Add</Button>
      </form>

      <div className="mt-8 h-96 overflow-y-auto">
        <ul>
          {tasks.map((task) => (
            <Tasks key={task.id} task={task} onDeleteTask={onDeleteTask} />
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this project?"
        btnCaption="Cancel"
      />
    </div>
  );
};

export default SelectedPro;
