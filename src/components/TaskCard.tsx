import { Task } from "@/lib/types";
import { getUserById } from "@/lib/mock-data";
import { Calendar, User } from "lucide-react";
import { format, parseISO } from "date-fns";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const statusClass: Record<string, string> = {
  "To Do": "status-todo",
  "In Progress": "status-progress",
  "Done": "status-done",
};

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const assignee = getUserById(task.assignedTo);
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Done";

  return (
    <button
      onClick={onClick}
      className="w-full text-left card-interactive rounded-lg bg-card p-3.5 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-foreground flex-1">{task.title}</h4>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusClass[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center">
            <span className="text-[9px] font-semibold text-primary">
              {assignee?.name.split(" ").map((n) => n[0]).join("") ?? "?"}
            </span>
          </div>
          <span>{assignee?.name ?? "Unassigned"}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}>
          <Calendar className="h-3 w-3" />
          <span>{format(parseISO(task.dueDate), "MMM d")}</span>
        </div>
      </div>
    </button>
  );
};

export default TaskCard;
