//jest.mock("../lib/__mocks__/Weather.js")


const Weather = require("../lib/Weather");
const axios = require("axios");
//import axios from "axios";

jest.mock("axios");

describe("Weather", () => {

    test("Can instantiate Weather instance", () => {
        const w = new Weather();
        const appid = "f16525c1c6fcefe387680a252092b626"
        expect(typeof (w)).toBe("object")
        expect(w.appid).toBe(appid)
    })

    test("Can instantiate Weather instance with default", () => {
        const id = "4352053"
        w = new Weather();
        expect(w.id).toBe(w.id)
    })

    test("Can instantiate Weather instance with search text", () => {
        const search_term = "Baltimore"
        w = new Weather({ q: search_term });
        expect(w.search_term).toBe(search_term)
    })

    test("Can instantiate Weather instance with ID", () => {
        const id = "4352053",
        w = new Weather({ id: id })
        expect(w.id).toBe(id)
    })

    test("Expect weather.current() to return object and success", () => {
        const w = new Weather();
        const resp = {
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
        axios.get.mockResolvedValue(resp)
        w.get_current_weather()
            .then(weather => {
                console.log("Get current Weather Result: \n" + weather.name)
                expect(typeof weather).toBe("object")
                expect(weather).not.toBe(undefined)
                expect(weather.main.temp).toBe(274.25)
            })
            .catch(err => {
                console.log(err)
                expect("false").toEqual("true")
            });
        expect()
    })

    // test("Expect Weather's current weather object to be set", () => {
    //     const w = new Weather()

    //     const resp = {
    //         coord: { lon: -76.84, lat: 39.24 },
    //         weather: [
    //             {
    //                 id: 802,
    //                 main: 'Clouds',
    //                 description: 'scattered clouds',
    //                 icon: '03n'
    //             }
    //         ],
    //         base: 'stations',
    //         main: {
    //             temp: 274.25,
    //             feels_like: 270.82,
    //             temp_min: 270.93,
    //             temp_max: 277.59,
    //             pressure: 1021,
    //             humidity: 69
    //         },
    //         visibility: 16093,
    //         wind: { speed: 1.33, deg: 71 },
    //         clouds: { all: 40 },
    //         dt: 1577240162,
    //         sys: {
    //             type: 1,
    //             id: 3531,
    //             country: 'US',
    //             sunrise: 1577190281,
    //             sunset: 1577224133
    //         },
    //         id: 4352053,
    //         name: 'Russia',
    //         cod: 200
    //     }
    //     axios.get.mockImplementation(() => Promise.resolve(resp))
    //     w.get_current_weather()
    //         .then((response) => w.set_current_weather(response))
    //         .then(() => {
    //             console.log(w.current_weather.city_name)
    //             expect(typeof w.current_weather).toBe("object")
    //             expect(typeof w.current_weather.desciption).toBe("String")
    //             expect(typeof w.current_weather.short_description).toBe("String")
    //             expect(typeof w.current_weather.icon).toBe("String")
    //             expect(typeof w.current_weather.icon_url).toBe("String")
    //             expect(typeof w.current_weather.city_name).toBe("String")
    //             expect(typeof w.current_weather.country).toBe("String")
    //         })

    // })
})