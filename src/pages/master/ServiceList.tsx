import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, Package, MoreVertical, Edit, Trash2 } from "lucide-react";

const services = [
  {
    id: "1",
    name: "Ocean Freight - FCL",
    code: "SVC-OF-FCL",
    description: "Full Container Load shipment via sea",
    category: "Ocean Freight",
    unit: "Container",
    ppnRate: 1.1,
    isActive: true,
  },
  {
    id: "2",
    name: "Ocean Freight - LCL",
    code: "SVC-OF-LCL",
    description: "Less Container Load shipment via sea",
    category: "Ocean Freight",
    unit: "CBM",
    ppnRate: 1.1,
    isActive: true,
  },
  {
    id: "3",
    name: "Documentation Fee",
    code: "SVC-DOC",
    description: "Document preparation and processing",
    category: "Documentation",
    unit: "Set",
    ppnRate: 11,
    isActive: true,
  },
  {
    id: "4",
    name: "Trucking - Container",
    code: "SVC-TRK-CNT",
    description: "Container trucking service",
    category: "Trucking",
    unit: "Trip",
    ppnRate: 11,
    isActive: true,
  },
  {
    id: "5",
    name: "Customs Clearance",
    code: "SVC-CC",
    description: "Import/Export customs clearance",
    category: "Customs",
    unit: "Shipment",
    ppnRate: 11,
    isActive: true,
  },
  {
    id: "6",
    name: "THC - Origin",
    code: "SVC-THC-O",
    description: "Terminal Handling Charges at origin",
    category: "Terminal",
    unit: "Container",
    ppnRate: 1.1,
    isActive: false,
  },
];

const categoryColors: Record<string, string> = {
  "Ocean Freight": "bg-chart-1/10 text-chart-1",
  "Documentation": "bg-chart-2/10 text-chart-2",
  "Trucking": "bg-chart-3/10 text-chart-3",
  "Customs": "bg-chart-4/10 text-chart-4",
  "Terminal": "bg-accent/10 text-accent",
};

export default function ServiceList() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Jasa</h1>
            <p className="text-muted-foreground mt-1">
              Kelola layanan dan jasa yang ditawarkan
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Jasa
          </button>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari jasa..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-44">
                <option value="">Semua Kategori</option>
                <option value="ocean">Ocean Freight</option>
                <option value="documentation">Documentation</option>
                <option value="trucking">Trucking</option>
                <option value="customs">Customs</option>
                <option value="terminal">Terminal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`card-elevated p-5 transition-all duration-200 ${
                service.isActive ? "hover:shadow-lg" : "opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      categoryColors[service.category] || "bg-muted text-muted-foreground"
                    }`}
                  >
                    {service.category}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{service.code}</p>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Unit</p>
                    <p className="text-sm font-medium">{service.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">PPN</p>
                    <p className="text-sm font-medium">{service.ppnRate}%</p>
                  </div>
                </div>
                <span
                  className={
                    service.isActive
                      ? "badge-success"
                      : "bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs font-medium"
                  }
                >
                  {service.isActive ? "Aktif" : "Nonaktif"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
