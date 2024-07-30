import React from 'react';
import { Button } from './ui/button';

type ProjectSideBarProps = {
  onStartAddProject: () => void;
};

const ProjectSideBar: React.FC<ProjectSideBarProps> = ({ onStartAddProject }) => {
  return (
    <div className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-200'>Your Projects</h2>
      <div>
        <Button variant="default" size="default" onClick={onStartAddProject}>+ Add Project</Button>
      </div>
    </div>
  );
};

export default ProjectSideBar;
