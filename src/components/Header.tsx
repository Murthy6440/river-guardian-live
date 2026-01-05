import { Droplets, Shield, AlertTriangle } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <Droplets className="text-primary" size={28} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                FloodGuard<span className="text-primary">India</span>
              </h1>
              <p className="text-xs text-muted-foreground">Early Warning System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
              <Shield className="text-zone-safe" size={16} />
              <span className="text-sm font-medium">System Active</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertTriangle className="text-destructive animate-pulse" size={16} />
              <span className="text-sm font-medium text-destructive">3 Active Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
