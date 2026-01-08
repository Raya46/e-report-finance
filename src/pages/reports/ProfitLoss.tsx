import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Download, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";

const monthlyData = [
  { month: "Jan", pendapatan: 85000000, biaya: 62000000, laba: 23000000 },
  { month: "Feb", pendapatan: 92000000, biaya: 68000000, laba: 24000000 },
  { month: "Mar", pendapatan: 78000000, biaya: 58000000, laba: 20000000 },
  { month: "Apr", pendapatan: 105000000, biaya: 75000000, laba: 30000000 },
  { month: "Mei", pendapatan: 98000000, biaya: 72000000, laba: 26000000 },
  { month: "Jun", pendapatan: 112000000, biaya: 80000000, laba: 32000000 },
  { month: "Jul", pendapatan: 125000000, biaya: 88000000, laba: 37000000 },
  { month: "Aug", pendapatan: 118000000, biaya: 85000000, laba: 33000000 },
  { month: "Sep", pendapatan: 135000000, biaya: 95000000, laba: 40000000 },
  { month: "Okt", pendapatan: 142000000, biaya: 100000000, laba: 42000000 },
  { month: "Nov", pendapatan: 155000000, biaya: 108000000, laba: 47000000 },
  { month: "Des", pendapatan: 168000000, biaya: 115000000, laba: 53000000 },
];

const incomeItems = [
  { name: "Pendapatan Jasa Ocean Freight", amount: 850000000 },
  { name: "Pendapatan Jasa Documentation", amount: 125000000 },
  { name: "Pendapatan Jasa Trucking", amount: 180000000 },
  { name: "Pendapatan Jasa Customs Clearance", amount: 95000000 },
  { name: "Pendapatan Lain-lain", amount: 35000000 },
];

const expenseItems = [
  { name: "Biaya Vendor - Shipping Line", amount: 520000000 },
  { name: "Biaya Vendor - Trucking", amount: 110000000 },
  { name: "Biaya Vendor - Terminal", amount: 85000000 },
  { name: "Gaji Karyawan", amount: 180000000 },
  { name: "Biaya Sewa Kantor", amount: 60000000 },
  { name: "Biaya Operasional Lainnya", amount: 45000000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatChartCurrency = (value: number) => `${(value / 1000000).toFixed(0)}jt`;

export default function ProfitLoss() {
  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Laporan Laba Rugi</h1>
            <p className="text-muted-foreground mt-1">
              Laporan pendapatan dan pengeluaran perusahaan
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
              <TrendingUp className="w-5 h-5 text-success" />
              <p className="text-sm text-muted-foreground">Total Pendapatan</p>
            </div>
            <p className="text-2xl font-bold text-success">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              <p className="text-sm text-muted-foreground">Total Biaya</p>
            </div>
            <p className="text-2xl font-bold text-destructive">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="stat-card border-success/30">
            <div className="flex items-center gap-2 mb-2">
              <Minus className="w-5 h-5 text-chart-1" />
              <p className="text-sm text-muted-foreground">Laba Bersih</p>
            </div>
            <p className="text-2xl font-bold text-chart-1">{formatCurrency(netProfit)}</p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <p className="text-sm text-muted-foreground">Profit Margin</p>
            </div>
            <p className="text-2xl font-bold text-accent">{profitMargin}%</p>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="section-title">Trend Bulanan</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
                <Legend />
                <Bar dataKey="pendapatan" name="Pendapatan" fill="hsl(152, 69%, 31%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="biaya" name="Biaya" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="laba" name="Laba" fill="hsl(217, 91%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-elevated p-6">
            <h3 className="section-title text-success">Pendapatan</h3>
            <div className="space-y-3">
              {incomeItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <p className="text-sm text-foreground">{item.name}</p>
                  <p className="font-medium text-success">{formatCurrency(item.amount)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                <p className="font-semibold text-foreground">Total Pendapatan</p>
                <p className="font-bold text-success text-lg">{formatCurrency(totalIncome)}</p>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="section-title text-destructive">Biaya & Pengeluaran</h3>
            <div className="space-y-3">
              {expenseItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <p className="text-sm text-foreground">{item.name}</p>
                  <p className="font-medium text-destructive">{formatCurrency(item.amount)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-border">
                <p className="font-semibold text-foreground">Total Biaya</p>
                <p className="font-bold text-destructive text-lg">{formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
