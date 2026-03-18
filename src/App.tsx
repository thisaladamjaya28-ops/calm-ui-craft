import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import ProjectBoard from "./pages/ProjectBoard";
import TaskDetail from "./pages/TaskDetail";
import TeamRoster from "./pages/TeamRoster";
import Deadlines from "./pages/Deadlines";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="mx-auto max-w-lg">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:projectId" element={<ProjectBoard />} />
            <Route path="/project/:projectId/task/:taskId" element={<TaskDetail />} />
            <Route path="/team" element={<TeamRoster />} />
            <Route path="/deadlines" element={<Deadlines />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
