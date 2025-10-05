import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, description, icon: Icon, variant = 'default', trend }: StatCardProps) => {
  const variantClasses = {
    default: 'border-primary/20 bg-gradient-to-br from-primary/5 to-transparent',
    success: 'border-success/20 bg-gradient-to-br from-success/5 to-transparent',
    warning: 'border-warning/20 bg-gradient-to-br from-warning/5 to-transparent',
    danger: 'border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent',
  };

  const iconVariantClasses = {
    default: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-destructive/10 text-destructive',
  };

  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-shadow", variantClasses[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", iconVariantClasses[variant])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
