import { useNavigate } from "react-router-dom";
import { Project } from "@/lib/types";
import { Users, ChevronRight, FolderOpen } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  const progress = project.taskCount > 0 ? Math.round((project.completedCount / project.taskCount) * 100) : 0;

  return (
    <button
      onClick={() => navigate(`/project/${project.projectId}`)}
      className="w-full text-left card-interactive rounded-lg bg-card p-4 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
          <FolderOpen className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{project.description}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>{project.teamMembers.length} members</span>
            </div>
            <span className="text-xs font-semibold text-primary">{progress}%</span>
          </div>

          <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
