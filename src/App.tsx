import { useState } from "react";
import ProSideBar from "./components/project-sidebar";
import NoProSelect from "./components/no-project-selected";
import NewProject from "./components/new-project";
import SelectedProject from "./components/selected-project";
import { Project, Task } from "./components/types"; // Adjust the import path as needed

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
      setProjectsId: null, // This will trigger showing NewProject
    }));
  }

  function handleAddProject(projectData: Omit<Project, "id">) {
    setProjectState((prevState) => {
      const ProjectId = Math.random();
      const newPro: Project = {
        ...projectData,
        id: ProjectId,
      };
      return {
        ...prevState,
        setProjectsId: undefined, // Reset to no project selected after adding
        projects: [...prevState.projects, newPro],
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
      const TaskId = Math.random();
      const newTask: Task = {
        text: text,
        id: TaskId,
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
    setProjectState((prevState) => ({
      ...prevState,
      setProjectsId: undefined, // Reset to no project selected on cancel
    }));
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.setProjectsId
  );

  return (
    <main className="h-screen my-8 flex gap-8 mb-0 font-serif">
      <ProSideBar
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        selectedProId={projectState.setProjectsId}
      />
      {projectState.setProjectsId === null && (
        <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
      )}
      {projectState.setProjectsId === undefined ? (
        <NoProSelect onStartAddProject={handleStartAddProject} />
      ) : (
        <SelectedProject
          project={selectedProject!}
          onDeleteProject={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          tasks={projectState.tasks.filter(
            (task) => task.ProId === projectState.setProjectsId
          )}
        />
      )}
    </main>
  );
}
