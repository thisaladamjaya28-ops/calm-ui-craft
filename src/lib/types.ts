export interface User {
  uid: string;
  name: string;
  studentId: string;
  role: string;
  avatar?: string;
}

export interface Project {
  projectId: string;
  title: string;
  description: string;
  teamMembers: string[];
  taskCount: number;
  completedCount: number;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  taskId: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string;
}
