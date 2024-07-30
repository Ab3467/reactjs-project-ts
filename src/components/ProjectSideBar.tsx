import { Project } from "./Types";
import { Button } from "./ui/button";
import { List, ListItem } from 'shadcn';

type ProSideBarProps = {
  onSelectProj: (id: number) => void;
  onStartAddProject: () => void;
  projects: Project[];
  selectedProId: number | undefined; // Ensure this matches the type you’re passing
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
      <Button onClick={onStartAddProject}>+ Add Project</Button>

      <List>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            className={`py-2 px-4 cursor-pointer ${selectedProId === project.id ? 'bg-stone-300' : ''}`}
            onClick={() => onSelectProj(project.id)}
          >
            {project.title}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
