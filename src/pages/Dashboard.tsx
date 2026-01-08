import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentJobs } from "@/components/dashboard/RecentJobs";
import { UpcomingActivities } from "@/components/dashboard/UpcomingActivities";
import { QuickActions } from "@/components/dashboard/QuickActions";
import {
  Wallet,
  TrendingUp,
  Ship,
  FileText,
  Receipt,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Selamat datang kembali! Ini ringkasan bisnis Anda.
            </p>
          </div>
          <button className="btn-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Lihat Laporan
          </button>
        </div>

        {/* Quick actions */}
        <QuickActions />

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Pendapatan"
            value="Rp 805.000.000"
            change={12.5}
            changeLabel="vs bulan lalu"
            icon={<Wallet className="w-5 h-5 text-primary" />}
            variant="primary"
          />
          <StatCard
            title="Job Aktif"
            value="24"
            change={8.2}
            changeLabel="vs minggu lalu"
            icon={<Ship className="w-5 h-5 text-accent" />}
          />
          <StatCard
            title="Invoice Pending"
            value="12"
            change={-3.1}
            changeLabel="vs minggu lalu"
            icon={<Receipt className="w-5 h-5 text-warning" />}
            variant="warning"
          />
          <StatCard
            title="Penawaran Aktif"
            value="8"
            change={15.3}
            changeLabel="vs minggu lalu"
            icon={<FileText className="w-5 h-5 text-success" />}
            variant="success"
          />
        </div>

        {/* Charts and tables row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <UpcomingActivities />
          </div>
        </div>

        {/* Recent jobs */}
        <RecentJobs />
      </div>
    </DashboardLayout>
  );
}
