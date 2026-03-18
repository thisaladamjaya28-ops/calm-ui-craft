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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md card-border border-t">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1.5">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-6 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                active
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground"
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
