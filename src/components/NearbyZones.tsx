import { FloodZone } from '@/types/flood';
import { ZoneBadge } from './ZoneBadge';
import { Droplets, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NearbyZonesProps {
  zones: FloodZone[];
}

export function NearbyZones({ zones }: NearbyZonesProps) {
  if (!zones.length) {
    return (
      <div className="rounded-2xl bg-card border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Nearby Flood Zones</h3>
        <p className="text-muted-foreground text-center py-8">No flood zones detected nearby.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Droplets className="text-accent" size={20} />
        Nearby Flood Zones
      </h3>
      
      <div className="space-y-3">
        {zones.map((zone, index) => (
          <div
            key={zone.id}
            className={cn(
              'p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] opacity-0 animate-fade-in',
              zone.level === 'danger' && 'bg-destructive/5 border-destructive/30',
              zone.level === 'warning' && 'bg-zone-warning/5 border-zone-warning/30',
              zone.level === 'safe' && 'bg-zone-safe/5 border-zone-safe/30'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium">{zone.name}</h4>
              <ZoneBadge level={zone.level} size="sm" />
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Droplets size={14} />
                <span className="font-mono">{zone.waterLevel}m</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp size={14} />
                <span className="font-mono">{zone.riskPercentage}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={14} />
                <span className="text-xs">Just now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
