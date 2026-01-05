import { useState, useEffect, useCallback } from 'react';
import { UserLocation, FloodZone, ZoneLevel } from '@/types/flood';

// Simulated flood zones in India
const mockFloodZones: FloodZone[] = [
  {
    id: '1',
    name: 'Yamuna River Area',
    level: 'danger',
    waterLevel: 4.2,
    riskPercentage: 85,
    lastUpdated: new Date(),
    coordinates: { lat: 28.6139, lng: 77.2090 },
  },
  {
    id: '2',
    name: 'Ganga Basin',
    level: 'warning',
    waterLevel: 2.8,
    riskPercentage: 60,
    lastUpdated: new Date(),
    coordinates: { lat: 25.4358, lng: 81.8463 },
  },
  {
    id: '3',
    name: 'Marina Beach Area',
    level: 'safe',
    waterLevel: 0.5,
    riskPercentage: 15,
    lastUpdated: new Date(),
    coordinates: { lat: 13.0500, lng: 80.2824 },
  },
  {
    id: '4',
    name: 'Brahmaputra Delta',
    level: 'danger',
    waterLevel: 5.1,
    riskPercentage: 92,
    lastUpdated: new Date(),
    coordinates: { lat: 26.1445, lng: 91.7362 },
  },
  {
    id: '5',
    name: 'Kerala Backwaters',
    level: 'warning',
    waterLevel: 2.1,
    riskPercentage: 45,
    lastUpdated: new Date(),
    coordinates: { lat: 9.4981, lng: 76.3388 },
  },
];

const getZoneLevelFromDistance = (distance: number): ZoneLevel => {
  if (distance < 5) return 'danger';
  if (distance < 15) return 'warning';
  return 'safe';
};

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    
    // Find nearby zones
    const nearbyZones = mockFloodZones.map(zone => ({
      ...zone,
      distance: calculateDistance(latitude, longitude, zone.coordinates.lat, zone.coordinates.lng),
    })).sort((a, b) => a.distance - b.distance);

    const closestDangerZone = nearbyZones.find(z => z.level === 'danger');
    const closestWarningZone = nearbyZones.find(z => z.level === 'warning');
    
    let currentZone: ZoneLevel = 'safe';
    if (closestDangerZone && closestDangerZone.distance < 10) {
      currentZone = 'danger';
    } else if (closestWarningZone && closestWarningZone.distance < 20) {
      currentZone = 'warning';
    }

    setLocation({
      lat: latitude,
      lng: longitude,
      address: 'Detecting location...',
      nearbyZones: nearbyZones.slice(0, 5),
      currentZone,
    });
    setLoading(false);
  }, []);

  const fetchLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      // Fallback to Delhi coordinates for demo
      updateLocation({
        coords: { latitude: 28.6139, longitude: 77.2090 },
      } as GeolocationPosition);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      updateLocation,
      (err) => {
        console.warn('Geolocation error:', err.message);
        // Fallback to Delhi
        updateLocation({
          coords: { latitude: 28.6139, longitude: 77.2090 },
        } as GeolocationPosition);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [updateLocation]);

  useEffect(() => {
    fetchLocation();

    // Watch position for real-time updates
    const watchId = navigator.geolocation?.watchPosition(
      updateLocation,
      () => {},
      { enableHighAccuracy: true }
    );

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [fetchLocation, updateLocation]);

  return { location, loading, error, refetch: fetchLocation };
}
