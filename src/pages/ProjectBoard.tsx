import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, getTasksByProject, users } from "@/lib/mock-data";
import { TaskStatus } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import { Plus, ListFilter } from "lucide-react";

const columns: { status: TaskStatus; label: string }[] = [
  { status: "To Do", label: "To Do" },
  { status: "In Progress", label: "In Progress" },
  { status: "Done", label: "Done" },
];

const ProjectBoard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId ?? "");
  const allTasks = getTasksByProject(projectId ?? "");

  const [search, setSearch] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const teamMembers = useMemo(() => {
    const memberIds = [...new Set(allTasks.map((t) => t.assignedTo))];
    return memberIds.map((id) => users.find((u) => u.uid === id)!).filter(Boolean);
  }, [allTasks]);

  const assigneeOptions = [
    { value: "all", label: "Everyone" },
    ...teamMembers.map((u) => ({ value: u.uid, label: u.name.split(" ")[0] })),
  ];

  const filteredTasks = useMemo(() => {
    return allTasks.filter((t) => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchAssignee = assigneeFilter === "all" || t.assignedTo === assigneeFilter;
      return matchSearch && matchAssignee;
    });
  }, [allTasks, search, assigneeFilter]);

  if (!project) return <div className="p-4 text-muted-foreground">Project not found.</div>;

  const progress = project.taskCount > 0 ? Math.round((project.completedCount / project.taskCount) * 100) : 0;

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title={project.title} subtitle="Kanban Board" showBack gradient />

      {/* Progress summary */}
      <div className="px-4 -mt-1 mb-4">
        <div className="card-elevated rounded-lg bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
            <span>{allTasks.filter((t) => t.status === "Done").length} completed</span>
            <span>{allTasks.filter((t) => t.status === "In Progress").length} in progress</span>
            <span>{allTasks.filter((t) => t.status === "To Do").length} pending</span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search tasks..." />
        <FilterChips options={assigneeOptions} selected={assigneeFilter} onChange={setAssigneeFilter} />

        <div className="pt-1 space-y-6">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.status);
            return (
              <section key={col.status}>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      col.status === "To Do" ? "bg-muted-foreground" :
                      col.status === "In Progress" ? "bg-primary" : "bg-primary"
                    }`} />
                    <h2 className="text-sm font-semibold text-foreground">{col.label}</h2>
                    <span className="text-xs font-medium text-primary bg-accent rounded-full px-2 py-0.5">
                      {colTasks.length}
                    </span>
                  </div>
                  {col.status === "To Do" && (
                    <button className="text-primary hover:bg-accent rounded-md p-1 transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {colTasks.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border bg-card/50 py-4 text-center">
                      <p className="text-xs text-muted-foreground">No tasks</p>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <TaskCard
                        key={task.taskId}
                        task={task}
                        onClick={() => navigate(`/project/${projectId}/task/${task.taskId}`)}
                      />
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;
