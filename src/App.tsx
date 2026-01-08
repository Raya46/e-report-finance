import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/master/CustomerList";
import VendorList from "./pages/master/VendorList";
import ServiceList from "./pages/master/ServiceList";
import QuotationList from "./pages/sales/QuotationList";
import JobList from "./pages/operational/JobList";
import EBLList from "./pages/operational/EBLList";
import ClosingJob from "./pages/operational/ClosingJob";
import InvoiceList from "./pages/finance/InvoiceList";
import PaymentList from "./pages/finance/PaymentList";
import ExpenseList from "./pages/finance/ExpenseList";
import ProfitLoss from "./pages/reports/ProfitLoss";
import Cashflow from "./pages/reports/Cashflow";
import UserList from "./pages/settings/UserList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Master Data */}
          <Route path="/master/customer" element={<CustomerList />} />
          <Route path="/master/vendor" element={<VendorList />} />
          <Route path="/master/services" element={<ServiceList />} />
          {/* Sales */}
          <Route path="/sales/quotation" element={<QuotationList />} />
          {/* Operational */}
          <Route path="/operational/jobs" element={<JobList />} />
          <Route path="/operational/ebl" element={<EBLList />} />
          <Route path="/operational/closing" element={<ClosingJob />} />
          {/* Finance */}
          <Route path="/finance/invoice" element={<InvoiceList />} />
          <Route path="/finance/payment" element={<PaymentList />} />
          <Route path="/finance/expenses" element={<ExpenseList />} />
          {/* Reports */}
          <Route path="/reports/profit-loss" element={<ProfitLoss />} />
          <Route path="/reports/cashflow" element={<Cashflow />} />
          {/* Settings */}
          <Route path="/settings/users" element={<UserList />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
