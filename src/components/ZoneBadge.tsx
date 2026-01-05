import { ZoneLevel } from '@/types/flood';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface ZoneBadgeProps {
  level: ZoneLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  pulse?: boolean;
  className?: string;
}

const levelConfig = {
  danger: {
    label: 'DANGER',
    icon: AlertTriangle,
    className: 'zone-badge-danger',
    pulseClass: 'pulse-danger',
  },
  warning: {
    label: 'WARNING',
    icon: AlertCircle,
    className: 'zone-badge-warning',
    pulseClass: 'pulse-warning',
  },
  safe: {
    label: 'SAFE',
    icon: CheckCircle,
    className: 'zone-badge-safe',
    pulseClass: '',
  },
};

const sizeConfig = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2',
};

const iconSizeConfig = {
  sm: 12,
  md: 14,
  lg: 18,
};

export function ZoneBadge({ level, size = 'md', showIcon = true, pulse = false, className }: ZoneBadgeProps) {
  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full font-mono uppercase tracking-wider',
        config.className,
        sizeConfig[size],
        pulse && config.pulseClass,
        className
      )}
    >
      {showIcon && <Icon size={iconSizeConfig[size]} />}
      {config.label}
    </span>
  );
}
