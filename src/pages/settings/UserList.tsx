import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, User, Shield, Mail, MoreVertical, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "superuser" | "operational" | "sales" | "finance";
  status: "active" | "inactive";
  lastLogin: string;
  avatar?: string;
}

const users: UserData[] = [
  {
    id: "1",
    name: "Direktur",
    email: "direktur@lantech.co.id",
    role: "superuser",
    status: "active",
    lastLogin: "7 Jan 2025, 14:30",
  },
  {
    id: "2",
    name: "Budi Santoso",
    email: "budi.ops@lantech.co.id",
    role: "operational",
    status: "active",
    lastLogin: "7 Jan 2025, 10:15",
  },
  {
    id: "3",
    name: "Sari Wulandari",
    email: "sari.sales@lantech.co.id",
    role: "sales",
    status: "active",
    lastLogin: "6 Jan 2025, 16:45",
  },
  {
    id: "4",
    name: "Andi Pratama",
    email: "andi.finance@lantech.co.id",
    role: "finance",
    status: "inactive",
    lastLogin: "2 Jan 2025, 09:00",
  },
];

const roleConfig = {
  superuser: { label: "Superuser", class: "bg-chart-1/10 text-chart-1", icon: Shield },
  operational: { label: "Operational", class: "bg-chart-2/10 text-chart-2", icon: User },
  sales: { label: "Sales", class: "bg-chart-3/10 text-chart-3", icon: User },
  finance: { label: "Finance", class: "bg-chart-4/10 text-chart-4", icon: User },
};

const rolePermissions = {
  superuser: ["Akses penuh ke seluruh modul dan laporan"],
  operational: ["Input data shipment", "Kelola eBL", "View Job"],
  sales: ["Input data customer", "Buat penawaran", "View Quotation"],
  finance: ["Penggajian", "Invoicing", "Pajak", "Laporan keuangan"],
};

export default function UserList() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">User & Role</h1>
            <p className="text-muted-foreground mt-1">
              Kelola pengguna dan hak akses sistem
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total User</p>
            <p className="text-2xl font-bold text-foreground mt-1">4</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">User Aktif</p>
            <p className="text-2xl font-bold text-success mt-1">3</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">User Nonaktif</p>
            <p className="text-2xl font-bold text-muted-foreground mt-1">1</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total Role</p>
            <p className="text-2xl font-bold text-chart-1 mt-1">4</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card-elevated p-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari user..."
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div className="space-y-3">
              {users.map((user) => {
                const config = roleConfig[user.role];
                const RoleIcon = config.icon;
                return (
                  <div
                    key={user.id}
                    className="card-elevated p-4 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                            config.class
                          )}>
                            <RoleIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3.5 h-3.5" />
                          {user.email}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-1",
                          user.status === "active" ? "badge-success" : "bg-muted text-muted-foreground"
                        )}>
                          {user.status === "active" ? "Aktif" : "Nonaktif"}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Login: {user.lastLogin}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="card-elevated p-6">
              <h3 className="section-title">Deskripsi Role</h3>
              <div className="space-y-4">
                {Object.entries(roleConfig).map(([key, config]) => {
                  const RoleIcon = config.icon;
                  const permissions = rolePermissions[key as keyof typeof rolePermissions];
                  return (
                    <div key={key} className="pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={cn("p-1.5 rounded-lg", config.class)}>
                          <RoleIcon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground">{config.label}</span>
                      </div>
                      <ul className="space-y-1 ml-8">
                        {permissions.map((perm, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                            {perm}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
