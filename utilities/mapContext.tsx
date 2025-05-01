
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
  } from 'react';
  
  type LocationType = {
    latitude: number;
    longitude: number;
  } | null;
  
  type MapContextValue = {
    location: LocationType;
    setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
  };
  
  const MapContext = createContext<MapContextValue | undefined>(undefined);
  
  export function MapProvider({ children }: { children: ReactNode }) {
    const [location, setLocation] = useState<LocationType>(null);
  
    return (
      <MapContext.Provider value={{ location, setLocation }}>
        {children}
      </MapContext.Provider>
    );
  }
  
  export function useMap() {
    const context = useContext(MapContext);
    if (!context) {
      throw new Error('useMap must be used within a MapProvider');
    }
    return context;
  }
  