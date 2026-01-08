import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, Building, Mail, Phone, MoreVertical } from "lucide-react";

const vendors = [
  {
    id: "1",
    name: "PT Pelayaran Nusantara",
    code: "VND-001",
    email: "billing@pelnus.co.id",
    phone: "+62 21 5552345",
    category: "Shipping Line",
    status: "active",
    balance: -15000000,
  },
  {
    id: "2",
    name: "CV Trucking Mandiri",
    code: "VND-002",
    email: "ops@truckingmandiri.com",
    phone: "+62 21 6663456",
    category: "Trucking",
    status: "active",
    balance: -8500000,
  },
  {
    id: "3",
    name: "PT Terminal Container Indonesia",
    code: "VND-003",
    email: "finance@tci.co.id",
    phone: "+62 21 7774567",
    category: "Terminal",
    status: "active",
    balance: 0,
  },
  {
    id: "4",
    name: "PT Bea Cukai Express",
    code: "VND-004",
    email: "service@beaexpress.id",
    phone: "+62 21 8885678",
    category: "Customs Broker",
    status: "inactive",
    balance: -2300000,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.abs(value));
};

export default function VendorList() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Vendor</h1>
            <p className="text-muted-foreground mt-1">
              Kelola data vendor dan supplier
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Vendor
          </button>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari vendor..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-44">
                <option value="">Semua Kategori</option>
                <option value="shipping">Shipping Line</option>
                <option value="trucking">Trucking</option>
                <option value="terminal">Terminal</option>
                <option value="customs">Customs Broker</option>
              </select>
              <select className="input-field w-36">
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vendor table */}
        <div className="card-elevated overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Kategori</th>
                <th>Kontak</th>
                <th>Status</th>
                <th className="text-right">Outstanding</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-muted/30 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Building className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">{vendor.code}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm bg-muted px-2.5 py-1 rounded-full">
                      {vendor.category}
                    </span>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3.5 h-3.5" />
                        {vendor.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5" />
                        {vendor.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={
                        vendor.status === "active" ? "badge-success" : "bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full text-xs font-medium"
                      }
                    >
                      {vendor.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="text-right">
                    {vendor.balance !== 0 ? (
                      <span className="text-destructive font-medium">
                        {formatCurrency(vendor.balance)}
                      </span>
                    ) : (
                      <span className="text-success font-medium">Lunas</span>
                    )}
                  </td>
                  <td>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
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
