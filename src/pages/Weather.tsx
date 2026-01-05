import { Header } from '@/components/Header';
import { useLocation } from '@/hooks/useLocation';
import { useWeather } from '@/hooks/useWeather';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  ThermometerSun, 
  Eye, 
  Gauge,
  CloudSun,
  Snowflake,
  CloudLightning,
  MapPin
} from 'lucide-react';

const getWeatherIcon = (code: string, size: number = 48) => {
  if (code === '01d') return <Sun size={size} className="text-yellow-400" />;
  if (code === '03d') return <CloudSun size={size} className="text-muted-foreground" />;
  return <Cloud size={size} className="text-muted-foreground" />;
};

const forecastData = [
  { day: 'Today', high: 28, low: 22, icon: 'rain', rain: 80, description: 'Heavy Rain' },
  { day: 'Tomorrow', high: 26, low: 21, icon: 'cloudy', rain: 60, description: 'Cloudy' },
  { day: 'Wed', high: 27, low: 20, icon: 'partial', rain: 30, description: 'Partly Cloudy' },
  { day: 'Thu', high: 29, low: 21, icon: 'sunny', rain: 10, description: 'Sunny' },
  { day: 'Fri', high: 30, low: 22, icon: 'sunny', rain: 5, description: 'Clear' },
  { day: 'Sat', high: 28, low: 21, icon: 'partial', rain: 25, description: 'Partly Cloudy' },
  { day: 'Sun', high: 25, low: 20, icon: 'rain', rain: 70, description: 'Rain Expected' },
];

const hourlyForecast = [
  { time: 'Now', temp: 24, icon: 'cloudy', rain: 40 },
  { time: '2PM', temp: 26, icon: 'cloudy', rain: 50 },
  { time: '4PM', temp: 25, icon: 'rain', rain: 70 },
  { time: '6PM', temp: 23, icon: 'rain', rain: 80 },
  { time: '8PM', temp: 22, icon: 'rain', rain: 75 },
  { time: '10PM', temp: 21, icon: 'cloudy', rain: 45 },
  { time: '12AM', temp: 20, icon: 'cloudy', rain: 30 },
  { time: '2AM', temp: 19, icon: 'partial', rain: 20 },
];

const getForecastIcon = (icon: string, size: number = 32) => {
  switch (icon) {
    case 'sunny': return <Sun size={size} className="text-yellow-400" />;
    case 'rain': return <CloudRain size={size} className="text-accent" />;
    case 'cloudy': return <Cloud size={size} className="text-muted-foreground" />;
    case 'partial': return <CloudSun size={size} className="text-zone-warning" />;
    case 'snow': return <Snowflake size={size} className="text-blue-300" />;
    case 'storm': return <CloudLightning size={size} className="text-destructive" />;
    default: return <Cloud size={size} className="text-muted-foreground" />;
  }
};

const Weather = () => {
  const { location } = useLocation();
  const { weather, loading } = useWeather(location?.lat ?? null, location?.lng ?? null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <CloudRain className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Weather Forecast</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin size={12} />
              {location?.address || 'Fetching location...'}
            </p>
          </div>
        </div>

        {/* Current Weather */}
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-background border border-border overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative">
                    {loading ? (
                      <div className="w-24 h-24 rounded-full bg-secondary/50 animate-pulse" />
                    ) : (
                      getWeatherIcon(weather?.icon || '01d', 96)
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-6xl font-bold font-mono">
                    {loading ? '--' : weather?.temperature}°C
                  </p>
                  <p className="text-lg text-muted-foreground capitalize">
                    {loading ? 'Loading...' : weather?.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Feels like {loading ? '--' : weather?.feelsLike}°C
                  </p>
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Droplets className="text-accent" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="font-mono font-semibold">{loading ? '--' : weather?.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Wind className="text-zone-safe" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Wind</p>
                    <p className="font-mono font-semibold">{loading ? '--' : weather?.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Gauge className="text-zone-warning" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Pressure</p>
                    <p className="font-mono font-semibold">{loading ? '--' : weather?.pressure} hPa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <Eye className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Visibility</p>
                    <p className="font-mono font-semibold">{loading ? '--' : weather?.visibility} km</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">Hourly Forecast</h3>
            <p className="text-xs text-muted-foreground">Next 24 hours</p>
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl min-w-[80px] ${
                    index === 0 ? 'bg-primary/10 border border-primary/30' : 'bg-secondary/30'
                  }`}
                >
                  <span className="text-sm font-medium">{hour.time}</span>
                  {getForecastIcon(hour.icon, 28)}
                  <span className="font-mono font-semibold">{hour.temp}°</span>
                  <div className="flex items-center gap-1 text-xs text-accent">
                    <Droplets size={10} />
                    {hour.rain}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">7-Day Forecast</h3>
            <p className="text-xs text-muted-foreground">Weather outlook for the week</p>
          </div>
          <div className="divide-y divide-border">
            {forecastData.map((day, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors ${
                  index === 0 ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center gap-4 min-w-[120px]">
                  <span className={`font-medium ${index === 0 ? 'text-primary' : ''}`}>
                    {day.day}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getForecastIcon(day.icon, 24)}
                  <span className="text-sm text-muted-foreground w-28">{day.description}</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Droplets size={14} />
                  <span className="font-mono text-sm">{day.rain}%</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-foreground">{day.high}°</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="rounded-2xl bg-gradient-to-r from-destructive/10 to-zone-warning/10 border border-destructive/30 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <CloudRain className="text-destructive" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-destructive">Heavy Rain Alert</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Heavy rainfall expected between 4 PM - 8 PM today. Stay indoors and avoid flood-prone areas.
                Water levels may rise significantly in low-lying regions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border">
          <p className="mb-2">
            🌊 FloodGuard India - Real-time Flood Monitoring & Early Warning System
          </p>
          <p className="text-xs">
            Weather data from Open-Meteo • Updated every 10 minutes
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Weather;
