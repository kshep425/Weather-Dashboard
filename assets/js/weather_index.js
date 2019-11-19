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
  key: "f16525c1c6fcefe387680a252092b626",
  uri: "https://api.openweathermap.org/data/2.5",
  iconUri: "http://openweathermap.org/img/wn/"
};

const weather_query_url = type =>
  `${weather_api.uri}/${type}`;

let query_data = {
    "id": weather_api.key
}

const weather_query = (type, q_data) =>
  $.ajax({
    type: "GET",
    url: `${query_url(type)}`,
    data: `${q_data}`,
    crossDomain: true
  }).then(r => {
    console.log("request", r);
    return r;
  });
