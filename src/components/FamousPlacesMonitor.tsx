import { famousPlaces } from '@/data/famousPlaces';
import { ZoneBadge } from './ZoneBadge';
import { MapPin, Droplets, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function FamousPlacesMonitor() {
  const [filter, setFilter] = useState<'all' | 'danger' | 'warning' | 'safe'>('all');

  const filteredPlaces = filter === 'all' 
    ? famousPlaces 
    : famousPlaces.filter(place => place.level === filter);

  const counts = {
    danger: famousPlaces.filter(p => p.level === 'danger').length,
    warning: famousPlaces.filter(p => p.level === 'warning').length,
    safe: famousPlaces.filter(p => p.level === 'safe').length,
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Building2 className="text-accent" size={20} />
          Famous Places Monitor
        </h3>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
            filter === 'all' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          All ({famousPlaces.length})
        </button>
        <button
          onClick={() => setFilter('danger')}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
            filter === 'danger' 
              ? 'bg-destructive text-destructive-foreground' 
              : 'bg-destructive/20 text-destructive hover:bg-destructive/30'
          )}
        >
          Danger ({counts.danger})
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
            filter === 'warning' 
              ? 'bg-zone-warning text-background' 
              : 'bg-zone-warning/20 text-zone-warning hover:bg-zone-warning/30'
          )}
        >
          Warning ({counts.warning})
        </button>
        <button
          onClick={() => setFilter('safe')}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
            filter === 'safe' 
              ? 'bg-zone-safe text-background' 
              : 'bg-zone-safe/20 text-zone-safe hover:bg-zone-safe/30'
          )}
        >
          Safe ({counts.safe})
        </button>
      </div>

      {/* Places grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredPlaces.map((place, index) => (
          <div
            key={place.id}
            className={cn(
              'p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] opacity-0 animate-fade-in cursor-pointer',
              place.level === 'danger' && 'bg-destructive/5 border-destructive/30 hover:bg-destructive/10',
              place.level === 'warning' && 'bg-zone-warning/5 border-zone-warning/30 hover:bg-zone-warning/10',
              place.level === 'safe' && 'bg-zone-safe/5 border-zone-safe/30 hover:bg-zone-safe/10'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold">{place.name}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <MapPin size={12} />
                  <span>{place.city}, {place.state}</span>
                </div>
              </div>
              <ZoneBadge level={place.level} size="sm" showIcon={false} />
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
              <Droplets size={14} className="text-accent" />
              <span className="font-mono">{place.waterLevel}m water level</span>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2">
              {place.description}
            </p>
          </div>
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No places found for this filter.
        </p>
      )}
    </div>
  );
}
