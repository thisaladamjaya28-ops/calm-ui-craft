import { useParams } from "react-router-dom";
import { tasks, getUserById, getProjectById } from "@/lib/mock-data";
import PageHeader from "@/components/PageHeader";
import { Calendar, User, FolderOpen, Tag, Clock } from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";

const statusClass: Record<string, string> = {
  "To Do": "status-todo",
  "In Progress": "status-progress",
  "Done": "status-done",
};

const TaskDetail = () => {
  const { taskId } = useParams();
  const task = tasks.find((t) => t.taskId === taskId);

  if (!task) return <div className="p-4 text-muted-foreground">Task not found.</div>;

  const assignee = getUserById(task.assignedTo);
  const project = getProjectById(task.projectId);
  const daysUntilDue = differenceInDays(parseISO(task.dueDate), new Date());
  const isOverdue = daysUntilDue < 0 && task.status !== "Done";

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="Task Details" showBack />

      <div className="px-4 space-y-4 animate-fade-in">
        {/* Status banner */}
        <div className={`rounded-lg p-4 ${
          isOverdue ? "bg-destructive/5 card-border" :
          task.status === "Done" ? "bg-accent" : "bg-card card-elevated"
        }`}>
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground flex-1 leading-tight">{task.title}</h2>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ml-3 ${statusClass[task.status]}`}>
              {task.status}
            </span>
          </div>
          {task.status !== "Done" && (
            <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? "text-destructive" : "text-primary"}`}>
              <Clock className="h-3.5 w-3.5" />
              <span>
                {isOverdue
                  ? `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? "s" : ""}`
                  : `${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""} remaining`
                }
              </span>
            </div>
          )}
        </div>

        {/* Details card */}
        <div className="card-elevated rounded-lg bg-card p-5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <FolderOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Project</p>
                <p className="font-medium text-foreground">{project?.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Assigned to</p>
                <p className="font-medium text-foreground">{assignee?.name ?? "Unassigned"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Due date</p>
                <p className="font-medium text-foreground">{format(parseISO(task.dueDate), "MMMM d, yyyy")}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <Tag className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium text-foreground">{assignee?.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]">
            Edit Task
          </button>
          <button className="flex-1 rounded-lg card-border bg-card py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.98]">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
