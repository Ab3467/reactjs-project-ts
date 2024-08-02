import React, { useRef, useState } from "react";
import ProSideBar from "./components/ProjectSideBar";
import NoProSelect from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedPro from "./components/SelectedProject";

type Project = {
  id: number;
  title: string;
  description: string;
  duedate: string;
};

type Task = {
  id: number;
  text: string;
  ProId: number | null;
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
        ProId: prevState.setProjectsId !== undefined ? prevState.setProjectsId : -1, // Handle undefined case
        id: TaskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...(prevState.tasks || [])],
      };
    });
  }

  function handleDeleteTask(id: number) {
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  function handleStartAddPro() {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: null,
    }));
  }

  function handleSelectProj(id: number) {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: id,
    }));
  }

  function handleCancel() {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: undefined,
    }));
  }

  function handleDelete() {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.setProjectsId
      ),
    }));
  }

  function handleAddProject(projectData: Omit<Project, "id">) {
    setProjectState((prevState) => {
      const ProId = Math.random();
      const newPro: Project = {
        ...projectData,
        id: ProId,
      };
      return {
        ...prevState,
        setProjectsId: undefined,
        projects: [...prevState.projects, newPro],
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.setProjectsId
  );

  let content;

  if (projectState.setProjectsId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />;
  } else if (projectState.setProjectsId === undefined) {
    content = <NoProSelect onStartAddProject={handleStartAddPro} />;
  } else {
    content = (
      <SelectedPro
        project={selectedProject!}
        onDelete={handleDelete}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectState.tasks.filter(
          (task) => task.ProId === projectState.setProjectsId
        )}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8 mb-0 font-sans">
      <ProSideBar
        onSelectProject={handleSelectProj}
        onStartAddProject={handleStartAddPro}
        projects={projectState.projects}
        selectedProId={projectState.setProjectsId}
      />
      {content}
    </main>
  );
}
