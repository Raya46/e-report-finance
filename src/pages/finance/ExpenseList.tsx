import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, Wallet, Building2, Car, Coffee, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Expense {
  id: string;
  expenseNumber: string;
  category: "salary" | "operational" | "transport" | "utilities" | "other";
  description: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: "paid" | "pending";
}

const expenses: Expense[] = [
  {
    id: "1",
    expenseNumber: "EXP-2025-000045",
    category: "salary",
    description: "Gaji Karyawan - Januari 2025",
    date: "5 Jan 2025",
    amount: 45000000,
    paymentMethod: "Transfer Bank",
    status: "paid",
  },
  {
    id: "2",
    expenseNumber: "EXP-2025-000044",
    category: "operational",
    description: "Sewa Kantor - Januari 2025",
    date: "3 Jan 2025",
    amount: 15000000,
    paymentMethod: "Transfer Bank",
    status: "paid",
  },
  {
    id: "3",
    expenseNumber: "EXP-2025-000043",
    category: "utilities",
    description: "Listrik & Air - Desember 2024",
    date: "2 Jan 2025",
    amount: 3500000,
    paymentMethod: "Transfer Bank",
    status: "paid",
  },
  {
    id: "4",
    expenseNumber: "EXP-2025-000042",
    category: "transport",
    description: "BBM & Tol Operasional",
    date: "31 Dec 2024",
    amount: 2800000,
    paymentMethod: "Petty Cash",
    status: "paid",
  },
  {
    id: "5",
    expenseNumber: "EXP-2025-000041",
    category: "other",
    description: "ATK & Supplies Kantor",
    date: "30 Dec 2024",
    amount: 1200000,
    paymentMethod: "Petty Cash",
    status: "pending",
  },
];

const categoryConfig = {
  salary: { label: "Gaji", icon: Wallet, class: "bg-chart-1/10 text-chart-1" },
  operational: { label: "Operasional", icon: Building2, class: "bg-chart-2/10 text-chart-2" },
  transport: { label: "Transport", icon: Car, class: "bg-chart-3/10 text-chart-3" },
  utilities: { label: "Utilities", icon: Coffee, class: "bg-chart-4/10 text-chart-4" },
  other: { label: "Lainnya", icon: Wallet, class: "bg-muted text-muted-foreground" },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function ExpenseList() {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const salaryTotal = expenses.filter((e) => e.category === "salary").reduce((sum, e) => sum + e.amount, 0);
  const operationalTotal = expenses.filter((e) => e.category !== "salary").reduce((sum, e) => sum + e.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Biaya Operasional</h1>
            <p className="text-muted-foreground mt-1">
              Jurnal pengeluaran di luar job (gaji, operasional, dll)
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Pengeluaran
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
            <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(totalExpenses)}</p>
            <p className="text-xs text-muted-foreground mt-1">Bulan ini</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Gaji Karyawan</p>
            <p className="text-2xl font-bold text-chart-1 mt-1">{formatCurrency(salaryTotal)}</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Biaya Operasional</p>
            <p className="text-2xl font-bold text-chart-2 mt-1">{formatCurrency(operationalTotal)}</p>
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari pengeluaran..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-40">
                <option value="">Semua Kategori</option>
                <option value="salary">Gaji</option>
                <option value="operational">Operasional</option>
                <option value="transport">Transport</option>
                <option value="utilities">Utilities</option>
                <option value="other">Lainnya</option>
              </select>
              <input type="month" className="input-field w-40" />
            </div>
          </div>
        </div>

        <div className="card-elevated overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Expense</th>
                <th>Kategori</th>
                <th>Deskripsi</th>
                <th>Tanggal</th>
                <th>Metode</th>
                <th className="text-right">Jumlah</th>
                <th>Status</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => {
                const config = categoryConfig[expense.category];
                const Icon = config.icon;
                return (
                  <tr key={expense.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                    <td>
                      <p className="font-medium text-foreground">{expense.expenseNumber}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-lg", config.class)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{config.label}</span>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm text-foreground">{expense.description}</p>
                    </td>
                    <td>
                      <p className="text-sm text-muted-foreground">{expense.date}</p>
                    </td>
                    <td>
                      <p className="text-sm text-muted-foreground">{expense.paymentMethod}</p>
                    </td>
                    <td className="text-right">
                      <p className="font-medium text-destructive">{formatCurrency(expense.amount)}</p>
                    </td>
                    <td>
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        expense.status === "paid" ? "badge-success" : "badge-warning"
                      )}>
                        {expense.status === "paid" ? "Dibayar" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
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
