import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Plus,
  Search,
  Ship,
  Plane,
  Package,
  Filter,
  MoreVertical,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  jobNumber: string;
  customer: string;
  shipmentType: "export" | "import";
  mode: "sea" | "air";
  containerType: string;
  origin: string;
  destination: string;
  etd: string;
  eta: string;
  vessel: string;
  status: "draft" | "active" | "in_transit" | "arrived" | "completed";
  invoiceStatus: "pending" | "partial" | "complete";
}

const jobs: Job[] = [
  {
    id: "1",
    jobNumber: "JOB-2025-000123",
    customer: "PT Maju Bersama",
    shipmentType: "export",
    mode: "sea",
    containerType: "40FT HC",
    origin: "Jakarta, Indonesia",
    destination: "Singapore",
    etd: "10 Jan 2025",
    eta: "12 Jan 2025",
    vessel: "MV SINAR JAYA",
    status: "active",
    invoiceStatus: "pending",
  },
  {
    id: "2",
    jobNumber: "JOB-2025-000122",
    customer: "CV Sukses Makmur",
    shipmentType: "import",
    mode: "sea",
    containerType: "20FT",
    origin: "Shanghai, China",
    destination: "Surabaya, Indonesia",
    etd: "5 Jan 2025",
    eta: "15 Jan 2025",
    vessel: "EVER GOLDEN",
    status: "in_transit",
    invoiceStatus: "partial",
  },
  {
    id: "3",
    jobNumber: "JOB-2025-000121",
    customer: "PT Logistik Nusantara",
    shipmentType: "export",
    mode: "air",
    containerType: "LCL",
    origin: "Semarang, Indonesia",
    destination: "Tokyo, Japan",
    etd: "8 Jan 2025",
    eta: "9 Jan 2025",
    vessel: "GA 875",
    status: "arrived",
    invoiceStatus: "complete",
  },
  {
    id: "4",
    jobNumber: "JOB-2025-000120",
    customer: "PT Indo Shipping",
    shipmentType: "import",
    mode: "sea",
    containerType: "40FT",
    origin: "Busan, South Korea",
    destination: "Jakarta, Indonesia",
    etd: "3 Jan 2025",
    eta: "13 Jan 2025",
    vessel: "HYUNDAI SPEED",
    status: "active",
    invoiceStatus: "pending",
  },
];

const statusConfig = {
  draft: { label: "Draft", class: "bg-muted text-muted-foreground" },
  active: { label: "Aktif", class: "badge-success" },
  in_transit: { label: "In Transit", class: "bg-chart-1/10 text-chart-1" },
  arrived: { label: "Arrived", class: "bg-chart-2/10 text-chart-2" },
  completed: { label: "Selesai", class: "bg-muted text-muted-foreground" },
};

const invoiceStatusConfig = {
  pending: { label: "Belum Invoice", class: "badge-warning" },
  partial: { label: "Partial", class: "bg-chart-3/10 text-chart-3" },
  complete: { label: "Complete", class: "badge-success" },
};

export default function JobList() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Job / Shipment</h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua job pengiriman ekspor dan impor
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Open Job Baru
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total Job Aktif</p>
            <p className="text-2xl font-bold text-foreground mt-1">24</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">In Transit</p>
            <p className="text-2xl font-bold text-chart-1 mt-1">8</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Pending Invoice</p>
            <p className="text-2xl font-bold text-warning mt-1">12</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Selesai Bulan Ini</p>
            <p className="text-2xl font-bold text-success mt-1">45</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari job number, customer..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="input-field w-32">
                <option value="">Semua Tipe</option>
                <option value="export">Export</option>
                <option value="import">Import</option>
              </select>
              <select className="input-field w-32">
                <option value="">Semua Mode</option>
                <option value="sea">Laut</option>
                <option value="air">Udara</option>
              </select>
              <select className="input-field w-36">
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="in_transit">In Transit</option>
                <option value="arrived">Arrived</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job list */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="card-elevated p-5 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Job info */}
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={cn(
                      "p-3 rounded-xl",
                      job.mode === "sea" ? "bg-chart-1/10" : "bg-chart-2/10"
                    )}
                  >
                    {job.mode === "sea" ? (
                      <Ship
                        className={cn(
                          "w-6 h-6",
                          job.mode === "sea" ? "text-chart-1" : "text-chart-2"
                        )}
                      />
                    ) : (
                      <Plane className="w-6 h-6 text-chart-2" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {job.jobNumber}
                      </h3>
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded uppercase",
                          job.shipmentType === "export"
                            ? "bg-chart-1/10 text-chart-1"
                            : "bg-chart-2/10 text-chart-2"
                        )}
                      >
                        {job.shipmentType}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {job.customer}
                    </p>
                  </div>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 lg:w-72">
                  <div className="text-right flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {job.origin.split(",")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ETD: {job.etd}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {job.destination.split(",")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ETA: {job.eta}
                    </p>
                  </div>
                </div>

                {/* Container & Vessel */}
                <div className="lg:w-40">
                  <p className="text-sm font-medium text-foreground">
                    {job.vessel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {job.containerType}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 lg:w-44">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusConfig[job.status].class
                    )}
                  >
                    {statusConfig[job.status].label}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      invoiceStatusConfig[job.invoiceStatus].class
                    )}
                  >
                    {invoiceStatusConfig[job.invoiceStatus].label}
                  </span>
                </div>

                {/* Actions */}
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
