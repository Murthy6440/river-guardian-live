import { Droplets } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      {/* Animated water drop */}
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping">
          <Droplets className="w-16 h-16 text-accent opacity-30" />
        </div>
        <Droplets className="w-16 h-16 text-accent animate-pulse" />
      </div>

      {/* App name */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        <span className="text-accent">Flood</span>Guard
      </h1>
      <p className="text-muted-foreground text-sm mb-8">India's Real-time Flood Monitoring System</p>

      {/* Loading bar */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent via-primary to-accent rounded-full animate-loading-bar" />
      </div>

      <p className="text-xs text-muted-foreground mt-4 animate-pulse">
        Fetching location data...
      </p>
    </div>
  );
};
