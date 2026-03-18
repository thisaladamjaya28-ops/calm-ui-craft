import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  gradient?: boolean;
  actions?: ReactNode;
}

const PageHeader = ({ title, subtitle, showBack, gradient, actions }: PageHeaderProps) => {
  const navigate = useNavigate();

  if (gradient) {
    return (
      <header className="gradient-header px-4 pt-8 pb-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <button onClick={() => navigate(-1)} className="text-primary-foreground/80 hover:text-primary-foreground -ml-1 p-1 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold tracking-tight text-primary-foreground">{title}</h1>
              {subtitle && <p className="text-sm text-primary-foreground/70 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {actions}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 pt-6 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => navigate(-1)} className="text-foreground -ml-1 p-1">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {actions}
      </div>
    </header>
  );
};

export default PageHeader;
