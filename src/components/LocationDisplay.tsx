import { UserLocation } from '@/types/flood';
import { ZoneBadge } from './ZoneBadge';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LocationDisplayProps {
  location: UserLocation | null;
  loading: boolean;
  onRefresh: () => void;
}

export function LocationDisplay({ location, loading, onRefresh }: LocationDisplayProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-2xl bg-card border border-border animate-pulse">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Navigation className="animate-spin" size={24} />
          <span className="text-lg">Detecting your location...</span>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-border gap-4">
        <MapPin className="text-muted-foreground" size={32} />
        <p className="text-muted-foreground">Unable to detect location</p>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="mr-2" size={14} />
          Retry
        </Button>
      </div>
    );
  }

  const zoneGradients = {
    danger: 'from-destructive/20 via-destructive/10 to-transparent',
    warning: 'from-zone-warning/20 via-zone-warning/10 to-transparent',
    safe: 'from-zone-safe/20 via-zone-safe/10 to-transparent',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border p-6',
        location.currentZone === 'danger' && 'border-destructive/50 pulse-danger',
        location.currentZone === 'warning' && 'border-zone-warning/50 pulse-warning',
        location.currentZone === 'safe' && 'border-zone-safe/50'
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-50',
          zoneGradients[location.currentZone]
        )}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/20 text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Your Location</h2>
              <p className="text-sm text-muted-foreground font-mono">
                {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
              </p>
            </div>
          </div>
          <Button
            onClick={onRefresh}
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
          >
            <RefreshCw size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-muted-foreground">Current Zone Status:</span>
          <ZoneBadge level={location.currentZone} size="lg" pulse={location.currentZone !== 'safe'} />
        </div>

        {location.currentZone === 'danger' && (
          <div className="p-4 rounded-lg bg-destructive/20 border border-destructive/30 mt-4">
            <p className="text-sm font-medium text-destructive">
              ⚠️ IMMEDIATE ACTION REQUIRED: Move to higher ground and follow evacuation guidelines.
            </p>
          </div>
        )}

        {location.currentZone === 'warning' && (
          <div className="p-4 rounded-lg bg-zone-warning/20 border border-zone-warning/30 mt-4">
            <p className="text-sm font-medium text-zone-warning">
              ⚡ Stay alert and prepare emergency supplies. Monitor updates closely.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
