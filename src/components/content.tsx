import React from 'react';
import NewProject from '../components/new-project';
import NoProSelect from '../components/no-project-selected';
import SelectedProject from '../components/selected-project';
import { Project, Task } from '../components/types'; // Adjust the import path as needed

type ContentProps = {
  projectState: {
    setProjectsId: number | null | undefined;
    projects: Project[];
    tasks: Task[];
  };
  onAddProject: (projectData: Omit<Project, "id">) => void;
  onDeleteProject: () => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  onStartAddProject: () => void;
  onCancel: () => void;
};

const Content: React.FC<ContentProps> = ({
  projectState,
  onAddProject,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
  onStartAddProject,
  onCancel
}) => {
  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.setProjectsId
  );

  return (
    <>
      {projectState.setProjectsId === null ? (
        <NewProject onAdd={onAddProject} onCancel={onCancel} />
      ) : projectState.setProjectsId === undefined ? (
        <NoProSelect onStartAddProject={onStartAddProject} />
      ) : (
        <SelectedProject
          project={selectedProject!}
          onDeleteProject={onDeleteProject}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
          tasks={projectState.tasks.filter(
            (task) => task.ProId === projectState.setProjectsId
          )}
        />
      )}
    </>
  );
};

export default Content;
