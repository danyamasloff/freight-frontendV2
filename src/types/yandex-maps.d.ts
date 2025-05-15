declare global {
    interface Window {
        ymaps3?: YMaps3;
        React: any;
        ReactDOM: any;
    }
}

type LngLat = [number, number];

interface YMaps3 {
    ready(): Promise<void>;
    import(module: string): Promise<any>;

    // Реактификатор
    reactify?: {
        bindTo(React: any, ReactDOM: any): {
            module(module: any): any;
        };
    };

    // Компоненты карты и другие объекты могут быть доступны напрямую
    YMap?: any;
    YMapDefaultSchemeLayer?: any;
    YMapDefaultFeaturesLayer?: any;
    YMapFeature?: any;
    YMapControls?: any;
    YMapControl?: any;
}

// Типы для событий и объектов карты
interface YMapsEvent {
    get(key: string): any;
}

interface YMapsGeometry {
    getCoordinates(): LngLat;
}

interface YMapsPlacemark {
    geometry: YMapsGeometry;
}

interface YMapsMap {
    setLocation(options: {
        center?: LngLat;
        zoom?: number;
        bounds?: [LngLat, LngLat];
        duration?: number;
    }): void;

    geoObjects?: {
        getBounds(): [[number, number], [number, number]] | null;
    };
}

// Типы для основных объектов на карте
interface YMapProps {
    location?: {
        center?: LngLat;
        zoom?: number;
        bounds?: [LngLat, LngLat];
        duration?: number;
    };
    children?: React.ReactNode;
    ref?: React.RefObject<YMapsMap> | ((instance: YMapsMap | null) => void);
    showScaleInCopyrights?: boolean;
    margin?: number | {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

interface YMapMarkerProps {
    coordinates: LngLat;
    title?: string;
    subtitle?: string;
    draggable?: boolean;
    size?: "small" | "normal" | "large";
    iconName?: string;
    color?: string;
    onDragMove?: (coordinates: LngLat) => void;
    onDragEnd?: (event: YMapsEvent) => void;
}

interface YMapFeatureProps {
    geometry: {
        type: string;
        coordinates: LngLat[];
    };
    properties?: {
        duration?: number;
        distance?: number;
        bounds?: {
            minLon: number;
            minLat: number;
            maxLon: number;
            maxLat: number;
        };
    };
    style?: {
        stroke?: Array<{
            color: string;
            width: number;
            opacity?: number;
        }>;
    };
}

interface YMapControlsProps {
    position?: "top left" | "top right" | "bottom left" | "bottom right";
    children?: React.ReactNode;
}

interface YMapControlProps {
    transparent?: boolean;
    children?: React.ReactNode;
}

// Экспортируем типы для использования в других файлах
export {
    YMaps3,
    LngLat,
    YMapsEvent,
    YMapsGeometry,
    YMapsPlacemark,
    YMapsMap,
    YMapProps,
    YMapMarkerProps,
    YMapFeatureProps,
    YMapControlsProps,
    YMapControlProps
};