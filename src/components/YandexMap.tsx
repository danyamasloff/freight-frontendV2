import {Map, Placemark, YMaps} from "@iminside/react-yandex-maps";

export default function YandexMap() {
    const defaultState = {
        center: [55.751574, 37.573856],
        zoom: 5,
    };

    return (
        <div style={{width: "100%", height: "100vh"}}>
            <YMaps
                query={{
                    apikey: process.env.YANDEX_KEY_API,
                    lang: "ru_RU",
                }}
            >
                <Map defaultState={defaultState} width="100%" height="100%">
                    <Placemark geometry={[55.684758, 37.738521]}/>
                </Map>
            </YMaps>
        </div>
    );
}
