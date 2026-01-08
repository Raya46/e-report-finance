import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Plus,
  Search,
  Receipt,
  MoreVertical,
  FileText,
  Download,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  invoiceNumber: string;
  jobNumber: string;
  customer: string;
  date: string;
  dueDate: string;
  subtotal: number;
  ppn: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "partial";
  type: "customer" | "vendor";
}

const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-000456",
    jobNumber: "JOB-2025-000123",
    customer: "PT Maju Bersama",
    date: "5 Jan 2025",
    dueDate: "20 Jan 2025",
    subtotal: 45000000,
    ppn: 495000,
    total: 45495000,
    status: "sent",
    type: "customer",
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-000455",
    jobNumber: "JOB-2025-000122",
    customer: "CV Sukses Makmur",
    date: "4 Jan 2025",
    dueDate: "19 Jan 2025",
    subtotal: 32000000,
    ppn: 3520000,
    total: 35520000,
    status: "paid",
    type: "customer",
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-000454",
    jobNumber: "JOB-2025-000121",
    customer: "PT Logistik Nusantara",
    date: "3 Jan 2025",
    dueDate: "10 Jan 2025",
    subtotal: 28500000,
    ppn: 313500,
    total: 28813500,
    status: "overdue",
    type: "customer",
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-000453",
    jobNumber: "JOB-2025-000120",
    customer: "PT Indo Shipping",
    date: "2 Jan 2025",
    dueDate: "17 Jan 2025",
    subtotal: 52000000,
    ppn: 572000,
    total: 52572000,
    status: "partial",
    type: "customer",
  },
];

const statusConfig = {
  draft: { label: "Draft", class: "bg-muted text-muted-foreground" },
  sent: { label: "Terkirim", class: "bg-chart-1/10 text-chart-1" },
  paid: { label: "Lunas", class: "badge-success" },
  overdue: { label: "Jatuh Tempo", class: "badge-destructive" },
  partial: { label: "Partial", class: "badge-warning" },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function InvoiceList() {
  const totalPending = invoices
    .filter((inv) => inv.status !== "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const totalOverdue = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Invoice</h1>
            <p className="text-muted-foreground mt-1">
              Kelola tagihan ke customer
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Buat Invoice
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total Outstanding</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {formatCurrency(totalPending)}
            </p>
          </div>
          <div className="stat-card border-destructive/20">
            <p className="text-sm text-muted-foreground">Jatuh Tempo</p>
            <p className="text-2xl font-bold text-destructive mt-1">
              {formatCurrency(totalOverdue)}
            </p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Lunas Bulan Ini</p>
            <p className="text-2xl font-bold text-success mt-1">
              {formatCurrency(35520000)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari invoice, customer..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-40">
                <option value="">Semua Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Terkirim</option>
                <option value="paid">Lunas</option>
                <option value="overdue">Jatuh Tempo</option>
              </select>
              <input type="month" className="input-field w-40" />
            </div>
          </div>
        </div>

        {/* Invoice table */}
        <div className="card-elevated overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Tanggal</th>
                <th>Jatuh Tempo</th>
                <th className="text-right">Total</th>
                <th>Status</th>
                <th className="w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Receipt className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {invoice.invoiceNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {invoice.jobNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm text-foreground">{invoice.customer}</p>
                  </td>
                  <td>
                    <p className="text-sm text-muted-foreground">
                      {invoice.date}
                    </p>
                  </td>
                  <td>
                    <p
                      className={cn(
                        "text-sm",
                        invoice.status === "overdue"
                          ? "text-destructive font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {invoice.dueDate}
                    </p>
                  </td>
                  <td className="text-right">
                    <p className="font-medium text-foreground">
                      {formatCurrency(invoice.total)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PPN: {formatCurrency(invoice.ppn)}
                    </p>
                  </td>
                  <td>
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        statusConfig[invoice.status].class
                      )}
                    >
                      {statusConfig[invoice.status].label}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors">
                        <Send className="w-4 h-4 text-accent" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
