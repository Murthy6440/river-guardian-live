import { Droplets, Shield, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-background flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated logo */}
      <div className="relative mb-8 animate-fade-in">
        <div className="absolute -inset-4 bg-accent/20 rounded-full blur-xl animate-pulse" />
        <div className="relative bg-card border border-border rounded-full p-6">
          <Droplets className="w-12 h-12 text-accent" />
        </div>
      </div>

      {/* Welcome text */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
        Welcome to <span className="text-accent">FloodGuard</span>
      </h1>
      
      <p className="text-muted-foreground text-lg mb-12 animate-fade-in text-center px-4">
        Your real-time flood monitoring & early warning system
      </p>

      {/* Feature highlights */}
      <div className="flex flex-wrap justify-center gap-6 animate-fade-in">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-5 h-5 text-accent" />
          <span>Live Location Tracking</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="w-5 h-5 text-zone-safe" />
          <span>Safety Alerts</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Droplets className="w-5 h-5 text-primary" />
          <span>Flood Monitoring</span>
        </div>
      </div>

      {/* Continue hint */}
      <p className="absolute bottom-12 text-sm text-muted-foreground animate-pulse">
        Loading your dashboard...
      </p>
    </div>
  );
};
