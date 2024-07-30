import { Project } from "./Types";


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
    <aside className="w-64 bg-stone-200 p-4">
      <button
        className="w-full py-2 bg-stone-300 text-stone-700 hover:bg-stone-400"
        onClick={onStartAddProject}
      >
        Add New Project
      </button>
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
    </aside>
  );
}
