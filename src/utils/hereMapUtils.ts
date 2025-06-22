
// HERE Maps API utility functions
let isScriptLoaded = false;

export const loadHereMapScript = (apiKey: string): Promise<void> => {
  if (isScriptLoaded) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://js.api.here.com/v3/3.1/mapsjs-core.js`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Load additional required modules
        loadAdditionalModules()
          .then(() => {
            isScriptLoaded = true;
            resolve();
          })
          .catch(reject);
      };
      
      script.onerror = (error) => {
        reject(new Error('Failed to load HERE Maps script'));
      };
      
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
};

const loadAdditionalModules = (): Promise<void> => {
  const modules = [
    'mapsjs-service.js',
    'mapsjs-mapevents.js',
    'mapsjs-ui.js',
  ];

  const modulePromises = modules.map(
    (module) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://js.api.here.com/v3/3.1/${module}`;
        script.async = true;
        
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${module}`));
        
        document.head.appendChild(script);
      })
  );

  // Also load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://js.api.here.com/v3/3.1/mapsjs-ui.css';
  document.head.appendChild(link);

  return Promise.all(modulePromises).then(() => {});
};

export const initializeMap = (
  container: HTMLElement,
  apiKey: string,
  center: { lat: number; lng: number },
  zoom: number
): H.map.Map => {
  const platform = new H.service.Platform({
    apikey: apiKey
  });

  const layers = platform.createDefaultLayers();
  
  // Initialize map
  const map = new H.map.Map(
    container,
    layers.vector.normal.map,
    {
      center,
      zoom,
      pixelRatio: window.devicePixelRatio || 1
    }
  );

  // Add UI interaction and behavior
  const ui = new H.ui.UI(map);
  const mapEvents = new H.mapevents.MapEvents(map);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const behavior = new H.mapevents.Behavior(mapEvents);

  // Make the map responsive
  window.addEventListener('resize', () => map.getViewPort().resize());

  return map;
};

export const createMarker = (coords: { lat: number; lng: number }): H.map.Marker => {
  return new H.map.Marker(coords);
};

export const createLocationMarker = (coords: { lat: number; lng: number }): H.map.Marker => {
  return new H.map.Marker(coords);
};
