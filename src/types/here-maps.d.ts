
declare namespace H {
  namespace map {
    class Map {
      constructor(element: HTMLElement, baseLayer: any, opt_options?: any);
      setCenter(point: { lat: number; lng: number }): void;
      setZoom(zoom: number): void;
      addObject(object: any): void;
      removeObject(object: any): void;
      getViewPort(): any;
      getViewModel(): any;
    }

    namespace provider {
      class ImageTileProvider {
        constructor(options?: any);
      }
    }

    class Group {
      constructor(objects?: any[]);
      addObjects(objects: any[]): void;
      removeAll(): void;
    }

    class Marker {
      constructor(position: { lat: number; lng: number }, options?: any);
    }

    namespace layer {
      class TileLayer {
        constructor(provider: any);
      }
    }
  }

  namespace service {
    namespace Platform {
      interface Options {
        apikey: string;
      }
    }
    class Platform {
      constructor(options: H.service.Platform.Options);
      createDefaultLayers(): any;
    }
  }

  namespace ui {
    class UI {
      constructor(map: H.map.Map);
      getControl(controlName: string): any;
    }
  }

  namespace mapevents {
    class MapEvents {
      constructor(map: H.map.Map);
    }
    class Behavior {
      constructor(mapEvents: H.mapevents.MapEvents);
    }
  }

  // Adding math namespace
  namespace math {
    class Box {
      constructor(top: number, left: number, bottom: number, right: number);
    }
  }
}

// This will allow importing the HERE Maps script
interface Window {
  H: typeof H;
}

declare module 'here-maps' {
  export default H;
}
