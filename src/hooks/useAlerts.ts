import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, ZoneLevel } from '@/types/flood';

// Audio contexts for different alert sounds
const createBeepSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const playDangerAlarm = () => {
  // Long, urgent alarm sound
  const playSequence = async () => {
    for (let i = 0; i < 3; i++) {
      createBeepSound(800, 0.5, 'square');
      await new Promise(resolve => setTimeout(resolve, 300));
      createBeepSound(600, 0.5, 'square');
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };
  playSequence();
};

const playWarningBeep = () => {
  // Short beep for warning
  createBeepSound(600, 0.2, 'sine');
};

export function useAlerts(currentZone: ZoneLevel | null) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const lastZoneRef = useRef<ZoneLevel | null>(null);
  const alertIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const addAlert = useCallback((type: ZoneLevel, message: string, location: string) => {
    const newAlert: Alert = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      location,
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 10));
  }, []);

  const playAlertSound = useCallback((zone: ZoneLevel) => {
    if (!soundEnabled) return;
    
    if (zone === 'danger') {
      playDangerAlarm();
    } else if (zone === 'warning') {
      playWarningBeep();
    }
  }, [soundEnabled]);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Zone change detection and alerts
  useEffect(() => {
    if (currentZone && currentZone !== lastZoneRef.current) {
      const messages: Record<ZoneLevel, string> = {
        danger: '⚠️ DANGER! You are in a high-risk flood zone. Seek higher ground immediately!',
        warning: '⚡ CAUTION: You are near a flood-prone area. Stay alert and monitor updates.',
        safe: '✅ You are currently in a safe zone. Continue monitoring for updates.',
      };

      addAlert(currentZone, messages[currentZone], 'Current Location');
      playAlertSound(currentZone);
      lastZoneRef.current = currentZone;
    }
  }, [currentZone, addAlert, playAlertSound]);

  // Periodic alerts for danger zones
  useEffect(() => {
    if (alertIntervalRef.current) {
      clearInterval(alertIntervalRef.current);
    }

    if (currentZone === 'danger') {
      alertIntervalRef.current = setInterval(() => {
        playAlertSound('danger');
        addAlert('danger', 'Reminder: You are still in a danger zone!', 'Current Location');
      }, 60000); // Every minute
    } else if (currentZone === 'warning') {
      alertIntervalRef.current = setInterval(() => {
        playAlertSound('warning');
      }, 300000); // Every 5 minutes
    }

    return () => {
      if (alertIntervalRef.current) {
        clearInterval(alertIntervalRef.current);
      }
    };
  }, [currentZone, playAlertSound, addAlert]);

  return {
    alerts,
    addAlert,
    clearAlerts,
    soundEnabled,
    setSoundEnabled,
    playAlertSound,
  };
}
