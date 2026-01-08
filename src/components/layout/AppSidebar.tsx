import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Package,
  FileText,
  Ship,
  FileCheck,
  CheckCircle,
  Receipt,
  CreditCard,
  Wallet,
  BarChart3,
  TrendingUp,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    title: "Master Data",
    icon: Package,
    children: [
      { title: "Customer", href: "/master/customer" },
      { title: "Vendor", href: "/master/vendor" },
      { title: "Jasa", href: "/master/services" },
    ],
  },
  {
    title: "Sales",
    icon: FileText,
    children: [{ title: "Penawaran", href: "/sales/quotation" }],
  },
  {
    title: "Operational",
    icon: Ship,
    children: [
      { title: "Job / Shipment", href: "/operational/jobs" },
      { title: "eBL", href: "/operational/ebl" },
      { title: "Closing Job", href: "/operational/closing" },
    ],
  },
  {
    title: "Finance",
    icon: Wallet,
    children: [
      { title: "Invoice", href: "/finance/invoice" },
      { title: "Pembayaran", href: "/finance/payment" },
      { title: "Biaya Operasional", href: "/finance/expenses" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Laba Rugi", href: "/reports/profit-loss" },
      { title: "Arus Kas", href: "/reports/cashflow" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [{ title: "User & Role", href: "/settings/users" }],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Master Data", "Sales", "Operational", "Finance", "Reports"]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sidebar-primary/10">
          <img src="/favicon.png" alt="Logo" className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">Lantech</h1>
          <p className="text-xs text-sidebar-muted">E-Report Finance</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.title);
          const isGroupActive = isChildActive(item.children);

          if (hasChildren) {
            return (
              <div key={item.title}>
                <button
                  onClick={() => toggleExpand(item.title)}
                  className={cn(
                    "w-full sidebar-link",
                    isGroupActive && "text-sidebar-primary"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left text-sm">{item.title}</span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {isExpanded && (
                  <div className="ml-8 mt-1 space-y-1 animate-fade-in">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                          isActive(child.href)
                            ? "text-sidebar-primary bg-sidebar-accent font-medium"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.href}
              to={item.href!}
              className={cn(
                "sidebar-link",
                isActive(item.href!) && "sidebar-link-active"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary">D</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Direktur</p>
            <p className="text-xs text-sidebar-muted truncate">Superuser</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <LogOut className="w-4 h-4 text-sidebar-muted" />
          </button>
        </div>
      </div>
    </aside>
  );
}
