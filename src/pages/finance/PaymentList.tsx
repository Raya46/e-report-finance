import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Plus, Search, CreditCard, ArrowDownLeft, ArrowUpRight, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  paymentNumber: string;
  type: "incoming" | "outgoing";
  relatedDoc: string;
  party: string;
  date: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed";
}

const payments: Payment[] = [
  {
    id: "1",
    paymentNumber: "PAY-2025-000234",
    type: "incoming",
    relatedDoc: "INV-2025-000455",
    party: "CV Sukses Makmur",
    date: "7 Jan 2025",
    amount: 35520000,
    method: "Transfer Bank",
    status: "completed",
  },
  {
    id: "2",
    paymentNumber: "PAY-2025-000233",
    type: "outgoing",
    relatedDoc: "BILL-2025-000089",
    party: "PT Pelayaran Nusantara",
    date: "6 Jan 2025",
    amount: 28000000,
    method: "Transfer Bank",
    status: "completed",
  },
  {
    id: "3",
    paymentNumber: "PAY-2025-000232",
    type: "incoming",
    relatedDoc: "INV-2025-000454",
    party: "PT Logistik Nusantara",
    date: "5 Jan 2025",
    amount: 15000000,
    method: "Transfer Bank",
    status: "pending",
  },
  {
    id: "4",
    paymentNumber: "PAY-2025-000231",
    type: "outgoing",
    relatedDoc: "BILL-2025-000088",
    party: "CV Trucking Mandiri",
    date: "4 Jan 2025",
    amount: 8500000,
    method: "Transfer Bank",
    status: "completed",
  },
];

const statusConfig = {
  completed: { label: "Selesai", class: "badge-success" },
  pending: { label: "Pending", class: "badge-warning" },
  failed: { label: "Gagal", class: "badge-destructive" },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function PaymentList() {
  const totalIncoming = payments
    .filter((p) => p.type === "incoming" && p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOutgoing = payments
    .filter((p) => p.type === "outgoing" && p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Pembayaran</h1>
            <p className="text-muted-foreground mt-1">
              Kelola pembayaran masuk dan keluar
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Catat Pembayaran
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="w-5 h-5 text-success" />
              <p className="text-sm text-muted-foreground">Pembayaran Masuk</p>
            </div>
            <p className="text-2xl font-bold text-success">{formatCurrency(totalIncoming)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-5 h-5 text-destructive" />
              <p className="text-sm text-muted-foreground">Pembayaran Keluar</p>
            </div>
            <p className="text-2xl font-bold text-destructive">{formatCurrency(totalOutgoing)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-chart-1" />
              <p className="text-sm text-muted-foreground">Net Cashflow</p>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              totalIncoming - totalOutgoing >= 0 ? "text-success" : "text-destructive"
            )}>
              {formatCurrency(totalIncoming - totalOutgoing)}
            </p>
          </div>
        </div>

        <div className="card-elevated p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari pembayaran..."
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="input-field w-36">
                <option value="">Semua Tipe</option>
                <option value="incoming">Masuk</option>
                <option value="outgoing">Keluar</option>
              </select>
              <select className="input-field w-36">
                <option value="">Semua Status</option>
                <option value="completed">Selesai</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-elevated overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Pembayaran</th>
                <th>Tipe</th>
                <th>Pihak</th>
                <th>Tanggal</th>
                <th>Metode</th>
                <th className="text-right">Jumlah</th>
                <th>Status</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        payment.type === "incoming" ? "bg-success/10" : "bg-destructive/10"
                      )}>
                        {payment.type === "incoming" ? (
                          <ArrowDownLeft className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{payment.paymentNumber}</p>
                        <p className="text-xs text-muted-foreground">{payment.relatedDoc}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded",
                      payment.type === "incoming" 
                        ? "bg-success/10 text-success" 
                        : "bg-destructive/10 text-destructive"
                    )}>
                      {payment.type === "incoming" ? "Masuk" : "Keluar"}
                    </span>
                  </td>
                  <td>
                    <p className="text-sm text-foreground">{payment.party}</p>
                  </td>
                  <td>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </td>
                  <td>
                    <p className="text-sm text-muted-foreground">{payment.method}</p>
                  </td>
                  <td className="text-right">
                    <p className={cn(
                      "font-medium",
                      payment.type === "incoming" ? "text-success" : "text-destructive"
                    )}>
                      {payment.type === "incoming" ? "+" : "-"}{formatCurrency(payment.amount)}
                    </p>
                  </td>
                  <td>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusConfig[payment.status].class
                    )}>
                      {statusConfig[payment.status].label}
                    </span>
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
