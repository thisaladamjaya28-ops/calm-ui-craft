import { useState, useMemo } from "react";
import { projects } from "@/lib/mock-data";
import ProjectCard from "@/components/ProjectCard";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import { Plus, LayoutGrid } from "lucide-react";

type SortOption = "all" | "most-progress" | "least-progress" | "most-members";

const Index = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("all");

  const filtered = useMemo(() => {
    let result = projects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );

    switch (sort) {
      case "most-progress":
        result = [...result].sort((a, b) => (b.completedCount / b.taskCount) - (a.completedCount / a.taskCount));
        break;
      case "least-progress":
        result = [...result].sort((a, b) => (a.completedCount / a.taskCount) - (b.completedCount / b.taskCount));
        break;
      case "most-members":
        result = [...result].sort((a, b) => b.teamMembers.length - a.teamMembers.length);
        break;
    }
    return result;
  }, [search, sort]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "all", label: "All" },
    { value: "most-progress", label: "Most Progress" },
    { value: "least-progress", label: "Needs Work" },
    { value: "most-members", label: "Largest Team" },
  ];

  return (
    <div className="min-h-screen pb-20">
      <PageHeader
        title="DevSync"
        subtitle="Your project hub"
        gradient
        actions={
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <LayoutGrid className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        }
      />

      <div className="px-4 space-y-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search projects..." />
        <FilterChips options={sortOptions} selected={sort} onChange={(v) => setSort(v as SortOption)} />

        <div className="pt-1 space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No projects found</p>
          ) : (
            filtered.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))
          )}
        </div>

        <button className="w-full card-border rounded-lg border-dashed bg-card p-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary hover:border-primary">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>
    </div>
  );
};

export default Index;
