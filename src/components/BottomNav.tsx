import { useLocation, useNavigate } from "react-router-dom";
import { FolderOpen, CalendarClock, Users } from "lucide-react";

const navItems = [
  { path: "/", label: "Projects", icon: FolderOpen },
  { path: "/deadlines", label: "Deadlines", icon: CalendarClock },
  { path: "/team", label: "Team", icon: Users },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card card-border border-t">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 text-xs font-medium transition-colors duration-200 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
