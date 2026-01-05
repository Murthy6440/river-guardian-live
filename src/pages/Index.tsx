import { useState } from 'react';
import { Header } from '@/components/Header';
import { LocationDisplay } from '@/components/LocationDisplay';
import { NearbyZones } from '@/components/NearbyZones';
import { FamousPlacesMonitor } from '@/components/FamousPlacesMonitor';
import { AlertsPanel } from '@/components/AlertsPanel';
import { FloodMap } from '@/components/FloodMap';
import { StatusCard } from '@/components/StatusCard';
import { EscapeRoutes } from '@/components/EscapeRoutes';
import { FloodStatistics } from '@/components/FloodStatistics';
import { SurvivalItems } from '@/components/SurvivalItems';
import { LoadingScreen } from '@/components/LoadingScreen';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { useLocation } from '@/hooks/useLocation';
import { useAlerts } from '@/hooks/useAlerts';
import { useWeather } from '@/hooks/useWeather';
import { Droplets, ThermometerSun, Wind, CloudRain } from 'lucide-react';

const Index = () => {
  const { location, loading, refetch } = useLocation();
  const { alerts, soundEnabled, setSoundEnabled, clearAlerts } = useAlerts(location?.currentZone ?? null);
  const { weather } = useWeather(location?.lat ?? null, location?.lng ?? null);
  const [showWelcome, setShowWelcome] = useState(true);

  if (loading) {
    return <LoadingScreen />;
  }

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatusCard
            title="Active Alerts"
            value="3"
            subtitle="Across India"
            icon={<CloudRain className="text-destructive" size={20} />}
            variant="danger"
          />
          <StatusCard
            title="Avg Water Level"
            value="2.4m"
            subtitle="+0.3m from yesterday"
            icon={<Droplets className="text-accent" size={20} />}
          />
          <StatusCard
            title="Temperature"
            value={weather ? `${weather.temperature}°C` : '--°C'}
            subtitle={weather ? `Feels like ${weather.feelsLike}°C` : 'Loading...'}
            icon={<ThermometerSun className="text-zone-warning" size={20} />}
            variant="warning"
          />
          <StatusCard
            title="Wind Speed"
            value={weather ? `${weather.windSpeed} km/h` : '-- km/h'}
            subtitle={weather ? `Humidity ${weather.humidity}%` : 'Loading...'}
            icon={<Wind className="text-zone-safe" size={20} />}
            variant="safe"
          />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Location and Nearby */}
          <div className="lg:col-span-2 space-y-6">
            <LocationDisplay
              location={location}
              loading={loading}
              onRefresh={refetch}
            />

            <FloodMap location={location} />

            <EscapeRoutes />

            <NearbyZones zones={location?.nearbyZones ?? []} />
          </div>

          {/* Right column - Alerts and Survival */}
          <div className="space-y-6">
            <AlertsPanel
              alerts={alerts}
              soundEnabled={soundEnabled}
              onSoundToggle={() => setSoundEnabled(!soundEnabled)}
              onClearAlerts={clearAlerts}
            />

            <SurvivalItems />
          </div>
        </div>

        {/* Statistics Section */}
        <FloodStatistics />

        {/* Famous Places Section */}
        <FamousPlacesMonitor />

        {/* Footer info */}
        <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border">
          <p className="mb-2">
            🌊 FloodGuard India - Real-time Flood Monitoring & Early Warning System
          </p>
          <p className="text-xs">
            Data updated every 5 minutes • Emergency helpline: 1800-XXX-XXXX
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
