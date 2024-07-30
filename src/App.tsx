import { useState } from "react";
import ProjectSideBar from "./components/ProjectSideBar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";
import { Project, Task } from "./components/Types";

type ProjectState = {
  setProjectsId: number | undefined; // Use only number or undefined
  projects: Project[];
  tasks: Task[];
};

export default function App() {
  const [projectState, setProjectState] = useState<ProjectState>({
    setProjectsId: undefined, // Initialize as undefined
    projects: [],
    tasks: [],
  });

  function handleAddTask(text: string) {
    if (text.trim().length <= 0) {
      alert("Please enter a task first");
      return;
    }

    setProjectState((prevState) => {
      const TaskId = Date.now();
      const newTask: Task = {
        text,
        ProId: prevState.setProjectsId, // This should be number or undefined
        id: TaskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
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
    console.log("Starting new project");
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: undefined, // Use undefined instead of null
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
      setProjectsId: undefined, // Use undefined instead of null
    }));
  }

  function handleDelete() {
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: undefined, // Use undefined instead of null
      projects: prevState.projects.filter(
        (project) => project.id !== (prevState.setProjectsId ?? -1)
      ),
    }));
  }

  function handleAddProject(projectData: Omit<Project, 'id'>) {
    setProjectState((prevState) => {
      const ProId = Date.now();
      const newPro: Project = {
        ...projectData,
        id: ProId,
      };
      return {
        ...prevState,
        setProjectsId: undefined, // Use undefined instead of null
        projects: [...prevState.projects, newPro],
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.setProjectsId
  );

  let content;

  if (projectState.setProjectsId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddPro} />;
  } else if (projectState.setProjectsId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />;
  } else {
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDelete}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectState.tasks}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8 font-mono">
      <ProjectSideBar
        onSelectProj={handleSelectProj}
        onStartAddProject={handleStartAddPro}
        projects={projectState.projects}
        selectedProId={projectState.setProjectsId} // Ensure this is number or undefined
      />
      {content}
    </main>
  );
}
