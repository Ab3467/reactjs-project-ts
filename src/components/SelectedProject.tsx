import React, { useState } from "react";
import Tasks from "./Tasks";
import { Button } from "./ui/button";
import { Project, Task as TaskType } from "./Types";
import Modal from "./Modal";
import NewTask from "./NewTask";

type SelectedProProps = {
  project: Project;
  onDeleteProject: () => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  tasks: TaskType[];
};

const SelectedPro: React.FC<SelectedProProps> = ({project,onDeleteProject,onAddTask,onDeleteTask,tasks,}) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Button onClick={handleDeleteConfirmation} variant="secondary">
          Delete Project
        </Button>
      </div>
      <p className="text-stone-400 my-2">{project.description}</p>
      <p className="text-stone-200 text-sm">{project.duedate}</p>

      {/* Thematic Break */}
      <hr className="my-6 border-0 h-px bg-stone-300" />
      
      <NewTask onAddTask={onAddTask} />

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
