import { useState, useMemo } from "react";
import { tasks, getProjectById, getUserById, projects } from "@/lib/mock-data";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import { format, parseISO, isBefore } from "date-fns";
import { Calendar, FolderOpen } from "lucide-react";

const Deadlines = () => {
  const now = new Date();
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const projectOptions = [
    { value: "all", label: "All Projects" },
    ...projects.map((p) => ({ value: p.projectId, label: p.title.split(" ").slice(0, 2).join(" ") })),
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
  ];

  const upcoming = useMemo(() => {
    return tasks
      .filter((t) => t.status !== "Done")
      .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
      .filter((t) => projectFilter === "all" || t.projectId === projectFilter)
      .filter((t) => statusFilter === "all" || t.status === statusFilter)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [search, projectFilter, statusFilter]);

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="Deadlines" subtitle="Upcoming tasks across all projects" gradient />

      <div className="px-4 space-y-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search deadlines..." />

        <div className="space-y-2">
          <FilterChips options={projectOptions} selected={projectFilter} onChange={setProjectFilter} />
          <FilterChips options={statusOptions} selected={statusFilter} onChange={setStatusFilter} />
        </div>

        <div className="pt-1 space-y-2">
          {upcoming.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">All caught up! 🎉</p>
              <p className="text-muted-foreground/60 text-xs mt-1">No pending deadlines</p>
            </div>
          ) : (
            upcoming.map((task, i) => {
              const project = getProjectById(task.projectId);
              const assignee = getUserById(task.assignedTo);
              const isOverdue = isBefore(parseISO(task.dueDate), now);

              return (
                <div
                  key={task.taskId}
                  className={`card-interactive rounded-lg bg-card p-4 animate-fade-in ${isOverdue ? "border-l-2 border-l-destructive" : ""}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">{task.title}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <FolderOpen className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{project?.title}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold shrink-0 ml-3 px-2 py-0.5 rounded-full ${
                      isOverdue ? "bg-destructive/10 text-destructive" : "bg-accent text-primary"
                    }`}>
                      <Calendar className="h-3 w-3" />
                      <span>{format(parseISO(task.dueDate), "MMM d")}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-[9px] font-semibold text-primary">
                          {assignee?.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{assignee?.name}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      task.status === "In Progress" ? "status-progress" : "status-todo"
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Deadlines;
