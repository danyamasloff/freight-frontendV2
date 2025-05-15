import React from 'react';
import ReactDOM from 'react-dom';
import * as process from "node:process";

// Функция для загрузки скрипта Яндекс Карт API
const loadYMapsScript = (apiKey = process.env.YANDEX_KEY_API || '') => {
    return new Promise<void>((resolve, reject) => {
        // Проверяем, не загружен ли скрипт уже
        if (window.ymaps3) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;

        script.onload = () => resolve();
        script.onerror = (error) => reject(new Error(`Не удалось загрузить API Яндекс Карт: ${error}`));

        document.head.appendChild(script);
    });
};

// Функция для инициализации API, компонентов и их экспорта
export const initYMaps = async (apiKey = process.env.YANDEX_KEY_API || '') => {
    try {
        // Загружаем API
        await loadYMapsScript(apiKey);

        // Дожидаемся готовности API и загружаем модули
        const [ymaps3React] = await Promise.all([
            window.ymaps3.import('@yandex/ymaps3-reactify'),
            window.ymaps3.ready
        ]);

        // Создаем и экспортируем reactify
        const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

        // Получаем базовые компоненты карты
        const ymaps3Components = reactify.module(window.ymaps3);

        // Загружаем UI-тему для маркеров
        const defaultTheme = await window.ymaps3.import('@yandex/ymaps3-default-ui-theme');
        const themeComponents = reactify.module(defaultTheme);

        // Возвращаем все необходимые компоненты и утилиты
        return {
            reactify,
            ...ymaps3Components,
            ...themeComponents
        };
    } catch (error) {
        console.error('Ошибка при инициализации Яндекс Карт:', error);
        throw error;
    }
};

// Для типизации
declare global {
    interface Window {
        ymaps3: any;
    }
}