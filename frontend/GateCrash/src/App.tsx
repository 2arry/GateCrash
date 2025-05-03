import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyTickets from "./pages/MyTickets";
import TicketDetail from "./pages/TicketDetail";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EventTickets from "./pages/EventTickets";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event/new" element={<CreateEvent />} />
          <Route path="/event/:eventId/tickets" element={<EventTickets />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/my-tickets/:ticketId" element={<TicketDetail />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
