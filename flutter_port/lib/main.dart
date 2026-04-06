import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

void main() {
  runApp(const DevSyncApp());
}

class DevSyncApp extends StatelessWidget {
  const DevSyncApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DevSync',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF0F766E)),
        scaffoldBackgroundColor: const Color(0xFFF3F7F8),
        appBarTheme: const AppBarTheme(backgroundColor: Colors.transparent, elevation: 0),
        cardTheme: CardThemeData(
          elevation: 0,
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          color: Colors.white,
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFD9E4E6)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFD9E4E6)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF0F766E), width: 1.3),
          ),
        ),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class AppUser {
  final String uid;
  final String name;
  final String studentId;
  final String role;

  const AppUser({
    required this.uid,
    required this.name,
    required this.studentId,
    required this.role,
  });
}

class Project {
  final String projectId;
  final String title;
  final String description;
  final List<String> teamMembers;
  final int taskCount;
  final int completedCount;

  const Project({
    required this.projectId,
    required this.title,
    required this.description,
    required this.teamMembers,
    required this.taskCount,
    required this.completedCount,
  });
}

enum TaskStatus { todo, inProgress, done }

extension TaskStatusX on TaskStatus {
  String get label {
    switch (this) {
      case TaskStatus.todo:
        return 'To Do';
      case TaskStatus.inProgress:
        return 'In Progress';
      case TaskStatus.done:
        return 'Done';
    }
  }
}

class Task {
  final String taskId;
  final String projectId;
  final String title;
  final TaskStatus status;
  final DateTime dueDate;
  final String assignedTo;

  const Task({
    required this.taskId,
    required this.projectId,
    required this.title,
    required this.status,
    required this.dueDate,
    required this.assignedTo,
  });
}

class DataStore {
  static const users = <AppUser>[
    AppUser(uid: 'u1', name: 'Alex Johnson', studentId: 'CS2024001', role: 'Frontend Lead'),
    AppUser(uid: 'u2', name: 'Sam Rivera', studentId: 'CS2024002', role: 'Backend Dev'),
    AppUser(uid: 'u3', name: 'Jordan Lee', studentId: 'CS2024003', role: 'UI Designer'),
    AppUser(uid: 'u4', name: 'Taylor Kim', studentId: 'CS2024004', role: 'Database Admin'),
    AppUser(uid: 'u5', name: 'Morgan Chen', studentId: 'CS2024005', role: 'QA Tester'),
  ];

  static const projects = <Project>[
    Project(
      projectId: 'p1',
      title: 'Mobile App Development',
      description: 'Build a cross-platform task tracker for CS coursework using Flutter and Firebase.',
      teamMembers: ['u1', 'u2', 'u3', 'u4'],
      taskCount: 8,
      completedCount: 3,
    ),
    Project(
      projectId: 'p2',
      title: 'Database Systems Project',
      description: 'Design and implement a normalized relational database for a university library system.',
      teamMembers: ['u1', 'u4', 'u5'],
      taskCount: 5,
      completedCount: 1,
    ),
    Project(
      projectId: 'p3',
      title: 'Web Technologies Portfolio',
      description: 'Create a responsive personal portfolio website showcasing coursework and projects.',
      teamMembers: ['u2', 'u3'],
      taskCount: 6,
      completedCount: 4,
    ),
  ];

