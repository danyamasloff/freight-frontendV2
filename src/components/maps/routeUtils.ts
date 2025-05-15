// Типы координат и маршрутов
import * as process from "node:process";

export type LngLat = [number, number];
export type RouteFeature = {
    geometry: {
        type: string;
        coordinates: LngLat[];
    };
    properties: {
        duration?: number;
        distance?: number;
        bounds?: {
            minLon: number;
            minLat: number;
            maxLon: number;
            maxLat: number;
        };
    };
};

// Перечисление типов маршрутов
export enum RouteType {
    Driving = 'driving',
    Truck = 'truck',
    Walking = 'walking',
    Transit = 'transit'
}

// Отступы для отображения маршрута
export const ROUTE_MARGIN = {
    top: 80,
    bottom: 80,
    left: 80,
    right: 80
};

// Получение строкового представления координат
export const getPointStr = (coordinates: LngLat): string => {
    return `[${coordinates[0].toFixed(6)}, ${coordinates[1].toFixed(6)}]`;
};

// Функция для получения маршрута через Яндекс API
export async function fetchRoute(
    pointA: LngLat,
    pointB: LngLat,
    routeType: string = 'driving'
): Promise<RouteFeature | null> {
    try {
        // Формируем запрос к API
        const params = new URLSearchParams({
            apikey: process.env.YANDEX_KEY_API || '', // Заменено с YANDEX_MAP_API
            waypoints: `${pointA[0]},${pointA[1]}~${pointB[0]},${pointB[1]}`,
            mode: routeType
        });

        // Запрос к API Яндекс.Карт
        const response = await fetch(`https://api.routing.yandex.net/v2/route?${params}`);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Проверяем, содержит ли ответ корректные данные
        if (!data.routes || !data.routes[0]) {
            return null;
        }

        // Извлекаем информацию о маршруте
        const route = data.routes[0];
        const geometry = route.geometry || [];
        const bounds = route.bounds;

        // Подготавливаем данные о маршруте в нужном формате
        return {
            geometry: {
                type: 'LineString',
                coordinates: geometry
            },
            properties: {
                duration: route.duration,
                distance: route.distance,
                bounds: bounds ? {
                    minLon: bounds.southwest.lon,
                    minLat: bounds.southwest.lat,
                    maxLon: bounds.northeast.lon,
                    maxLat: bounds.northeast.lat
                } : undefined
            }
        };
    } catch (error) {
        console.error('Error fetching route:', error);
        return null;
    }
}