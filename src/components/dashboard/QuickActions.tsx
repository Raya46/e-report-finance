import { Plus, FileText, Ship, Receipt, Users } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Open Job Baru",
    description: "Buat job/shipment baru",
    icon: Ship,
    href: "/operational/jobs/new",
    color: "bg-chart-1",
  },
  {
    title: "Buat Penawaran",
    description: "Kirim quotation ke customer",
    icon: FileText,
    href: "/sales/quotation/new",
    color: "bg-chart-2",
  },
  {
    title: "Buat Invoice",
    description: "Tagihan untuk customer",
    icon: Receipt,
    href: "/finance/invoice/new",
    color: "bg-chart-3",
  },
  {
    title: "Tambah Customer",
    description: "Registrasi customer baru",
    icon: Users,
    href: "/master/customer/new",
    color: "bg-chart-4",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.title}
            to={action.href}
            className="card-elevated p-4 flex items-center gap-4 group hover:scale-[1.02] transition-all duration-200"
          >
            <div
              className={`p-3 rounded-xl ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
