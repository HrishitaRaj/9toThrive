import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { PlacementLayout } from "./components/layout/PlacementLayout";
import Dashboard from "./pages/Placement/Dashboard";
import Students from "./pages/Placement/Students";
import Recruiters from "./pages/Placement/Recruiters";
import Jobs from "./pages/Placement/Jobs";
import Analytics from "./pages/Placement/Analytics";
import Communication from "./pages/Placement/Communication";
import Settings from "./pages/Placement/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/placement" element={<PlacementLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="communication" element={<Communication />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
