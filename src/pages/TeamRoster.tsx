import { useState, useMemo } from "react";
import { users } from "@/lib/mock-data";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";

const roles = [...new Set(users.map((u) => u.role))];

const TeamRoster = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const roleOptions = [
    { value: "all", label: "All Roles" },
    ...roles.map((r) => ({ value: r, label: r })),
  ];

  const filtered = useMemo(() => {
    return users
      .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.studentId.includes(search))
      .filter((u) => roleFilter === "all" || u.role === roleFilter);
  }, [search, roleFilter]);

  return (
    <div className="min-h-screen pb-20">
      <PageHeader title="Team Roster" subtitle="All project members" gradient />

      <div className="px-4 space-y-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or ID..." />
        <FilterChips options={roleOptions} selected={roleFilter} onChange={setRoleFilter} />

        <div className="pt-1 space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">No members found</p>
          ) : (
            filtered.map((user, i) => (
              <div
                key={user.uid}
                className="card-interactive rounded-lg bg-card p-4 flex items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="h-11 w-11 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{user.role}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground/70 shrink-0 bg-muted px-2 py-1 rounded-md">{user.studentId}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamRoster;
