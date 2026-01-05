import { Route, MapPin, ArrowRight, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EscapeRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  capacity: string;
  status: 'open' | 'congested' | 'closed';
}

const mockRoutes: EscapeRoute[] = [
  {
    id: '1',
    name: 'NH-48 Highway Route',
    from: 'Delhi NCR',
    to: 'Jaipur Safe Zone',
    distance: '280 km',
    estimatedTime: '4-5 hours',
    capacity: 'High',
    status: 'open',
  },
  {
    id: '2',
    name: 'State Highway 33',
    from: 'Assam Valley',
    to: 'Shillong Highlands',
    distance: '120 km',
    estimatedTime: '3 hours',
    capacity: 'Medium',
    status: 'congested',
  },
  {
    id: '3',
    name: 'Coastal Route A',
    from: 'Kerala Coast',
    to: 'Munnar Hills',
    distance: '95 km',
    estimatedTime: '2.5 hours',
    capacity: 'Medium',
    status: 'open',
  },
  {
    id: '4',
    name: 'Bengal Evacuation Corridor',
    from: 'Kolkata',
    to: 'Ranchi Safe Zone',
    distance: '310 km',
    estimatedTime: '6 hours',
    capacity: 'High',
    status: 'closed',
  },
];

const statusStyles = {
  open: 'bg-zone-safe/20 text-zone-safe border-zone-safe/30',
  congested: 'bg-zone-warning/20 text-zone-warning border-zone-warning/30',
  closed: 'bg-destructive/20 text-destructive border-destructive/30',
};

const statusLabels = {
  open: 'Open',
  congested: 'Congested',
  closed: 'Closed',
};

export function EscapeRoutes() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Route className="text-zone-safe" size={20} />
          Escape Routes
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Recommended evacuation routes from danger zones
        </p>
      </div>

      <div className="p-4 space-y-3">
        {mockRoutes.map((route) => (
          <div
            key={route.id}
            className={cn(
              'p-4 rounded-xl border bg-secondary/30 transition-all duration-300 hover:bg-secondary/50',
              route.status === 'closed' && 'opacity-60'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-sm">{route.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  <span>{route.from}</span>
                  <ArrowRight size={12} />
                  <span className="text-zone-safe">{route.to}</span>
                </div>
              </div>
              <span
                className={cn(
                  'px-2 py-1 text-xs rounded-full border font-medium',
                  statusStyles[route.status]
                )}
              >
                {statusLabels[route.status]}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Route size={12} />
                <span>{route.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{route.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{route.capacity} Capacity</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
