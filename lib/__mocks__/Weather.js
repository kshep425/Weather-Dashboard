

const get_current_weather = () => {
    return Promise.resolve(
        {
            coord: { lon: -76.84, lat: 39.24 },
            weather: [
                {
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03n'
                }
            ],
            base: 'stations',
            main: {
                temp: 274.25,
                feels_like: 270.82,
                temp_min: 270.93,
                temp_max: 277.59,
                pressure: 1021,
                humidity: 69
            },
            visibility: 16093,
            wind: { speed: 1.33, deg: 71 },
            clouds: { all: 40 },
            dt: 1577240162,
            sys: {
                type: 1,
                id: 3531,
                country: 'US',
                sunrise: 1577190281,
                sunset: 1577224133
            },
            id: 4352053,
            name: 'Columbia',
            cod: 200
        }
    )
}

exports.get_current_weather = get_current_weather