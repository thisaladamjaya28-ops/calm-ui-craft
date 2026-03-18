import { Task } from "@/lib/types";
import { getUserById } from "@/lib/mock-data";
import { Calendar, User } from "lucide-react";
import { format, parseISO } from "date-fns";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const assignee = getUserById(task.assignedTo);
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Done";

  return (
    <button
      onClick={onClick}
      className="w-full text-left card-border rounded-lg bg-card p-3 transition-all duration-200 hover:shadow-sm animate-fade-in"
    >
      <h4 className="text-sm font-medium text-foreground">{task.title}</h4>

      <div className="mt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{assignee?.name ?? "Unassigned"}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs ${isOverdue ? "text-destructive" : "text-muted-foreground"}`}>
          <Calendar className="h-3 w-3" />
          <span>{format(parseISO(task.dueDate), "MMM d")}</span>
        </div>
      </div>
    </button>
  );
};

export default TaskCard;
