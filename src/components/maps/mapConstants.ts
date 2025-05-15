import {LngLat} from './routeUtils';

// Начальные координаты центра карты
export const MOSCOW_CENTER: LngLat = [37.618423, 55.751244];

// Начальные точки маршрута (Москва и Санкт-Петербург)
export const INITIAL_ROUTE_POINTS: [LngLat, LngLat] = [
    [37.618423, 55.751244], // Москва
    [30.315868, 59.939095]  // Санкт-Петербург
];

// Цвета маркеров
export const MARKER_COLORS = {
    A: '#3b83f7', // Синий
    B: '#f73b3b'  // Красный
};

// Стили для линии маршрута
export const LINE_STYLE = {
    stroke: [
        {
            color: '#3b83f7',
            width: 5,
            opacity: 0.7
        },
        {
            color: '#ffffff',
            width: 7,
            opacity: 0.4
        }
    ]
};

// Начальное расположение карты
export const INITIAL_LOCATION = {
    center: MOSCOW_CENTER,
    zoom: 9
};