  static final tasks = <Task>[
    Task(taskId: 't1', projectId: 'p1', title: 'Set up Flutter project structure', status: TaskStatus.done, dueDate: DateTime(2026, 3, 10), assignedTo: 'u1'),
    Task(taskId: 't2', projectId: 'p1', title: 'Design Kanban board UI', status: TaskStatus.done, dueDate: DateTime(2026, 3, 12), assignedTo: 'u3'),
    Task(taskId: 't3', projectId: 'p1', title: 'Implement Firebase authentication', status: TaskStatus.done, dueDate: DateTime(2026, 3, 14), assignedTo: 'u2'),
    Task(taskId: 't4', projectId: 'p1', title: 'Build task creation form', status: TaskStatus.inProgress, dueDate: DateTime(2026, 3, 20), assignedTo: 'u1'),
    Task(taskId: 't5', projectId: 'p1', title: 'Connect Firestore for tasks', status: TaskStatus.inProgress, dueDate: DateTime(2026, 3, 22), assignedTo: 'u2'),
    Task(taskId: 't6', projectId: 'p1', title: 'Add team roster page', status: TaskStatus.todo, dueDate: DateTime(2026, 3, 25), assignedTo: 'u3'),
    Task(taskId: 't7', projectId: 'p1', title: 'Implement deadline tracker', status: TaskStatus.todo, dueDate: DateTime(2026, 3, 28), assignedTo: 'u4'),
    Task(taskId: 't8', projectId: 'p1', title: 'Write unit tests', status: TaskStatus.todo, dueDate: DateTime(2026, 3, 30), assignedTo: 'u1'),
    Task(taskId: 't9', projectId: 'p2', title: 'Design ER diagram', status: TaskStatus.done, dueDate: DateTime(2026, 3, 8), assignedTo: 'u4'),
    Task(taskId: 't10', projectId: 'p2', title: 'Normalize tables to 3NF', status: TaskStatus.inProgress, dueDate: DateTime(2026, 3, 18), assignedTo: 'u4'),
    Task(taskId: 't11', projectId: 'p2', title: 'Write SQL queries', status: TaskStatus.todo, dueDate: DateTime(2026, 3, 22), assignedTo: 'u1'),
    Task(taskId: 't12', projectId: 'p2', title: 'Build stored procedures', status: TaskStatus.todo, dueDate: DateTime(2026, 3, 25), assignedTo: 'u5'),
    Task(taskId: 't13', projectId: 'p2', title: 'Create documentation', status: TaskStatus.todo, dueDate: DateTime(2026, 3, 28), assignedTo: 'u1'),
    Task(taskId: 't14', projectId: 'p3', title: 'Design wireframes', status: TaskStatus.done, dueDate: DateTime(2026, 3, 5), assignedTo: 'u3'),
    Task(taskId: 't15', projectId: 'p3', title: 'Build responsive navbar', status: TaskStatus.done, dueDate: DateTime(2026, 3, 8), assignedTo: 'u2'),
    Task(taskId: 't16', projectId: 'p3', title: 'Create project cards section', status: TaskStatus.done, dueDate: DateTime(2026, 3, 12), assignedTo: 'u2'),
    Task(taskId: 't17', projectId: 'p3', title: 'Add contact form', status: TaskStatus.done, dueDate: DateTime(2026, 3, 15), assignedTo: 'u3'),
    Task(taskId: 't18', projectId: 'p3', title: 'Deploy to hosting', status: TaskStatus.inProgress, dueDate: DateTime(2026, 3, 20), assignedTo: 'u2'),
    Task(taskId: 't19', projectId: 'p3', title: 'Performance optimization', status: TaskStatus.todo, dueDate: DateTime(2026, 3, 25), assignedTo: 'u3'),
  ];

  static AppUser? userById(String uid) {
    for (final user in users) {
      if (user.uid == uid) return user;
    }
    return null;
  }

  static Project? projectById(String projectId) {
    for (final project in projects) {
      if (project.projectId == projectId) return project;
    }
    return null;
  }

  static List<Task> tasksByProject(String projectId) {
    return tasks.where((t) => t.projectId == projectId).toList();
  }
}

