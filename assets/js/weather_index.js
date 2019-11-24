/**
 * Creates a JQuery div element and applies the given style.
 * @param {string} tag
 * @param {string} className
 * @param {*} style
 * @param {function} callback
 * @returns the created element.
 */
const elementOf = (tag, className, style, callback) => {
    const e = $(`<${tag}>`).addClass(className);
    if (style) e.css(style);
    if (callback) callback(e);
    return e;
};

/**
 * Creates a JQuery div element and applies the given style.
 * @param {string} tag
 * @param {*} style
 * @param {function} callback
 * @returns the created element.
 */
const divOf = (className, style, callback) =>
    elementOf("div", className, style, callback);

const appendAll = (parent, ...children) => {
    children.forEach(c => parent.append(c));
    return parent;
};

/**
 * Creates a Search List Item with id and search text.
 * @param {string} search_id
 * @param {string} search_formatted
 * @returns the created element.
 */
const search_list_item = (search_id, search_formatted) => {
    let sli = elementOf("a", "list-group-item list-group-item-action search_list_item");
    sli.attr("id", search_id)
    sli.text(search_formatted);
    sli.attr("href", "#");
    return sli;
}

/**
 * Create Weather Api
 *
 */
const weather_api = {
    key: "0cd120b5a3fb267b2e15e0ccf0932a56",
    uri: "https://api.openweathermap.org/data/2.5",
    iconUri: "http://openweathermap.org/img/wn/"
};

const weather_query_url = type =>
    `${weather_api.uri}/${type}`;

let query_data = {
    APPID: "0cd120b5a3fb267b2e15e0ccf0932a56"
}

/**
 * Creates a Weather API Query and returns result
 * @param {string} q_type type can be 'forecast' or 'weather' or 'uvi'
 * @param {string} q_data this is the query data object
 * @returns the query response
 */
const weather_query = (q_type, q_data) => {
    $.ajax({
        url: `${weather_query_url(q_type)}`,
        data: q_data,
        method: "GET"
        //crossDomain: true

    }).then(function (response) {
        console.log(response);
        localStorage.setItem(q_type, JSON.stringify(response));
    }).done(function () {
        if (q_type === "forecast") {
            get_five_day_forecast();
        }
        if (q_type === "uvi") {
            get_uvi_data()
        }
        if (q_type === "uvi\/forecast") {
            get_uvi_forecast()
        }
    }).fail(function (err) {
        console.log(err);
        alert("An error occured");
    });
}

function get_five_day_forecast() {
    console.log("Parse the five day forecast response");
    let result = JSON.parse(localStorage.getItem("forecast"));
    num = [0, 1, 2, 3, 4, 5, 12, 20, 28, 36]
    num.forEach((n, i) => {
        card_details = result.list[n]
        weather = {
            temperature: card_details.main.temp,
            date_time: card_details.dt_txt,
            wind: card_details.wind,
            humidity: card_details.main.humidity,
            short_desc: card_details.weather[0].main,
            icon: card_details.weather[0].icon
        }
        addToCard(weather, i + 1);
    });

}

function get_uvi_data() {
    let result = JSON.parse(localStorage.getItem("uvi"));
    console.log("1.  Add uvi for: day_1")
    if (result === null){
        delete query_data["q"];
        delete query_data["id"];
        delete query_data["units"];

        query_data["lat"] = coord_lat;
        query_data["lon"] = coord_lon;
        weather_query
            ("uvi", query_data)
        return;
    }
    uvi = result.value
    $(".uv.day_1").text(uvi + " UV Index")
    $(".uv.day_2").text(uvi + " UV Index")
    $(".uv.day_3").text(uvi + " UV Index")
    $(".uv.day_4").text(uvi + " UV Index")
    $(".uv.day_5").text(uvi + " UV Index")
    $(".uv.day_6").text(uvi + " UV Index")
}

function get_uvi_forecast() {
    let result = JSON.parse(localStorage.getItem("uvi/forecast"));
    let days = ["day_4", "day_7", "day_8", "day_9", "day_10"];
    let i = 6;
    days.forEach((day, i) => {
        console.log(i + ".  Add uvi for: " + day)
        uvi = result[i].value
        $(".uv." + day).text(uvi + " UV Index")
        console.log($(".uv." + day))
    });
}

// add card text to elements based on query results
function addToCard(weather_info, day) {
    console.log("Add weather info to card")
    d = ".day_" + day
    $(".card-header" + d).text(weather_info.date_time);
    $(".weather_card_image" + d).attr("src", weather_api.iconUri + weather_info.icon + ".png");
    $(".short_desc" + d).text(weather_info.short_desc);
    $(".temperature" + d).text(Math.floor(weather_info.temperature) + short_unit);
    $(".humidity" + d).text(weather_info.humidity + "% Humidity");
    $(".wind" + d).text(weather_info.wind.speed + " " + wind_speed_unit);
    $(".wind_icon" + d).css({ "transform": "rotate(" + weather_info.wind.deg + "deg)" });
}