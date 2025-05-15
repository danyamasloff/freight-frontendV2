// Файл ymaps-loader.ts - обеспечивает корректную загрузку API Яндекс Карт

// Флаг, отслеживающий состояние загрузки API
import * as process from "node:process";

let isLoading = false;
let isLoaded = false;

// Промис, который резолвится когда API загружено
let loadPromise: Promise<void> | null = null;

/**
 * Загружает Яндекс Карты API 3
 * @param apiKey - API ключ Яндекс Карт (опционально)
 */
export function loadYMaps(apiKey: string = process.env.YANDEX_KEY_API || ''): Promise<void> {
    // Если API уже загружен, возвращаем резолвенный промис
    if (window.ymaps3 && isLoaded) {
        return Promise.resolve();
    }

    // Если API загружается, возвращаем существующий промис
    if (isLoading && loadPromise) {
        return loadPromise;
    }

    // Начинаем загрузку
    isLoading = true;

    loadPromise = new Promise<void>((resolve, reject) => {
        // Создаем скрипт для загрузки API
        const script = document.createElement('script');
        const apiUrl = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;

        script.src = apiUrl;
        script.async = true;

        // Обработчик успешной загрузки
        script.onload = () => {
            isLoaded = true;
            isLoading = false;

            // Дополнительно дожидаемся, когда ymaps3 будет полностью инициализирован
            if (window.ymaps3 && window.ymaps3.ready) {
                window.ymaps3.ready().then(() => {
                    resolve();
                }).catch(reject);
            } else {
                // Если ready() не доступен, просто резолвим промис
                resolve();
            }
        };

        // Обработчик ошибки
        script.onerror = (error) => {
            isLoading = false;
            reject(new Error(`Не удалось загрузить Яндекс Карты API: ${error}`));
        };

        // Добавляем скрипт на страницу
        document.head.appendChild(script);
    });

    return loadPromise;
}

/**
 * Импортирует модуль из Яндекс Карт API 3
 * @param moduleName - имя модуля для импорта
 */
export function importYMapsModule(moduleName: string): Promise<any> {
    return loadYMaps().then(() => {
        if (window.ymaps3 && window.ymaps3.import) {
            return window.ymaps3.import(moduleName);
        }
        throw new Error(`Не удалось импортировать модуль ${moduleName}`);
    });
}

/**
 * Загружает реактовские биндинги для Яндекс Карт API 3
 */
export function loadYMapsReact(): Promise<any> {
    return loadYMaps()
        .then(() => importYMapsModule('@yandex/ymaps3-reactify'))
        .then((reactifyModule) => {
            if (reactifyModule && reactifyModule.reactify && window.React && window.ReactDOM) {
                return reactifyModule.reactify.bindTo(window.React, window.ReactDOM);
            }
            throw new Error('Не удалось загрузить React биндинги для Яндекс Карт');
        });
}

// Экспортируем интерфейс для типов
export interface YMapsModules {
    YMap: React.ComponentType<any>;
    YMapDefaultSchemeLayer: React.ComponentType<any>;
    YMapDefaultFeaturesLayer: React.ComponentType<any>;
    YMapFeature: React.ComponentType<any>;
    YMapControls: React.ComponentType<any>;
    YMapControl: React.ComponentType<any>;
    YMapDefaultMarker?: React.ComponentType<any>;
}