enum HomeSort { all, mostProgress, leastProgress, mostMembers }

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String search = '';
  HomeSort sort = HomeSort.all;

  @override
  Widget build(BuildContext context) {
    var filtered = DataStore.projects.where((p) {
      final q = search.toLowerCase();
      return p.title.toLowerCase().contains(q) || p.description.toLowerCase().contains(q);
    }).toList();

    switch (sort) {
      case HomeSort.mostProgress:
        filtered.sort((a, b) => (b.completedCount / b.taskCount).compareTo(a.completedCount / a.taskCount));
        break;
      case HomeSort.leastProgress:
        filtered.sort((a, b) => (a.completedCount / a.taskCount).compareTo(b.completedCount / b.taskCount));
        break;
      case HomeSort.mostMembers:
        filtered.sort((a, b) => b.teamMembers.length.compareTo(a.teamMembers.length));
        break;
      case HomeSort.all:
        break;
    }

    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        children: [
          const _PageHeader(
            title: 'DevSync',
            subtitle: 'Your project hub',
            icon: Icons.grid_view_rounded,
          ),
          const SizedBox(height: 12),
          TextField(
            decoration: const InputDecoration(
              hintText: 'Search projects...',
              prefixIcon: Icon(Icons.search),
            ),
            onChanged: (v) => setState(() => search = v),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _choiceChip('All', sort == HomeSort.all, () => setState(() => sort = HomeSort.all)),
                _choiceChip('Most Progress', sort == HomeSort.mostProgress, () => setState(() => sort = HomeSort.mostProgress)),
                _choiceChip('Needs Work', sort == HomeSort.leastProgress, () => setState(() => sort = HomeSort.leastProgress)),
                _choiceChip('Largest Team', sort == HomeSort.mostMembers, () => setState(() => sort = HomeSort.mostMembers)),
              ],
            ),
          ),
          const SizedBox(height: 12),
          if (filtered.isEmpty)
            const Padding(
              padding: EdgeInsets.all(24),
              child: Center(child: Text('No projects found')),
            )
          else
            ...filtered.map((project) {
              final progress = project.taskCount == 0 ? 0 : (project.completedCount / project.taskCount * 100).round();
              return Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Card(
                  child: InkWell(
                    borderRadius: BorderRadius.circular(14),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => ProjectBoardPage(projectId: project.projectId)),
                      );
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  project.title,
                                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
                                ),
                              ),
                              const Icon(Icons.chevron_right_rounded, color: Color(0xFF5A6B70)),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text(
                            project.description,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(color: Color(0xFF5A6B70), fontSize: 12.8),
                          ),
                          const SizedBox(height: 12),
                          Row(
                            children: [
                              Expanded(
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(99),
                                  child: LinearProgressIndicator(
                                    minHeight: 7,
                                    value: progress / 100,
                                    backgroundColor: const Color(0xFFE7EFF0),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Text(
                                '$progress%',
                                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF0F766E)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '${project.teamMembers.length} team members',
                            style: const TextStyle(fontSize: 12, color: Color(0xFF74868B)),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            }),
          const SizedBox(height: 2),
          OutlinedButton.icon(
            onPressed: () {},
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 14),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              side: const BorderSide(color: Color(0xFFBFD0D3), style: BorderStyle.solid),
              foregroundColor: const Color(0xFF4C6166),
              backgroundColor: Colors.white,
            ),
            icon: const Icon(Icons.add),
            label: const Text('New Project', style: TextStyle(fontWeight: FontWeight.w600)),
          ),
        ],
      ),
      bottomNavigationBar: const AppBottomNav(current: 0),
    );
  }
}

class ProjectBoardPage extends StatefulWidget {
  final String projectId;

  const ProjectBoardPage({super.key, required this.projectId});

  @override
  State<ProjectBoardPage> createState() => _ProjectBoardPageState();
}

class _ProjectBoardPageState extends State<ProjectBoardPage> {
  String search = '';
  String assignee = 'all';

