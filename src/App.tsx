import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/i18n/LanguageContext";

const queryClient = new QueryClient();

/*
 * FIX #8: BrowserRouter is now the outermost wrapper (after QueryClientProvider
 * and TooltipProvider which have no router dependency).
 *
 * Previously: LanguageProvider > Toaster > Sonner > BrowserRouter
 * Now:        BrowserRouter > LanguageProvider > Toaster > Sonner > Routes
 *
 * Why it matters: any Provider or component that calls useNavigate() or
 * useLocation() must be rendered *inside* BrowserRouter. With the old order,
 * adding router-aware logic to LanguageProvider would cause a runtime crash
 * ("useNavigate() may be used only in the context of a <Router> component").
 * Moving BrowserRouter outward is a zero-risk, defensive fix.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
