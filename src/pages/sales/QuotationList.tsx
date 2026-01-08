import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, FileText, MoreVertical, Send, Copy, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Quotation {
  id: string;
  quotationNumber: string;
  customer: string;
  date: string;
  validUntil: string;
  totalAmount: number;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  services: string[];
}

const quotations: Quotation[] = [
  {
    id: "1",
    quotationNumber: "QUO-2025-000089",
    customer: "PT Maju Bersama",
    date: "6 Jan 2025",
    validUntil: "20 Jan 2025",
    totalAmount: 48500000,
    status: "sent",
    services: ["Ocean Freight - FCL", "Documentation"],
  },
  {
    id: "2",
    quotationNumber: "QUO-2025-000088",
    customer: "CV Sukses Makmur",
    date: "5 Jan 2025",
    validUntil: "19 Jan 2025",
    totalAmount: 35000000,
    status: "accepted",
    services: ["Ocean Freight - LCL", "Trucking"],
  },
  {
    id: "3",
    quotationNumber: "QUO-2025-000087",
    customer: "PT Logistik Nusantara",
    date: "4 Jan 2025",
    validUntil: "18 Jan 2025",
    totalAmount: 62000000,
    status: "draft",
    services: ["Ocean Freight - FCL", "Customs Clearance", "Trucking"],
  },
  {
    id: "4",
    quotationNumber: "QUO-2025-000086",
    customer: "PT Indo Shipping",
    date: "3 Jan 2025",
    validUntil: "10 Jan 2025",
    totalAmount: 28000000,
    status: "rejected",
    services: ["Documentation", "THC"],
  },
];

const statusConfig = {
  draft: { label: "Draft", class: "bg-muted text-muted-foreground", icon: FileText },
  sent: { label: "Terkirim", class: "bg-chart-1/10 text-chart-1", icon: Send },
  accepted: { label: "Diterima", class: "badge-success", icon: Check },
  rejected: { label: "Ditolak", class: "badge-destructive", icon: X },
  expired: { label: "Expired", class: "bg-muted text-muted-foreground", icon: X },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function QuotationList() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Penawaran</h1>
            <p className="text-muted-foreground mt-1">
              Kelola penawaran harga untuk customer
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Buat Penawaran
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total Penawaran</p>
            <p className="text-2xl font-bold text-foreground mt-1">45</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Menunggu Respon</p>
            <p className="text-2xl font-bold text-chart-1 mt-1">12</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Diterima</p>
            <p className="text-2xl font-bold text-success mt-1">28</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Nilai Pending</p>
            <p className="text-2xl font-bold text-warning mt-1">Rp 485jt</p>
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari penawaran, customer..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-40">
                <option value="">Semua Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Terkirim</option>
                <option value="accepted">Diterima</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-elevated overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Penawaran</th>
                <th>Customer</th>
                <th>Layanan</th>
                <th>Berlaku Sampai</th>
                <th className="text-right">Total</th>
                <th>Status</th>
                <th className="w-24">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((quotation) => {
                const StatusIcon = statusConfig[quotation.status].icon;
                return (
                  <tr key={quotation.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <FileText className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{quotation.quotationNumber}</p>
                          <p className="text-xs text-muted-foreground">{quotation.date}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm text-foreground">{quotation.customer}</p>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {quotation.services.slice(0, 2).map((service, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {service}
                          </span>
                        ))}
                        {quotation.services.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{quotation.services.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <p className="text-sm text-muted-foreground">{quotation.validUntil}</p>
                    </td>
                    <td className="text-right">
                      <p className="font-medium text-foreground">{formatCurrency(quotation.totalAmount)}</p>
                    </td>
                    <td>
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                        statusConfig[quotation.status].class
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[quotation.status].label}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors">
                          <Send className="w-4 h-4 text-accent" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
