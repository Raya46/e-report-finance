import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, FileCheck, Download, Printer, Eye, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface EBL {
  id: string;
  blNumber: string;
  jobNumber: string;
  shipper: string;
  consignee: string;
  vessel: string;
  pol: string;
  pod: string;
  issueDate: string;
  status: "draft" | "issued" | "released" | "surrendered";
}

const ebls: EBL[] = [
  {
    id: "1",
    blNumber: "LNTCH2501230001",
    jobNumber: "JOB-2025-000123",
    shipper: "PT Maju Bersama",
    consignee: "ABC Trading Pte Ltd",
    vessel: "MV SINAR JAYA",
    pol: "Jakarta, Indonesia",
    pod: "Singapore",
    issueDate: "7 Jan 2025",
    status: "issued",
  },
  {
    id: "2",
    blNumber: "LNTCH2501220001",
    jobNumber: "JOB-2025-000122",
    shipper: "Shanghai Export Co.",
    consignee: "CV Sukses Makmur",
    vessel: "EVER GOLDEN",
    pol: "Shanghai, China",
    pod: "Surabaya, Indonesia",
    issueDate: "6 Jan 2025",
    status: "released",
  },
  {
    id: "3",
    blNumber: "LNTCH2501210001",
    jobNumber: "JOB-2025-000121",
    shipper: "PT Logistik Nusantara",
    consignee: "Tokyo Import Inc.",
    vessel: "GA 875",
    pol: "Semarang, Indonesia",
    pod: "Tokyo, Japan",
    issueDate: "5 Jan 2025",
    status: "surrendered",
  },
  {
    id: "4",
    blNumber: "LNTCH2501200001",
    jobNumber: "JOB-2025-000120",
    shipper: "Korea Export Ltd",
    consignee: "PT Indo Shipping",
    vessel: "HYUNDAI SPEED",
    pol: "Busan, South Korea",
    pod: "Jakarta, Indonesia",
    issueDate: "",
    status: "draft",
  },
];

const statusConfig = {
  draft: { label: "Draft", class: "bg-muted text-muted-foreground" },
  issued: { label: "Issued", class: "bg-chart-1/10 text-chart-1" },
  released: { label: "Released", class: "badge-success" },
  surrendered: { label: "Surrendered", class: "bg-chart-2/10 text-chart-2" },
};

export default function EBLList() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Electronic Bill of Lading</h1>
            <p className="text-muted-foreground mt-1">
              Kelola dan cetak eBL untuk shipment
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Buat eBL
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total eBL</p>
            <p className="text-2xl font-bold text-foreground mt-1">156</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Draft</p>
            <p className="text-2xl font-bold text-muted-foreground mt-1">8</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Issued</p>
            <p className="text-2xl font-bold text-chart-1 mt-1">24</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Released</p>
            <p className="text-2xl font-bold text-success mt-1">124</p>
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari BL number, job, shipper..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-40">
                <option value="">Semua Status</option>
                <option value="draft">Draft</option>
                <option value="issued">Issued</option>
                <option value="released">Released</option>
                <option value="surrendered">Surrendered</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-elevated overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>BL Number</th>
                <th>Shipper / Consignee</th>
                <th>Vessel</th>
                <th>Route</th>
                <th>Issue Date</th>
                <th>Status</th>
                <th className="w-32">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ebls.map((ebl) => (
                <tr key={ebl.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{ebl.blNumber}</p>
                        <p className="text-xs text-muted-foreground">{ebl.jobNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm text-foreground">{ebl.shipper}</p>
                      <p className="text-xs text-muted-foreground">→ {ebl.consignee}</p>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm text-foreground">{ebl.vessel}</p>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm text-foreground">{ebl.pol.split(",")[0]}</p>
                      <p className="text-xs text-muted-foreground">→ {ebl.pod.split(",")[0]}</p>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm text-muted-foreground">
                      {ebl.issueDate || "-"}
                    </p>
                  </td>
                  <td>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusConfig[ebl.status].class
                    )}>
                      {statusConfig[ebl.status].label}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <Printer className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors">
                        <Download className="w-4 h-4 text-accent" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
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
