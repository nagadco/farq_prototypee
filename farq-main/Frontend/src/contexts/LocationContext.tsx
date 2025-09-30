import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  hasLocationPermission: boolean | null;
  showLocationModal: boolean;
  userLocation: { lat: number; lng: number } | null;
  requestLocation: () => void;
  allowLocation: () => void;
  denyLocation: () => void;
  closeModal: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Check if user has already responded to location permission
    const locationPermission = localStorage.getItem('locationPermission');
    const savedLocation = localStorage.getItem('userLocation');

    if (locationPermission === null) {
      // First time visitor - show modal
      setShowLocationModal(true);
    } else if (locationPermission === 'granted') {
      setHasLocationPermission(true);
      // Load saved location if it exists
      if (savedLocation) {
        try {
          const parsedLocation = JSON.parse(savedLocation);
          setUserLocation(parsedLocation);
        } catch (error) {
          console.error('Error parsing saved location:', error);
        }
      } else {
        // No saved location despite permission granted - show modal
        setShowLocationModal(true);
      }
    } else if (locationPermission === 'denied') {
      setHasLocationPermission(false);
    }
  }, []);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success - save user's real location
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setHasLocationPermission(true);
          localStorage.setItem('locationPermission', 'granted');
          localStorage.setItem('userLocation', JSON.stringify({ lat: latitude, lng: longitude }));
          setShowLocationModal(false);
        },
        (error) => {
          // Error
          console.error('Geolocation error:', error);
          setHasLocationPermission(false);
          localStorage.setItem('locationPermission', 'denied');
          setShowLocationModal(false);
        }
      );
    } else {
      // Geolocation not supported
      console.error('Geolocation is not supported by this browser');
      setHasLocationPermission(false);
      localStorage.setItem('locationPermission', 'denied');
      setShowLocationModal(false);
    }
  };

  const allowLocation = () => {
    requestLocation();
  };

  const denyLocation = () => {
    setHasLocationPermission(false);
    localStorage.setItem('locationPermission', 'denied');
    setShowLocationModal(false);
  };

  const closeModal = () => {
    setShowLocationModal(false);
  };

  const value: LocationContextType = {
    hasLocationPermission,
    showLocationModal,
    userLocation,
    requestLocation,
    allowLocation,
    denyLocation,
    closeModal
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}