import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  variant?: "default" | "primary" | "accent" | "success" | "warning";
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  variant = "default",
}: StatCardProps) {
  const isPositive = change && change > 0;

  const variantStyles = {
    default: "bg-card",
    primary: "bg-gradient-primary text-primary-foreground",
    accent: "bg-gradient-accent text-accent-foreground",
    success: "bg-success/10 border-success/20",
    warning: "bg-warning/10 border-warning/20",
  };

  return (
    <div className={cn("stat-card animate-slide-up", variantStyles[variant])}>
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "p-3 rounded-xl",
            variant === "default" && "bg-muted",
            variant === "primary" && "bg-primary-foreground/20",
            variant === "accent" && "bg-accent-foreground/20",
            variant === "success" && "bg-success/20",
            variant === "warning" && "bg-warning/20"
          )}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <p
          className={cn(
            "text-sm mb-1",
            variant === "default" || variant === "success" || variant === "warning"
              ? "text-muted-foreground"
              : "text-primary-foreground/80"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-2xl font-bold",
            variant === "default" && "text-foreground",
            variant === "success" && "text-success",
            variant === "warning" && "text-warning"
          )}
        >
          {value}
        </p>
        {changeLabel && (
          <p
            className={cn(
              "text-xs mt-1",
              variant === "default" ? "text-muted-foreground" : "text-primary-foreground/60"
            )}
          >
            {changeLabel}
          </p>
        )}
      </div>
    </div>
  );
}
