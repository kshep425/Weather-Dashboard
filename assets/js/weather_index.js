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
    }).then(function (response){
        display_five_day_forecast();
    }).fail(function(err){
        console.log(err);
        alert("An error occured");
    });
}

function display_five_day_forecast(){
    console.log("Start adding items to cards");
    result = JSON.parse(localStorage.getItem("forecast"));
    console.log(result);

    
}