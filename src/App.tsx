import { useState } from 'react';
import ProSideBar from './components/project-sidebar';
import Content from './components/content'; // Adjust the import path as needed
import { Project, Task } from './components/types'; // Adjust the import path as needed

type ProjectState = {
  setProjectsId: number | null | undefined;
  projects: Project[];
  tasks: Task[];
};

export default function App() {
  const [projectState, setProjectState] = useState<ProjectState>({
    setProjectsId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: null, 
    }));
  }

  function handleAddProject(projectData: Omit<Project, "id">) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject: Project = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        setProjectsId: undefined, // Reset to no project selected after adding
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: undefined, // Reset to no project selected after deleting
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.setProjectsId
      ),
    }));
  }

  function handleAddTask(text: string) {
    setProjectState((prevTasks) => {
      const taskId = Math.random();
      const newTask: Task = {
        text: text,
        id: taskId,
        ProId:
          prevTasks.setProjectsId !== undefined ? prevTasks.setProjectsId : -1,
      };
      return {
        ...prevTasks,
        tasks: [newTask, ...prevTasks.tasks],
      };
    });
  }

  function handleDeleteTask(id: number) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  function handleSelectProject(id: number) {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: id,
    }));
  }

  function handleCancel() {
    setProjectState((prevState)=>({
      ...prevState,
      setProjectsId: undefined
    }))
  }

  return (
    <main className="h-screen my-8 flex gap-8 mb-0 font-serif">
      <ProSideBar
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        selectedProId={projectState.setProjectsId}
      />
      <Content
        projectState={projectState}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onStartAddProject={handleStartAddProject}
        onCancel={handleCancel}
      />
    </main>
  );
}
