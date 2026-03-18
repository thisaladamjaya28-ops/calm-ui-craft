import { tasks, getProjectById, getUserById } from "@/lib/mock-data";
import PageHeader from "@/components/PageHeader";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { Calendar, FolderOpen } from "lucide-react";

const Deadlines = () => {
  const now = new Date();
  const upcoming = tasks
    .filter((t) => t.status !== "Done")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="Deadlines" subtitle="Upcoming tasks across all projects" />

      <div className="px-4 space-y-2">
        {upcoming.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">All caught up! 🎉</p>
        ) : (
          upcoming.map((task, i) => {
            const project = getProjectById(task.projectId);
            const assignee = getUserById(task.assignedTo);
            const isOverdue = isBefore(parseISO(task.dueDate), now);

            return (
              <div
                key={task.taskId}
                className="card-border rounded-lg bg-card p-4 animate-fade-in"
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
                  <div className={`flex items-center gap-1 text-xs font-medium shrink-0 ml-3 ${isOverdue ? "text-destructive" : "text-primary"}`}>
                    <Calendar className="h-3 w-3" />
                    <span>{format(parseISO(task.dueDate), "MMM d")}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{assignee?.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    task.status === "In Progress" ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"
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
  );
};

export default Deadlines;
