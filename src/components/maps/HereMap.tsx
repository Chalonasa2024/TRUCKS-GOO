
import React, { useEffect, useRef, useState } from 'react';
import { loadHereMapScript, initializeMap } from '@/utils/hereMapUtils';

interface HereMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
  onMapReady?: (map: H.map.Map) => void;
}

const HereMap: React.FC<HereMapProps> = ({
  apiKey,
  center,
  zoom = 14,
  className = 'h-[400px] w-full',
  style,
  onMapReady
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<H.map.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let map: H.map.Map | null = null;

    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        await loadHereMapScript(apiKey);
        map = initializeMap(mapRef.current, apiKey, center, zoom);
        mapInstanceRef.current = map;
        setIsLoaded(true);
        
        if (onMapReady && map) {
          onMapReady(map);
        }
      } catch (err) {
        console.error('Error initializing HERE Map:', err);
        setError('Failed to load HERE Maps API');
      }
    };

    if (apiKey) {
      initMap();
    } else {
      setError('HERE Maps API key is required');
    }

    return () => {
      // Clean up
      if (mapInstanceRef.current) {
        // No direct destroy method, but we can remove the container
        if (mapRef.current) {
          mapRef.current.innerHTML = '';
        }
        mapInstanceRef.current = null;
      }
    };
  }, [apiKey]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current && isLoaded) {
      mapInstanceRef.current.setCenter(center);
    }
  }, [center.lat, center.lng, isLoaded]);

  useEffect(() => {
    if (mapInstanceRef.current && isLoaded) {
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [zoom, isLoaded]);

  return (
    <>
      <div 
        ref={mapRef} 
        className={className} 
        style={style}
      />
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-2">
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default HereMap;
