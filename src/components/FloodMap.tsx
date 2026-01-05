import { UserLocation, FloodZone } from '@/types/flood';
import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';

interface FloodMapProps {
  location: UserLocation | null;
}

// Mock India map data points
const indiaOutline = [
  { x: 45, y: 15 }, { x: 55, y: 10 }, { x: 70, y: 12 },
  { x: 80, y: 18 }, { x: 85, y: 28 }, { x: 90, y: 40 },
  { x: 88, y: 55 }, { x: 82, y: 65 }, { x: 78, y: 75 },
  { x: 72, y: 82 }, { x: 65, y: 88 }, { x: 55, y: 90 },
  { x: 45, y: 85 }, { x: 38, y: 78 }, { x: 32, y: 68 },
  { x: 28, y: 55 }, { x: 30, y: 42 }, { x: 35, y: 28 },
  { x: 40, y: 20 },
];

const floodZonePositions = [
  { id: '1', x: 52, y: 25, level: 'danger' as const, name: 'Delhi NCR' },
  { id: '2', x: 58, y: 35, level: 'warning' as const, name: 'UP' },
  { id: '3', x: 75, y: 80, level: 'safe' as const, name: 'Chennai' },
  { id: '4', x: 85, y: 32, level: 'danger' as const, name: 'Assam' },
  { id: '5', x: 40, y: 75, level: 'warning' as const, name: 'Kerala' },
  { id: '6', x: 65, y: 55, level: 'warning' as const, name: 'Maharashtra' },
  { id: '7', x: 82, y: 48, level: 'danger' as const, name: 'Bengal' },
];

const zoneColors = {
  danger: '#ef4444',
  warning: '#f59e0b',
  safe: '#10b981',
};

export function FloodMap({ location }: FloodMapProps) {
  // Calculate user position on map (approximate for demo)
  const userX = location ? ((location.lng - 68) / 30) * 60 + 25 : 52;
  const userY = location ? ((35 - location.lat) / 25) * 60 + 10 : 30;

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Navigation className="text-accent" size={20} />
          Live Flood Zone Map - India
        </h3>
        <p className="text-xs text-muted-foreground mt-1">Real-time flood monitoring across major regions</p>
      </div>

      <div className="relative aspect-[4/3] bg-background/50 overflow-hidden">
        {/* Animated water background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-transparent to-accent/20" />
          <svg className="absolute inset-0 w-[200%] h-full wave-animation" preserveAspectRatio="none">
            <path
              d="M0 50 Q 25 30, 50 50 T 100 50 T 150 50 T 200 50 V 100 H 0 Z"
              fill="url(#waveGradient)"
              className="opacity-30"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* India outline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Country outline */}
          <path
            d={`M ${indiaOutline.map(p => `${p.x} ${p.y}`).join(' L ')} Z`}
            fill="hsl(var(--secondary))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            className="opacity-80"
          />

          {/* Flood zones */}
          {floodZonePositions.map((zone) => (
            <g key={zone.id}>
              {/* Pulse effect for danger zones */}
              {zone.level === 'danger' && (
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r="8"
                  fill={zoneColors[zone.level]}
                  className="animate-ping opacity-30"
                />
              )}
              {/* Zone marker */}
              <circle
                cx={zone.x}
                cy={zone.y}
                r="4"
                fill={zoneColors[zone.level]}
                stroke="hsl(var(--background))"
                strokeWidth="1"
                className={cn(
                  'transition-all duration-300 cursor-pointer hover:r-6',
                  zone.level === 'danger' && 'filter drop-shadow-lg'
                )}
              />
              {/* Zone label */}
              <text
                x={zone.x}
                y={zone.y + 8}
                textAnchor="middle"
                className="text-[3px] fill-current opacity-70"
              >
                {zone.name}
              </text>
            </g>
          ))}

          {/* User location */}
          {location && (
            <g>
              {/* User pulse */}
              <circle
                cx={userX}
                cy={userY}
                r="6"
                fill="hsl(var(--primary))"
                className="animate-ping opacity-50"
              />
              {/* User marker */}
              <circle
                cx={userX}
                cy={userY}
                r="3"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
          <p className="text-xs font-medium mb-2">Zone Status</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-xs">Danger Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zone-warning" />
              <span className="text-xs">Warning Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zone-safe" />
              <span className="text-xs">Safe Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs">Your Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