  @override
  Widget build(BuildContext context) {
    final project = DataStore.projectById(widget.projectId);
    if (project == null) {
      return const Scaffold(body: Center(child: Text('Project not found')));
    }

    final allTasks = DataStore.tasksByProject(widget.projectId);
    final teamMemberIds = allTasks.map((t) => t.assignedTo).toSet().toList();

    final filtered = allTasks.where((t) {
      final matchSearch = t.title.toLowerCase().contains(search.toLowerCase());
      final matchAssignee = assignee == 'all' || t.assignedTo == assignee;
      return matchSearch && matchAssignee;
    }).toList();

    final progress = project.taskCount == 0 ? 0 : (project.completedCount / project.taskCount * 100).round();

    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        children: [
          _PageHeader(title: project.title, subtitle: 'Kanban Board', icon: Icons.view_kanban_rounded),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Overall Progress'),
                      Text('$progress%', style: const TextStyle(fontWeight: FontWeight.w700)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  LinearProgressIndicator(value: progress / 100),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            decoration: const InputDecoration(
              hintText: 'Search tasks...',
              prefixIcon: Icon(Icons.search),
            ),
            onChanged: (v) => setState(() => search = v),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _choiceChip('Everyone', assignee == 'all', () => setState(() => assignee = 'all')),
                ...teamMemberIds.map((id) {
                  final user = DataStore.userById(id);
                  final label = user == null ? id : user.name.split(' ').first;
                  return _choiceChip(label, assignee == id, () => setState(() => assignee = id));
                }),
              ],
            ),
          ),
          const SizedBox(height: 12),
          ...TaskStatus.values.map((status) {
            final byStatus = filtered.where((t) => t.status == status).toList();
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('${status.label} (${byStatus.length})', style: const TextStyle(fontWeight: FontWeight.w700)),
                      const SizedBox(height: 8),
                      if (byStatus.isEmpty)
                        const Text('No tasks')
                      else
                        ...byStatus.map((task) {
                          final assigneeUser = DataStore.userById(task.assignedTo);
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: InkWell(
                              borderRadius: BorderRadius.circular(10),
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (_) => TaskDetailPage(taskId: task.taskId)),
                                );
                              },
                              child: Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFF8FBFB),
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(color: const Color(0xFFE2ECEE)),
                                ),
                                child: Row(
                                  children: [
                                    CircleAvatar(
                                      radius: 14,
                                      backgroundColor: const Color(0xFFDCECEE),
                                      child: Text(
                                        _initials(assigneeUser?.name ?? 'U'),
                                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF0F766E)),
                                      ),
                                    ),
                                    const SizedBox(width: 10),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(task.title, style: const TextStyle(fontWeight: FontWeight.w600)),
                                          const SizedBox(height: 2),
                                          Text(
                                            DateFormat('MMM d, yyyy').format(task.dueDate),
                                            style: const TextStyle(fontSize: 12, color: Color(0xFF677C81)),
                                          ),
                                        ],
                                      ),
                                    ),
                                    const Icon(Icons.chevron_right_rounded, color: Color(0xFF5A6B70)),
                                  ],
                                ),
                              ),
                            ),
                          );
                        }),
                    ],
                  ),
                ),
              ),
            );
          }),
        ],
      ),
      bottomNavigationBar: const AppBottomNav(current: 0),
    );
  }
}

class TaskDetailPage extends StatelessWidget {
  final String taskId;

  const TaskDetailPage({super.key, required this.taskId});

