import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, getTasksByProject } from "@/lib/mock-data";
import { TaskStatus } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";

const columns: { status: TaskStatus; label: string }[] = [
  { status: "To Do", label: "To Do" },
  { status: "In Progress", label: "In Progress" },
  { status: "Done", label: "Done" },
];

const ProjectBoard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId ?? "");
  const tasks = getTasksByProject(projectId ?? "");

  if (!project) return <div className="p-4 text-muted-foreground">Project not found.</div>;

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title={project.title} subtitle="Kanban Board" showBack />

      <div className="px-4 space-y-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.status);
          return (
            <section key={col.status}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-foreground">{col.label}</h2>
                  <span className="text-xs font-medium text-primary bg-secondary rounded-full px-2 py-0.5">
                    {colTasks.length}
                  </span>
                </div>
                {col.status === "To Do" && (
                  <button className="text-primary">
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {colTasks.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-3 text-center">No tasks</p>
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
  );
};

export default ProjectBoard;
