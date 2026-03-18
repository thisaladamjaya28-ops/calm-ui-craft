import { User, Project, Task } from "./types";

export const users: User[] = [
  { uid: "u1", name: "Alex Johnson", studentId: "CS2024001", role: "Frontend Lead" },
  { uid: "u2", name: "Sam Rivera", studentId: "CS2024002", role: "Backend Dev" },
  { uid: "u3", name: "Jordan Lee", studentId: "CS2024003", role: "UI Designer" },
  { uid: "u4", name: "Taylor Kim", studentId: "CS2024004", role: "Database Admin" },
  { uid: "u5", name: "Morgan Chen", studentId: "CS2024005", role: "QA Tester" },
];

export const projects: Project[] = [
  {
    projectId: "p1",
    title: "Mobile App Development",
    description: "Build a cross-platform task tracker for CS coursework using Flutter and Firebase.",
    teamMembers: ["u1", "u2", "u3", "u4"],
    taskCount: 8,
    completedCount: 3,
  },
  {
    projectId: "p2",
    title: "Database Systems Project",
    description: "Design and implement a normalized relational database for a university library system.",
    teamMembers: ["u1", "u4", "u5"],
    taskCount: 5,
    completedCount: 1,
  },
  {
    projectId: "p3",
    title: "Web Technologies Portfolio",
    description: "Create a responsive personal portfolio website showcasing coursework and projects.",
    teamMembers: ["u2", "u3"],
    taskCount: 6,
    completedCount: 4,
  },
];

export const tasks: Task[] = [
  { taskId: "t1", projectId: "p1", title: "Set up Flutter project structure", status: "Done", dueDate: "2026-03-10", assignedTo: "u1" },
  { taskId: "t2", projectId: "p1", title: "Design Kanban board UI", status: "Done", dueDate: "2026-03-12", assignedTo: "u3" },
  { taskId: "t3", projectId: "p1", title: "Implement Firebase authentication", status: "Done", dueDate: "2026-03-14", assignedTo: "u2" },
  { taskId: "t4", projectId: "p1", title: "Build task creation form", status: "In Progress", dueDate: "2026-03-20", assignedTo: "u1" },
  { taskId: "t5", projectId: "p1", title: "Connect Firestore for tasks", status: "In Progress", dueDate: "2026-03-22", assignedTo: "u2" },
  { taskId: "t6", projectId: "p1", title: "Add team roster page", status: "To Do", dueDate: "2026-03-25", assignedTo: "u3" },
  { taskId: "t7", projectId: "p1", title: "Implement deadline tracker", status: "To Do", dueDate: "2026-03-28", assignedTo: "u4" },
  { taskId: "t8", projectId: "p1", title: "Write unit tests", status: "To Do", dueDate: "2026-03-30", assignedTo: "u1" },

  { taskId: "t9", projectId: "p2", title: "Design ER diagram", status: "Done", dueDate: "2026-03-08", assignedTo: "u4" },
  { taskId: "t10", projectId: "p2", title: "Normalize tables to 3NF", status: "In Progress", dueDate: "2026-03-18", assignedTo: "u4" },
  { taskId: "t11", projectId: "p2", title: "Write SQL queries", status: "To Do", dueDate: "2026-03-22", assignedTo: "u1" },
  { taskId: "t12", projectId: "p2", title: "Build stored procedures", status: "To Do", dueDate: "2026-03-25", assignedTo: "u5" },
  { taskId: "t13", projectId: "p2", title: "Create documentation", status: "To Do", dueDate: "2026-03-28", assignedTo: "u1" },

  { taskId: "t14", projectId: "p3", title: "Design wireframes", status: "Done", dueDate: "2026-03-05", assignedTo: "u3" },
  { taskId: "t15", projectId: "p3", title: "Build responsive navbar", status: "Done", dueDate: "2026-03-08", assignedTo: "u2" },
  { taskId: "t16", projectId: "p3", title: "Create project cards section", status: "Done", dueDate: "2026-03-12", assignedTo: "u2" },
  { taskId: "t17", projectId: "p3", title: "Add contact form", status: "Done", dueDate: "2026-03-15", assignedTo: "u3" },
  { taskId: "t18", projectId: "p3", title: "Deploy to hosting", status: "In Progress", dueDate: "2026-03-20", assignedTo: "u2" },
  { taskId: "t19", projectId: "p3", title: "Performance optimization", status: "To Do", dueDate: "2026-03-25", assignedTo: "u3" },
];

export const getUserById = (uid: string) => users.find((u) => u.uid === uid);
export const getTasksByProject = (projectId: string) => tasks.filter((t) => t.projectId === projectId);
export const getProjectById = (projectId: string) => projects.find((p) => p.projectId === projectId);
