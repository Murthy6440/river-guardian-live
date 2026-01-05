import { Alert } from '@/types/flood';
import { ZoneBadge } from './ZoneBadge';
import { Bell, BellOff, Trash2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface AlertsPanelProps {
  alerts: Alert[];
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onClearAlerts: () => void;
}

export function AlertsPanel({ alerts, soundEnabled, onSoundToggle, onClearAlerts }: AlertsPanelProps) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="text-accent" size={20} />
          Recent Alerts
        </h3>
        <div className="flex items-center gap-2">
          <Button
            onClick={onSoundToggle}
            variant="ghost"
            size="icon"
            className={cn(
              'hover:bg-secondary',
              soundEnabled ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>
          {alerts.length > 0 && (
            <Button
              onClick={onClearAlerts}
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/20 hover:text-destructive"
            >
              <Trash2 size={18} />
            </Button>
          )}
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <BellOff size={32} className="mb-2 opacity-50" />
          <p>No alerts yet</p>
          <p className="text-xs">Alerts will appear here when zone status changes</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                'p-4 rounded-xl border opacity-0 animate-slide-in-right',
                alert.type === 'danger' && 'bg-destructive/10 border-destructive/30',
                alert.type === 'warning' && 'bg-zone-warning/10 border-zone-warning/30',
                alert.type === 'safe' && 'bg-zone-safe/10 border-zone-safe/30'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <ZoneBadge level={alert.type} size="sm" />
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
