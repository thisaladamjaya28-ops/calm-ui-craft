import { users } from "@/lib/mock-data";
import PageHeader from "@/components/PageHeader";

const TeamRoster = () => {
  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="Team Roster" subtitle="All project members" />

      <div className="px-4 space-y-2">
        {users.map((user, i) => (
          <div
            key={user.uid}
            className="card-border rounded-lg bg-card p-4 flex items-center gap-4 animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-primary">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground shrink-0">{user.studentId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRoster;
