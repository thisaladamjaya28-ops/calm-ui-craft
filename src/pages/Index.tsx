import { projects } from "@/lib/mock-data";
import ProjectCard from "@/components/ProjectCard";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="DevSync" subtitle="Your project hub" />

      <div className="px-4 space-y-3">
        {projects.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}

        <button className="w-full card-border rounded-lg border-dashed p-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary hover:border-primary">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>
    </div>
  );
};

export default Index;
