import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Search, CheckCircle, AlertCircle, Clock, Ship, FileText, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobToClose {
  id: string;
  jobNumber: string;
  customer: string;
  type: "export" | "import";
  completedDate: string;
  revenue: number;
  cost: number;
  profit: number;
  invoiceStatus: "complete" | "partial" | "pending";
  documentStatus: "complete" | "pending";
  vendorBillStatus: "complete" | "partial" | "pending";
}

const jobsToClose: JobToClose[] = [
  {
    id: "1",
    jobNumber: "JOB-2025-000115",
    customer: "PT Maju Bersama",
    type: "export",
    completedDate: "3 Jan 2025",
    revenue: 48500000,
    cost: 32000000,
    profit: 16500000,
    invoiceStatus: "complete",
    documentStatus: "complete",
    vendorBillStatus: "complete",
  },
  {
    id: "2",
    jobNumber: "JOB-2025-000112",
    customer: "CV Sukses Makmur",
    type: "import",
    completedDate: "2 Jan 2025",
    revenue: 35000000,
    cost: 24500000,
    profit: 10500000,
    invoiceStatus: "complete",
    documentStatus: "complete",
    vendorBillStatus: "partial",
  },
  {
    id: "3",
    jobNumber: "JOB-2025-000108",
    customer: "PT Logistik Nusantara",
    type: "export",
    completedDate: "30 Dec 2024",
    revenue: 62000000,
    cost: 45000000,
    profit: 17000000,
    invoiceStatus: "partial",
    documentStatus: "complete",
    vendorBillStatus: "pending",
  },
  {
    id: "4",
    jobNumber: "JOB-2025-000105",
    customer: "PT Indo Shipping",
    type: "import",
    completedDate: "28 Dec 2024",
    revenue: 28000000,
    cost: 19500000,
    profit: 8500000,
    invoiceStatus: "complete",
    documentStatus: "pending",
    vendorBillStatus: "complete",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="w-4 h-4 text-success" />;
    case "partial":
      return <Clock className="w-4 h-4 text-warning" />;
    default:
      return <AlertCircle className="w-4 h-4 text-destructive" />;
  }
};

const canClose = (job: JobToClose) => {
  return job.invoiceStatus === "complete" && 
         job.documentStatus === "complete" && 
         job.vendorBillStatus === "complete";
};

export default function ClosingJob() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Closing Job</h1>
            <p className="text-muted-foreground mt-1">
              Tutup job yang sudah selesai dan rekonsiliasi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Siap Closing</p>
            <p className="text-2xl font-bold text-success mt-1">8</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Menunggu Invoice</p>
            <p className="text-2xl font-bold text-warning mt-1">5</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Menunggu Dokumen</p>
            <p className="text-2xl font-bold text-chart-1 mt-1">3</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Menunggu Vendor Bill</p>
            <p className="text-2xl font-bold text-chart-2 mt-1">4</p>
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari job number, customer..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-44">
                <option value="">Semua Status</option>
                <option value="ready">Siap Closing</option>
                <option value="pending">Belum Lengkap</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {jobsToClose.map((job) => {
            const readyToClose = canClose(job);
            return (
              <div
                key={job.id}
                className={cn(
                  "card-elevated p-5 transition-all duration-200",
                  readyToClose ? "hover:shadow-lg border-success/30" : "opacity-90"
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={cn(
                      "p-3 rounded-xl",
                      job.type === "export" ? "bg-chart-1/10" : "bg-chart-2/10"
                    )}>
                      <Ship className={cn(
                        "w-6 h-6",
                        job.type === "export" ? "text-chart-1" : "text-chart-2"
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{job.jobNumber}</h3>
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded uppercase",
                          job.type === "export" ? "bg-chart-1/10 text-chart-1" : "bg-chart-2/10 text-chart-2"
                        )}>
                          {job.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.customer}</p>
                      <p className="text-xs text-muted-foreground mt-1">Selesai: {job.completedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 lg:w-auto">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2" title="Invoice Status">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                        {getStatusIcon(job.invoiceStatus)}
                      </div>
                      <div className="flex items-center gap-2" title="Document Status">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {getStatusIcon(job.documentStatus)}
                      </div>
                      <div className="flex items-center gap-2" title="Vendor Bill Status">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                        {getStatusIcon(job.vendorBillStatus)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 lg:w-72 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="text-sm font-medium text-foreground">{formatCurrency(job.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost</p>
                      <p className="text-sm font-medium text-destructive">{formatCurrency(job.cost)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profit</p>
                      <p className="text-sm font-bold text-success">{formatCurrency(job.profit)}</p>
                    </div>
                  </div>

                  <button
                    disabled={!readyToClose}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                      readyToClose 
                        ? "btn-accent" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    {readyToClose ? "Close Job" : "Belum Lengkap"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
