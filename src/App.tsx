
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import ComponentLibrary from "./pages/ComponentLibrary";
import AIOptimization from "./pages/AIOptimization";
import ModuleStore from "./pages/ModuleStore";
import Documentation from "./pages/Documentation";
import CommunityHub from "./pages/CommunityHub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DeveloperDashboard />} />
          <Route path="/components" element={<ComponentLibrary />} />
          <Route path="/ai-optimization" element={<AIOptimization />} />
          <Route path="/module-store" element={<ModuleStore />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/community" element={<CommunityHub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
