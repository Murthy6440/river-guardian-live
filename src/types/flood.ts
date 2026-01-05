export type ZoneLevel = 'danger' | 'warning' | 'safe';

export interface FloodZone {
  id: string;
  name: string;
  level: ZoneLevel;
  waterLevel: number; // in meters
  riskPercentage: number;
  lastUpdated: Date;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FamousPlace {
  id: string;
  name: string;
  city: string;
  state: string;
  level: ZoneLevel;
  waterLevel: number;
  description: string;
  imageUrl?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
  nearbyZones: FloodZone[];
  currentZone: ZoneLevel;
}

export interface Alert {
  id: string;
  type: ZoneLevel;
  message: string;
  timestamp: Date;
  location: string;
}
