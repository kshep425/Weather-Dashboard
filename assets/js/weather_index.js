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
 * @param {string} q_type type can be 'forecast' or 'weather'
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
        localStorage.setItem("forecast", JSON.stringify(response));
    }).done(function (response){
        var weather = get_five_day_forecast();
    }).fail(function(err){
        console.log(err);
        alert("An error occured");
    });
}

function get_five_day_forecast(){
    console.log("Start adding items to cards");
    result = JSON.parse(localStorage.getItem("forecast"));
    console.log(result);
    num = [4,12,20,28,36]
    num.forEach((n,i) => {
        card_details = result.list[n]
        weather = {
            temperature: card_details.main.temp,
            date_time: card_details.dt_txt,
            wind: card_details.wind,
            humidity: card_details.main.humidity,
            short_desc: card_details.weather[0].main,
            icon: card_details.weather[0].icon
        }
        addToCard(weather, i + 1)
    });

}

// add card text to elements based on query results
function addToCard(weather_info, day){
    console.log(weather_info)
    d = ".day_" + day
    console.log(d)
    $(".card-header" + d).text(weather_info.date_time);
    $(".weather_card_image" + d).attr("src", weather_api.iconUri + weather_info.icon + ".png");
    $(".short_desc" + d).text(weather_info.short_desc);
    $(".temperature" + d).text(Math.floor(weather_info.temperature) + short_unit);
    $(".humidity" + d).text(weather_info.humidity + "% Humidity");
    $(".wind" + d).text(weather_info.wind.speed  + " " + wind_speed_unit);
    $(".wind_icon" + d).css({"transform": "rotate(" + weather_info.wind.deg + "deg)"});

}