import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Placement dashboard imports
import { PlacementLayout } from "./components/layout/PlacementLayout";
import DashboardPlacement from "./pages/Placement/Dashboard";
import Students from "./pages/Placement/Students";
import Recruiters from "./pages/Placement/Recruiters";
import Jobs from "./pages/Placement/Jobs";
import Analytics from "./pages/Placement/Analytics";
<<<<<<< Updated upstream
import Communication from "./pages/Placement/Communication";
import Settings from "./pages/Placement/Settings";
import Student from "./pages/Student/Student";
=======
import CommunicationPlacement from "./pages/Placement/Communication";
import SettingsPlacement from "./pages/Placement/Settings";

// Recruitment dashboard imports
import { RecruitmentLayout } from "./components/layout/RecruitmentLayout";
import DashboardRec from "./pages/Recruitment/DashboardRec";
import JobPosting from "./pages/Recruitment/JobPosting";
import MatchCalculator from "./pages/Recruitment/MatchCalculator";
import CandidateMatching from "./pages/Recruitment/CandidateMatching";
import EligibilityCriteria from "./pages/Recruitment/EligibilityCriteria";
import CommunicationRec from "./pages/Recruitment/Communication";
import Reports from "./pages/Recruitment/Reports";
import SettingsRec from "./pages/Recruitment/settingsRec";
>>>>>>> Stashed changes

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 🏠 Landing Page */}
          <Route path="/" element={<Index />} />

          {/* 🎓 Placement Dashboard Routes */}
          <Route path="/placement/*" element={<PlacementLayout />}>
            <Route index element={<DashboardPlacement />} />
            <Route path="students" element={<Students />} />
            <Route path="recruiters" element={<Recruiters />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="communication" element={<CommunicationPlacement />} />
            <Route path="settings" element={<SettingsPlacement />} />
          </Route>

          {/* 💼 Recruitment Dashboard Routes */}
          <Route path="/recruitment/*" element={<RecruitmentLayout />}>
            <Route index element={<DashboardRec />} />
            <Route path="jobs" element={<JobPosting />} />
            <Route path="eligibility" element={<EligibilityCriteria />} />
            <Route path="calculator" element={<MatchCalculator />} />
            <Route path="matching" element={<CandidateMatching />} />
            <Route path="communication" element={<CommunicationRec />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<SettingsRec />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ❌ Catch-All 404 */}
          <Route path="*" element={<NotFound />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
