
const axios = require("axios")

class Weather {
    // data should contain query data
    constructor(data = {}) {
        //let use_default = data.id === "undefined" && data.search_term === "undefined"
        this.id = (data.id === undefined) ? "4352053" : data.id;
        this.search_term = data.q;
        this.appid = "f16525c1c6fcefe387680a252092b626"
        this.weather_api_query_url = "https://api.openweathermap.org/data/2.5/weather";
        if (this.search_term != undefined) {
            this.q_data = { q: this.search_term, APPID: this.appid }
            this.cw_url = `https://api.openweathermap.org/data/2.5/weather?q=${this.search_term}&APPID=${this.appid}`
        } else {
            this.cw_url = `https://api.openweathermap.org/data/2.5/weather?id=${this.id}&APPID=${this.appid}`
            this.q_data = { id: this.id, APPID: this.appid }
        }
        this.current_weather = {}
    }

    async set_current_weather(response) {
        console.log("---------- " + "Set Current Weather" + " -------")
        let w = this
        return await new Promise(function (resolve) {

            // weather info
            w.current_weather.description = response.weather[0].description
            w.current_weather.short_description = response.weather[0].main

            // temp
            w.current_weather.temp = Math.floor(response.main.temp)

            // humidity
            w.current_weather.humidity = response.main.humidity

            // wind
            w.current_weather.wind_speed = response.wind.speed
            w.current_weather.wind_deg = response.wind.deg

            // icon
            w.current_weather.icon = response.weather[0].icon + ".png"
            w.current_weather.icon_url = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"

            // location
            w.current_weather.city_name = response.name
            w.current_weather.city_id = response.id
            w.current_weather.coord_lon = response.coord.lon
            w.current_weather.coord_lat = response.coord.lat
            w.current_weather.country = response.sys.country

            // date
            w.current_weather.date_time = response.dt

            resolve(w.current_weather)
        })
    }

    async log_current_weather() {
        const w = this
        return await new Promise (function(resolve){
            console.log("---------- " + "Log Current Weather" + " -------")
            console.log(w.current_weather)
            resolve(w.current_weather)
        })
    }

    async get_current_weather() {
        let w = this
        // To make the function blocking we manually create a Promise.
        return await new Promise(function (resolve) {

            axios.get(w.cw_url)
                .then(function (response) {
                    // The data from the request is available in a .then block
                    // await w.set_current_weather(response)
                    // We return the result using resolve.
                    resolve(response.data);
                });

        });

    }


}

module.exports = Weather;

current = new Weather();
current.get_current_weather()
     .then((response) => current.set_current_weather(response))
     .then(() => current.log_current_weather());

current2 = new Weather({ id: 519188 });
current2.get_current_weather()
     .then((response) => current2.set_current_weather(response))
     .then(() => current2.log_current_weather());

current3 = new Weather({ q: "Paris" });
current3.get_current_weather()
    .then((response) => current3.set_current_weather(response))
    .then(() => current3.log_current_weather());