  @override
  Widget build(BuildContext context) {
    Task? task;
    for (final t in DataStore.tasks) {
      if (t.taskId == taskId) {
        task = t;
        break;
      }
    }

    if (task == null) {
      return const Scaffold(body: Center(child: Text('Task not found')));
    }

    final project = DataStore.projectById(task.projectId);
    final assignee = DataStore.userById(task.assignedTo);
    final now = DateTime.now();
    final daysUntilDue = task.dueDate.difference(DateTime(now.year, now.month, now.day)).inDays;
    final isOverdue = daysUntilDue < 0 && task.status != TaskStatus.done;

    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        children: [
          const _PageHeader(title: 'Task Detail', subtitle: 'Details and due status', icon: Icons.assignment_rounded),
          const SizedBox(height: 12),
          Card(
            color: isOverdue ? Colors.red.shade50 : null,
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(task.title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18)),
                  const SizedBox(height: 8),
                  _statusPill(task.status),
                  if (task.status != TaskStatus.done)
                    Text(
                      isOverdue
                          ? 'Overdue by ${daysUntilDue.abs()} day(s)'
                          : '$daysUntilDue day(s) remaining',
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _detailRow('Project', project?.title ?? '-'),
                  _detailRow('Assigned to', assignee?.name ?? '-'),
                  _detailRow('Due date', DateFormat('MMMM d, yyyy').format(task.dueDate)),
                  _detailRow('Role', assignee?.role ?? '-'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: FilledButton(
                  onPressed: () {},
                  child: const Text('Edit Task'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: OutlinedButton(
                  onPressed: () {},
                  child: const Text('Delete'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _detailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 90, child: Text(label, style: const TextStyle(fontWeight: FontWeight.w600))),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }
}

class TeamRosterPage extends StatefulWidget {
  const TeamRosterPage({super.key});

  @override
  State<TeamRosterPage> createState() => _TeamRosterPageState();
}

class _TeamRosterPageState extends State<TeamRosterPage> {
  String search = '';
  String role = 'all';

  @override
  Widget build(BuildContext context) {
    final roles = DataStore.users.map((u) => u.role).toSet().toList();
    final filtered = DataStore.users.where((u) {
      final q = search.toLowerCase();
      final matchSearch = u.name.toLowerCase().contains(q) || u.studentId.contains(search);
      final matchRole = role == 'all' || u.role == role;
      return matchSearch && matchRole;
    }).toList();

    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        children: [
          const _PageHeader(title: 'Team Roster', subtitle: 'All project members', icon: Icons.groups_rounded),
          const SizedBox(height: 12),
          TextField(
            decoration: const InputDecoration(
              hintText: 'Search by name or ID...',
              prefixIcon: Icon(Icons.search),
            ),
            onChanged: (v) => setState(() => search = v),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _choiceChip('All Roles', role == 'all', () => setState(() => role = 'all')),
                ...roles.map((r) => _choiceChip(r, role == r, () => setState(() => role = r))),
              ],
            ),
          ),
          const SizedBox(height: 12),
          if (filtered.isEmpty)
            const Center(child: Padding(padding: EdgeInsets.all(24), child: Text('No members found')))
          else
            ...filtered.map((u) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Row(
                        children: [
                          CircleAvatar(
                            radius: 22,
                            backgroundColor: const Color(0xFFDCECEE),
                            child: Text(
                              _initials(u.name),
                              style: const TextStyle(color: Color(0xFF0F766E), fontWeight: FontWeight.w700),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(u.name, style: const TextStyle(fontWeight: FontWeight.w700)),
                                const SizedBox(height: 2),
                                Text(u.role, style: const TextStyle(fontSize: 12, color: Color(0xFF62767B))),
                              ],
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF0F5F6),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              u.studentId,
                              style: const TextStyle(fontSize: 11, color: Color(0xFF5F7378)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                )),
        ],
      ),
      bottomNavigationBar: const AppBottomNav(current: 1),
    );
  }
}

class DeadlinesPage extends StatefulWidget {
  const DeadlinesPage({super.key});

  @override
  State<DeadlinesPage> createState() => _DeadlinesPageState();
}

class _DeadlinesPageState extends State<DeadlinesPage> {
  String search = '';
  String projectFilter = 'all';
  TaskStatus? statusFilter;

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    final upcoming = DataStore.tasks.where((t) {
      final matchPending = t.status != TaskStatus.done;
      final matchSearch = t.title.toLowerCase().contains(search.toLowerCase());
      final matchProject = projectFilter == 'all' || t.projectId == projectFilter;
      final matchStatus = statusFilter == null || t.status == statusFilter;
      return matchPending && matchSearch && matchProject && matchStatus;
    }).toList()
      ..sort((a, b) => a.dueDate.compareTo(b.dueDate));

    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        children: [
          const _PageHeader(title: 'Deadlines', subtitle: 'Upcoming tasks across projects', icon: Icons.event_note_rounded),
          const SizedBox(height: 12),
          TextField(
            decoration: const InputDecoration(
              hintText: 'Search deadlines...',
              prefixIcon: Icon(Icons.search),
            ),
            onChanged: (v) => setState(() => search = v),
          ),
          const SizedBox(height: 12),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _choiceChip('All Projects', projectFilter == 'all', () => setState(() => projectFilter = 'all')),
                ...DataStore.projects.map((p) => _choiceChip(
                      p.title.split(' ').take(2).join(' '),
                      projectFilter == p.projectId,
                      () => setState(() => projectFilter = p.projectId),
                    )),
              ],
            ),
          ),
          const SizedBox(height: 8),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                _choiceChip('All Status', statusFilter == null, () => setState(() => statusFilter = null)),
                _choiceChip('To Do', statusFilter == TaskStatus.todo, () => setState(() => statusFilter = TaskStatus.todo)),
                _choiceChip(
                  'In Progress',
                  statusFilter == TaskStatus.inProgress,
                  () => setState(() => statusFilter = TaskStatus.inProgress),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          if (upcoming.isEmpty)
            const Center(child: Padding(padding: EdgeInsets.all(24), child: Text('All caught up!')))
          else
            ...upcoming.map((task) {
              final project = DataStore.projectById(task.projectId);
              final assignee = DataStore.userById(task.assignedTo);
              final isOverdue = task.dueDate.isBefore(DateTime(now.year, now.month, now.day));
              return Card(
                child: InkWell(
                  borderRadius: BorderRadius.circular(14),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => TaskDetailPage(taskId: task.taskId)),
                    );
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 16,
                          backgroundColor: const Color(0xFFDBEBEE),
                          child: Text(
                            _initials(assignee?.name ?? 'U'),
                            style: const TextStyle(fontSize: 10, color: Color(0xFF0F766E), fontWeight: FontWeight.w700),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(task.title, style: const TextStyle(fontWeight: FontWeight.w700)),
                              const SizedBox(height: 2),
                              Text(
                                '${project?.title ?? '-'} • ${assignee?.name ?? '-'}',
                                style: const TextStyle(fontSize: 12, color: Color(0xFF62767B)),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                          decoration: BoxDecoration(
                            color: isOverdue ? const Color(0xFFFFE5E5) : const Color(0xFFE6F4EE),
                            borderRadius: BorderRadius.circular(999),
                          ),
                          child: Text(
                            DateFormat('MMM d').format(task.dueDate),
                            style: TextStyle(
                              color: isOverdue ? const Color(0xFFD43D3D) : const Color(0xFF1A7F5A),
                              fontWeight: FontWeight.w700,
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }),
        ],
      ),
      bottomNavigationBar: const AppBottomNav(current: 2),
    );
  }
}

class AppBottomNav extends StatelessWidget {
  final int current;

  const AppBottomNav({super.key, required this.current});

  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      selectedIndex: current,
      onDestinationSelected: (idx) {
        if (idx == current) return;
        if (idx == 0) {
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (_) => const HomePage()),
            (route) => false,
          );
        } else if (idx == 1) {
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (_) => const TeamRosterPage()),
            (route) => false,
          );
        } else {
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (_) => const DeadlinesPage()),
            (route) => false,
          );
        }
      },
      destinations: const [
        NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
        NavigationDestination(icon: Icon(Icons.group_outlined), selectedIcon: Icon(Icons.group), label: 'Team'),
        NavigationDestination(icon: Icon(Icons.event_note_outlined), selectedIcon: Icon(Icons.event_note), label: 'Deadlines'),
      ],
    );
  }
}

