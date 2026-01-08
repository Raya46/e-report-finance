import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, Filter, MoreVertical, Building2, Mail, Phone } from "lucide-react";

const customers = [
  {
    id: "1",
    name: "PT Maju Bersama",
    code: "CUST-001",
    email: "finance@majubersama.co.id",
    phone: "+62 21 5551234",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    type: "Shipper",
    status: "active",
    totalJobs: 45,
  },
  {
    id: "2",
    name: "CV Sukses Makmur",
    code: "CUST-002",
    email: "admin@suksesmakmur.com",
    phone: "+62 31 7771234",
    address: "Jl. Pemuda No. 45, Surabaya",
    type: "Consignee",
    status: "active",
    totalJobs: 32,
  },
  {
    id: "3",
    name: "PT Logistik Nusantara",
    code: "CUST-003",
    email: "ops@logistiknusantara.id",
    phone: "+62 24 8881234",
    address: "Jl. MT Haryono No. 78, Semarang",
    type: "Shipper",
    status: "active",
    totalJobs: 28,
  },
  {
    id: "4",
    name: "PT Indo Shipping",
    code: "CUST-004",
    email: "contact@indoshipping.co.id",
    phone: "+62 21 6661234",
    address: "Jl. Tanjung Priok No. 90, Jakarta Utara",
    type: "Both",
    status: "inactive",
    totalJobs: 15,
  },
];

export default function CustomerList() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Customer</h1>
            <p className="text-muted-foreground mt-1">
              Kelola data customer dan shipper/consignee
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Customer
          </button>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari customer..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-40">
                <option value="">Semua Tipe</option>
                <option value="shipper">Shipper</option>
                <option value="consignee">Consignee</option>
                <option value="both">Keduanya</option>
              </select>
              <select className="input-field w-36">
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="card-elevated p-5 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground">{customer.code}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{customer.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === "active"
                        ? "badge-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {customer.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {customer.type}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{customer.totalJobs}</p>
                  <p className="text-xs text-muted-foreground">Total Job</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
