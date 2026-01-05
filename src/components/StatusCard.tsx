import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  variant?: 'default' | 'danger' | 'warning' | 'safe';
  className?: string;
}

const variantStyles = {
  default: 'bg-card border-border',
  danger: 'bg-destructive/10 border-destructive/30',
  warning: 'border-zone-warning/30',
  safe: 'border-zone-safe/30',
};

export function StatusCard({ title, value, subtitle, icon, variant = 'default', className }: StatusCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]',
        variantStyles[variant],
        variant === 'warning' && 'bg-zone-warning/10',
        variant === 'safe' && 'bg-zone-safe/10',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold font-mono">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-secondary/50 p-2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
