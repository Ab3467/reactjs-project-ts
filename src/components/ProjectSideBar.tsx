import { Project } from "./Types";
import { Button } from "./ui/button";

type ProSideBarProps = {
  onSelectProj: (id: number) => void;
  onStartAddProject: () => void;
  projects: Project[];
  selectedProId: number | undefined; // Use `number | undefined`
};

export default function ProjectSideBar({
  onSelectProj,
  onStartAddProject,
  projects,
  selectedProId,
}: ProSideBarProps) {
  return (
    <div className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <Button
        onClick={onStartAddProject}
      >
        + Add Project
      </Button>
      <ul className="mt-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className={`py-2 px-4 cursor-pointer ${selectedProId === project.id ? 'bg-stone-300' : ''}`}
            onClick={() => onSelectProj(project.id)}
          >
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
