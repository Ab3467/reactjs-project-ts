import React, { useState } from "react";
import ProjectSideBar from "./components/ProjectSideBar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

type Project = {
  id: number;
  title: string;
  // Add other project fields as needed
};

type Task = {
  id: number;
  text: string;
  ProId: number | undefined;
};

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

  function handleAddTask(text: string) {
    if (text.trim().length <= 0) {
      alert("Please enter a task first");
      return;
    }

    setProjectState((prevState) => {
      const TaskId = Math.random();
      const newTask: Task = {
        text: text,
        ProId: prevState.setProjectsId,
        id: TaskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...(prevState.tasks || [])],
      };
    });
  }

  function handleDeleteTask(id: number) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddPro() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        setProjectsId: null,
      };
    });
  }

  function handleSelectProj(id: number) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        setProjectsId: id,
      };
    });
  }

  function handleCancel() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        setProjectsId: undefined,
      };
    });
  }

  function handleDelete() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        setProjectsId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.setProjectsId
        ),
      };
    });
  }

  function handleAddProject(projectData: Omit<Project, 'id'>) {
    setProjectState((prevState) => {
      const ProId = Math.random();
      const newPro: Project = {
        ...projectData,
        id: ProId,
      };
      return {
        setProjectsId: undefined,
        projects: [...prevState.projects, newPro],
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.setProjectsId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDelete}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.setProjectsId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />;
  } else if (projectState.setProjectsId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddPro} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSideBar
        onSelectProj={handleSelectProj}
        onstartAddProject={handleStartAddPro}
        projects={projectState.projects}
        selectedProId={projectState.setProjectsId}
      />
      {content}
    </main>
  );
}
