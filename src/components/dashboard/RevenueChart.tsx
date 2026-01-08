import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", pendapatan: 45000000, pengeluaran: 32000000 },
  { month: "Feb", pendapatan: 52000000, pengeluaran: 38000000 },
  { month: "Mar", pendapatan: 48000000, pengeluaran: 35000000 },
  { month: "Apr", pendapatan: 61000000, pengeluaran: 42000000 },
  { month: "Mei", pendapatan: 55000000, pengeluaran: 39000000 },
  { month: "Jun", pendapatan: 67000000, pengeluaran: 45000000 },
  { month: "Jul", pendapatan: 72000000, pengeluaran: 48000000 },
  { month: "Aug", pendapatan: 69000000, pengeluaran: 46000000 },
  { month: "Sep", pendapatan: 78000000, pengeluaran: 52000000 },
  { month: "Okt", pendapatan: 82000000, pengeluaran: 55000000 },
  { month: "Nov", pendapatan: 85000000, pengeluaran: 58000000 },
  { month: "Des", pendapatan: 91000000, pengeluaran: 62000000 },
];

const formatCurrency = (value: number) => {
  return `${(value / 1000000).toFixed(0)}jt`;
};

export function RevenueChart() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="section-title mb-0">Pendapatan vs Pengeluaran</h3>
          <p className="text-sm text-muted-foreground">Tahun 2024</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            <span className="text-sm text-muted-foreground">Pendapatan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2"></div>
            <span className="text-sm text-muted-foreground">Pengeluaran</span>
          </div>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 62%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(174, 62%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 16%, 47%)", fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(214, 32%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) =>
                new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <Area
              type="monotone"
              dataKey="pendapatan"
              stroke="hsl(217, 91%, 40%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPendapatan)"
            />
            <Area
              type="monotone"
              dataKey="pengeluaran"
              stroke="hsl(174, 62%, 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPengeluaran)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
