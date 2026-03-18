import { useNavigate } from "react-router-dom";
import { Project } from "@/lib/types";
import { Users, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  const progress = project.taskCount > 0 ? Math.round((project.completedCount / project.taskCount) * 100) : 0;

  return (
    <button
      onClick={() => navigate(`/project/${project.projectId}`)}
      className="w-full text-left card-border rounded-lg bg-card p-4 transition-all duration-200 hover:shadow-sm animate-fade-in"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 ml-2 mt-0.5" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{project.teamMembers.length} members</span>
        </div>
        <span className="text-xs font-medium text-primary">{progress}% complete</span>
      </div>

      <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  );
};

export default ProjectCard;
