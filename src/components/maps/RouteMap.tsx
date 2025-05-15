import {useState, useEffect, useCallback, useRef} from 'react';
import {initYMaps} from '@/lib/ymaps';
import {LngLat, RouteType, getPointStr} from './routeUtils';
import * as process from "node:process";

// Константы
const MOSCOW_CENTER: LngLat = [37.618423, 55.751244];
const INITIAL_ROUTE_POINTS: [LngLat, LngLat] = [
    [37.618423, 55.751244], // Москва
    [30.315868, 59.939095]  // Санкт-Петербург
];
const INITIAL_LOCATION = {
    center: MOSCOW_CENTER,
    zoom: 9
};

// Отступы для карты
const MARGIN = {top: 80, right: 80, bottom: 80, left: 80};

// Стили для линии маршрута
const LINE_STYLE = {
    stroke: [
        {
            color: '#3b83f7',
            width: 5,
            opacity: 0.7
        }
    ]
};

// Цвета маркеров
const MARKER_A_COLOR = '#3b83f7'; // Синий
const MARKER_B_COLOR = '#f73b3b'; // Красный

export function RouteMap() {
    // Состояния для API и компонентов
    const [ymapsModules, setYmapsModules] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Состояния для маршрута
    const [waypointA, setWaypointA] = useState({
        coordinates: INITIAL_ROUTE_POINTS[0],
        subtitle: getPointStr(INITIAL_ROUTE_POINTS[0])
    });

    const [waypointB, setWaypointB] = useState({
        coordinates: INITIAL_ROUTE_POINTS[1],
        subtitle: getPointStr(INITIAL_ROUTE_POINTS[1])
    });

    const [routeFeature, setRouteFeature] = useState<any>(null);
    const [routeType, setRouteType] = useState<RouteType>(RouteType.Driving);

    const mapRef = useRef<any>(null);

    // Загрузка API и компонентов карты
    useEffect(() => {
        const loadAPI = async () => {
            try {
                // Получаем API-ключ из переменных окружения через process.env
                const apiKey = process.env.YANDEX_KEY_API || '';

                // Инициализируем API с корректным ключом
                const modules = await initYMaps(apiKey);
                setYmapsModules(modules);
                setIsLoading(false);
            } catch (err) {
                console.error('Ошибка загрузки Яндекс Карт:', err);
                setError('Не удалось загрузить карту. Пожалуйста, обновите страницу или попробуйте позже.');
                setIsLoading(false);
            }
        };

        loadAPI();
    }, []);

    // Построение маршрута
    const buildRoute = useCallback((
        pointA: LngLat,
        pointB: LngLat,
        type: RouteType = RouteType.Driving
    ) => {
        try {
            // Симуляция разных маршрутов
            let routeCoordinates;

            if (type === RouteType.Driving || type === RouteType.Truck) {
                routeCoordinates = [
                    pointA,
                    [44.005986, 56.326887], // Нижний Новгород
                    pointB
                ];
            } else if (type === RouteType.Walking) {
                routeCoordinates = [pointA, pointB];
            } else {
                routeCoordinates = [
                    pointA,
                    [40.618423, 55.751244], // Промежуточная точка
                    [39.893190, 57.626119], // Ярославль
                    [39.891689, 59.220496], // Вологда
                    pointB
                ];
            }

            setRouteFeature({
                geometry: {
                    type: 'LineString',
                    coordinates: routeCoordinates
                },
                properties: {
                    // Расчет приблизительных границ маршрута
                    bounds: (() => {
                        const minLon = Math.min(...routeCoordinates.map(c => c[0]));
                        const maxLon = Math.max(...routeCoordinates.map(c => c[0]));
                        const minLat = Math.min(...routeCoordinates.map(c => c[1]));
                        const maxLat = Math.max(...routeCoordinates.map(c => c[1]));
                        return [[minLon, minLat], [maxLon, maxLat]];
                    })(),
                    duration: type === RouteType.Driving ? 41400 : // 11ч 30м
                        type === RouteType.Truck ? 49500 : // 13ч 45м
                            type === RouteType.Transit ? 51600 : // 14ч 20м
                                637800, // 177ч 10м для пешком
                    distance: type === RouteType.Walking ? 852400 : 941200
                }
            });

            // Адаптация отображения под границы маршрута
            if (mapRef.current) {
                const bounds = routeCoordinates.reduce(
                    (acc, [lon, lat]) => {
                        return {
                            minLon: Math.min(acc.minLon, lon),
                            maxLon: Math.max(acc.maxLon, lon),
                            minLat: Math.min(acc.minLat, lat),
                            maxLat: Math.max(acc.maxLat, lat),
                        };
                    },
                    {minLon: Infinity, maxLon: -Infinity, minLat: Infinity, maxLat: -Infinity}
                );

                mapRef.current.setLocation({
                    bounds: [[bounds.minLon, bounds.minLat], [bounds.maxLon, bounds.maxLat]],
                    duration: 300
                });
            }
        } catch (error) {
            console.error('Ошибка при построении маршрута:', error);
        }
    }, []);

    // Обработчики перемещения маркеров
    const onDragMovePointAHandler = useCallback((coordinates: LngLat) => {
        setWaypointA({
            coordinates,
            subtitle: getPointStr(coordinates)
        });
    }, []);

    const onDragMovePointBHandler = useCallback((coordinates: LngLat) => {
        setWaypointB({
            coordinates,
            subtitle: getPointStr(coordinates)
        });
    }, []);

    const onDragEndHandler = useCallback(() => {
        buildRoute(waypointA.coordinates, waypointB.coordinates, routeType);
    }, [buildRoute, waypointA.coordinates, waypointB.coordinates, routeType]);

    // Построение начального маршрута после загрузки API
    useEffect(() => {
        if (!isLoading && ymapsModules && waypointA.coordinates && waypointB.coordinates) {
            buildRoute(waypointA.coordinates, waypointB.coordinates, routeType);
        }
    }, [isLoading, ymapsModules, buildRoute, waypointA.coordinates, waypointB.coordinates, routeType]);

    // Обработчики смены типа маршрута
    const setRouteAndBuild = useCallback((type: RouteType) => {
        setRouteType(type);
        buildRoute(waypointA.coordinates, waypointB.coordinates, type);
    }, [buildRoute, waypointA.coordinates, waypointB.coordinates]);

    // Форматирование данных маршрута
    const formatDistance = useCallback((meters: number) => {
        return (meters / 1000).toFixed(1) + ' км';
    }, []);

    const formatDuration = useCallback((seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} ч ${minutes} мин`;
    }, []);

    // Если происходит загрузка карты, показываем индикатор
    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Загрузка карты...</p>
                </div>
            </div>
        );
    }

    // Если произошла ошибка, показываем сообщение об ошибке
    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
                <div className="text-center p-4">
                    <div className="text-red-500 text-3xl mb-4">⚠️</div>
                    <p className="text-lg font-medium text-red-500 mb-2">Ошибка загрузки карты</p>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
                    >
                        Обновить страницу
                    </button>
                </div>
            </div>
        );
    }

    // Если API не загружен, ничего не рендерим
    if (!ymapsModules) {
        return null;
    }

    // Деструктурируем компоненты из загруженных модулей
    const {
        reactify,
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapFeature,
        YMapControls,
        YMapControl,
        YMapDefaultMarker
    } = ymapsModules;

    return (
        <div className="w-full h-full">
            <YMap
                location={reactify.useDefault(INITIAL_LOCATION)}
                ref={(instance: any) => mapRef.current = instance}
                margin={MARGIN}
            >
                <YMapDefaultSchemeLayer/>
                <YMapDefaultFeaturesLayer/>

                {/* Маркеры */}
                <YMapDefaultMarker
                    coordinates={waypointA.coordinates}
                    title="Точка A"
                    subtitle={waypointA.subtitle}
                    draggable
                    size="normal"
                    iconName="fallback"
                    color={MARKER_A_COLOR}
                    onDragMove={onDragMovePointAHandler}
                    onDragEnd={onDragEndHandler}
                />

                <YMapDefaultMarker
                    coordinates={waypointB.coordinates}
                    title="Точка B"
                    subtitle={waypointB.subtitle}
                    draggable
                    size="normal"
                    iconName="fallback"
                    color={MARKER_B_COLOR}
                    onDragMove={onDragMovePointBHandler}
                    onDragEnd={onDragEndHandler}
                />

                {/* Линия маршрута */}
                {routeFeature && (
                    <YMapFeature {...routeFeature} style={LINE_STYLE}/>
                )}

                {/* Панель управления типами маршрутов */}
                <YMapControls position="top right">
                    <YMapControl transparent>
                        <div className="bg-white dark:bg-slate-800 shadow-md rounded-md p-2 z-10">
                            <div className="flex flex-col gap-2">
                                <button
                                    className={`px-3 py-1 rounded-md ${routeType === RouteType.Driving
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    onClick={() => setRouteAndBuild(RouteType.Driving)}
                                >
                                    Автомобиль
                                </button>
                                <button
                                    className={`px-3 py-1 rounded-md ${routeType === RouteType.Truck
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    onClick={() => setRouteAndBuild(RouteType.Truck)}
                                >
                                    Грузовик
                                </button>
                                <button
                                    className={`px-3 py-1 rounded-md ${routeType === RouteType.Walking
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    onClick={() => setRouteAndBuild(RouteType.Walking)}
                                >
                                    Пешком
                                </button>
                                <button
                                    className={`px-3 py-1 rounded-md ${routeType === RouteType.Transit
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                    onClick={() => setRouteAndBuild(RouteType.Transit)}
                                >
                                    Транспорт
                                </button>
                            </div>
                        </div>
                    </YMapControl>
                </YMapControls>

                {/* Информация о маршруте */}
                {routeFeature && routeFeature.properties && (
                    <YMapControls position="bottom left">
                        <YMapControl transparent>
                            <div className="bg-white dark:bg-slate-800 shadow-md rounded-md p-3 z-10">
                                <div className="text-sm">
                                    <div>
                                        <span className="font-medium">Расстояние: </span>
                                        {formatDistance(routeFeature.properties.distance)}
                                    </div>
                                    <div>
                                        <span className="font-medium">Время в пути: </span>
                                        {formatDuration(routeFeature.properties.duration)}
                                    </div>
                                </div>
                            </div>
                        </YMapControl>
                    </YMapControls>
                )}

                {/* Инструкция */}
                <YMapControls position="top left">
                    <YMapControl transparent>
                        <div className="bg-white dark:bg-slate-800 shadow-md rounded-md p-2 z-10">
                            <div className="text-sm">
                                Перетащите маркеры для изменения маршрута
                            </div>
                        </div>
                    </YMapControl>
                </YMapControls>
            </YMap>
        </div>
    );
}

export default RouteMap;