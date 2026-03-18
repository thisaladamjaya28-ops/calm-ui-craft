import { useParams } from "react-router-dom";
import { tasks, getUserById, getProjectById } from "@/lib/mock-data";
import PageHeader from "@/components/PageHeader";
import { Calendar, User, FolderOpen, Tag } from "lucide-react";
import { format, parseISO } from "date-fns";

const statusColors: Record<string, string> = {
  "To Do": "bg-secondary text-foreground",
  "In Progress": "bg-primary/10 text-primary",
  "Done": "bg-primary text-primary-foreground",
};

const TaskDetail = () => {
  const { taskId } = useParams();
  const task = tasks.find((t) => t.taskId === taskId);

  if (!task) return <div className="p-4 text-muted-foreground">Task not found.</div>;

  const assignee = getUserById(task.assignedTo);
  const project = getProjectById(task.projectId);

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="Task Details" showBack />

      <div className="px-4 space-y-4 animate-fade-in">
        <div className="card-border rounded-lg bg-card p-5">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex-1">{task.title}</h2>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-3 ${statusColors[task.status]}`}>
              {task.status}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Project:</span>
              <span className="font-medium text-foreground">{project?.title}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Assigned to:</span>
              <span className="font-medium text-foreground">{assignee?.name ?? "Unassigned"}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Due date:</span>
              <span className="font-medium text-foreground">{format(parseISO(task.dueDate), "MMMM d, yyyy")}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium text-foreground">{assignee?.role}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90">
            Edit Task
          </button>
          <button className="flex-1 rounded-lg card-border py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
