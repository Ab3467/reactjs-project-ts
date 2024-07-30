import React from 'react';
import { Task as TaskType } from './Types';
import { Button } from './ui/button'; // Adjust this import if your Button component is elsewhere

interface TaskProps {
  task: TaskType;
  onDeleteTask: (id: number) => void;
}

const Tasks: React.FC<TaskProps> = ({ task, onDeleteTask }) => {
  return (
    <li className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded-md shadow-md">
      <span className="text-gray-800">{task.text}</span>
      <Button 
        onClick={() => onDeleteTask(task.id)} 
        variant="outline" 
        size="default"
        className="text-red-500 hover:bg-red-100"
      >
        Clear
      </Button>
    </li>
  );
};

export default Tasks;
