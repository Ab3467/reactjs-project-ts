import React from 'react';
import { Task as TaskType } from './Types';

interface TaskProps {
  task: TaskType;
  onDeleteTask: (id: number) => void;
}

const Tasks: React.FC<TaskProps> = ({ task, onDeleteTask }) => {
  return (
    <li className="task-item">
      <span>{task.text}</span>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default Tasks;
