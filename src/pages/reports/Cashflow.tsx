import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Download, ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const cashflowData = [
  { month: "Jan", masuk: 78000000, keluar: 65000000, saldo: 13000000 },
  { month: "Feb", masuk: 85000000, keluar: 72000000, saldo: 26000000 },
  { month: "Mar", masuk: 72000000, keluar: 68000000, saldo: 30000000 },
  { month: "Apr", masuk: 98000000, keluar: 78000000, saldo: 50000000 },
  { month: "Mei", masuk: 92000000, keluar: 85000000, saldo: 57000000 },
  { month: "Jun", masuk: 105000000, keluar: 88000000, saldo: 74000000 },
  { month: "Jul", masuk: 118000000, keluar: 95000000, saldo: 97000000 },
  { month: "Aug", masuk: 110000000, keluar: 92000000, saldo: 115000000 },
  { month: "Sep", masuk: 128000000, keluar: 102000000, saldo: 141000000 },
  { month: "Okt", masuk: 135000000, keluar: 108000000, saldo: 168000000 },
  { month: "Nov", masuk: 148000000, keluar: 115000000, saldo: 201000000 },
  { month: "Des", masuk: 162000000, keluar: 125000000, saldo: 238000000 },
];

const cashInflows = [
  { category: "Pembayaran Invoice Customer", amount: 1250000000 },
  { category: "Uang Muka Proyek", amount: 85000000 },
  { category: "Pendapatan Lain-lain", amount: 15000000 },
];

const cashOutflows = [
  { category: "Pembayaran ke Vendor", amount: 720000000 },
  { category: "Gaji & Tunjangan", amount: 185000000 },
  { category: "Biaya Operasional", amount: 125000000 },
  { category: "Pajak", amount: 45000000 },
  { category: "Pengeluaran Lainnya", amount: 18000000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatChartCurrency = (value: number) => `${(value / 1000000).toFixed(0)}jt`;

export default function Cashflow() {
  const totalInflow = cashInflows.reduce((sum, item) => sum + item.amount, 0);
  const totalOutflow = cashOutflows.reduce((sum, item) => sum + item.amount, 0);
  const netCashflow = totalInflow - totalOutflow;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Laporan Arus Kas</h1>
            <p className="text-muted-foreground mt-1">
              Laporan pergerakan kas masuk dan keluar
            </p>
          </div>
          <div className="flex gap-2">
            <select className="input-field w-32">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <button className="btn-outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="w-5 h-5 text-success" />
              <p className="text-sm text-muted-foreground">Total Kas Masuk</p>
            </div>
            <p className="text-2xl font-bold text-success">{formatCurrency(totalInflow)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-5 h-5 text-destructive" />
              <p className="text-sm text-muted-foreground">Total Kas Keluar</p>
            </div>
            <p className="text-2xl font-bold text-destructive">{formatCurrency(totalOutflow)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-chart-1" />
              <p className="text-sm text-muted-foreground">Net Cashflow</p>
            </div>
            <p className={cn(
              "text-2xl font-bold",
              netCashflow >= 0 ? "text-success" : "text-destructive"
            )}>
              {formatCurrency(netCashflow)}
            </p>
          </div>
          <div className="stat-card bg-gradient-primary text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" />
              <p className="text-sm opacity-80">Saldo Kas Akhir</p>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(238000000)}</p>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="section-title">Trend Arus Kas</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 69%, 31%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152, 69%, 31%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 40%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217, 91%, 40%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }} tickFormatter={formatChartCurrency} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 32%, 91%)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area type="monotone" dataKey="masuk" name="Kas Masuk" stroke="hsl(152, 69%, 31%)" strokeWidth={2} fillOpacity={1} fill="url(#colorMasuk)" />
                <Area type="monotone" dataKey="keluar" name="Kas Keluar" stroke="hsl(0, 84%, 60%)" strokeWidth={2} fillOpacity={1} fill="url(#colorKeluar)" />
                <Area type="monotone" dataKey="saldo" name="Saldo" stroke="hsl(217, 91%, 40%)" strokeWidth={2} fillOpacity={1} fill="url(#colorSaldo)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-elevated p-6">
            <h3 className="section-title">
              <span className="flex items-center gap-2">
                <ArrowDownLeft className="w-5 h-5 text-success" />
                Kas Masuk
              </span>
            </h3>
            <div className="space-y-3">
              {cashInflows.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <p className="text-sm text-foreground">{item.category}</p>
                  <p className="font-medium text-success">{formatCurrency(item.amount)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                <p className="font-semibold text-foreground">Total Kas Masuk</p>
                <p className="font-bold text-success text-lg">{formatCurrency(totalInflow)}</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="section-title">
              <span className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-destructive" />
                Kas Keluar
              </span>
            </h3>
            <div className="space-y-3">
              {cashOutflows.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <p className="text-sm text-foreground">{item.category}</p>
                  <p className="font-medium text-destructive">{formatCurrency(item.amount)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                <p className="font-semibold text-foreground">Total Kas Keluar</p>
                <p className="font-bold text-destructive text-lg">{formatCurrency(totalOutflow)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