Widget _choiceChip(String label, bool selected, VoidCallback onTap) {
  return Padding(
    padding: const EdgeInsets.only(right: 8),
    child: ChoiceChip(
      label: Text(label, style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
      selected: selected,
      selectedColor: const Color(0xFFDBEBEE),
      backgroundColor: Colors.white,
      side: BorderSide(color: selected ? const Color(0xFF0F766E) : const Color(0xFFD4E0E2)),
      onSelected: (_) => onTap(),
    ),
  );
}

class _PageHeader extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;

  const _PageHeader({required this.title, required this.subtitle, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(18),
        gradient: const LinearGradient(
          colors: [Color(0xFF0F766E), Color(0xFF115E59)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(color: Colors.white, fontSize: 19, fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: const TextStyle(color: Color(0xFFD0ECE9), fontSize: 12.5, fontWeight: FontWeight.w500),
                  ),
                ],
              ),
            ),
            Container(
              height: 34,
              width: 34,
              decoration: BoxDecoration(
                color: const Color(0x40FFFFFF),
                borderRadius: BorderRadius.circular(999),
              ),
              child: Icon(icon, color: Colors.white, size: 18),
            ),
          ],
        ),
      ),
    );
  }
}

Widget _statusPill(TaskStatus status) {
  Color bg;
  Color fg;
  switch (status) {
    case TaskStatus.todo:
      bg = const Color(0xFFEAF0F2);
      fg = const Color(0xFF577078);
      break;
    case TaskStatus.inProgress:
      bg = const Color(0xFFE5F3FF);
      fg = const Color(0xFF266CA8);
      break;
    case TaskStatus.done:
      bg = const Color(0xFFE6F4EE);
      fg = const Color(0xFF1A7F5A);
      break;
  }
  return Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
    decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(999)),
    child: Text(status.label, style: TextStyle(color: fg, fontSize: 11.5, fontWeight: FontWeight.w700)),
  );
}

String _initials(String value) {
  final parts = value.trim().split(RegExp(r'\s+'));
  if (parts.length == 1) {
    return parts.first.characters.take(2).toString().toUpperCase();
  }
  return (parts.first.isNotEmpty ? parts.first[0] : '') +
      (parts.last.isNotEmpty ? parts.last[0] : '');
}
