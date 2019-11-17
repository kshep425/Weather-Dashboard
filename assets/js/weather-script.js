// declare variables
let query_url, default_data, data,
coord_lon, coord_lat,
weather_description, weather_icon, weather_short_description,
temp, humidity, 
wind_speed, wind_deg,
city_name, city_id,
date_time,
opencagedata_url, opencagedata_api_key,
weather_api_query_url, weather_api_icon_query_url,
today_tab, f_3_day_tab, f_5_day_tab,
farenheit, wind_dir_icon,
unit, short_unit,
ci_city, ci_state, ci_icon_small, ci_temp, ci_unit;

// set wind_dir_icon to north pointing double arrow
wind_dir_icon = "⇑"

$(document).ready(function(){
    // set variables
    today_tab = $("#today");
    f_3_day_tab = $("#f3_day");
    f_5_day_tab = $("#f5_day");
    weather_api_query_url = "https://api.openweathermap.org/data/2.5/weather";
    app_id = "f16525c1c6fcefe387680a252092b626"
    current_id = "4352053"
    default_data = {
        "appid": app_id,
        "id": "4352053",
    }
    data = {
        "appid": app_id,
        "id": current_id,
    }

    opencagedata_url = "https://api.opencagedata.com/geocode/v1/json?key=5b3d9ef1aa714124b8cefb0850ad8ec8&pretty=1&no_annotations=1&q=" + coord_lat + "%2C+" + coord_lon;


    // Click functions
    // -- display forecast tabs
    $("#forecast_summaries a").on("click", function(e){
        e.preventDefault();
        console.log("Display " + $(this).text())
        $(this).tab("show");
    })

    // -- set C or F units based on toggle button
    $("label").click(function(event){
        console.log("unit toggle clicked")
        console.log(event.target)
        set_units();
        // unit = $(this).attr("unit")
        // short_unit = $(this).attr("short_unit")
        // wind_speed_unit = $(this).attr("wind_speed_unit")

        // data["units"] = unit
        // data["id"] = current_id

        get_weather_response_today(weather_api_query_url, data)
    })

    // -- Search for city in searh bar
    $("#search_form").submit(function(event){
        event.preventDefault()
        search_text = $("#search_text").val()
        console.log("Search for city: " + search_text)
        delete data["id"]
        data["q"] = search_text
    })

    // Functions
    // -- display city information
    function display_city_information(){
        $("#ci_city").text(city_name);
        $("#ci_icon_small").attr("src", weather_api_icon_query_url);
        $("#ci_temp").text(temp)
        $("#ci_unit").text(short_unit)
        console.log("Display city info: " + $("#ci_city").text() + " " + $("#ci_temp").text() + " " + $("#ci_unit").text())
    }

    // -- display today weather forecast
    function display_today_tab(){
        // query for Columbia default URL
        console.log(temp)
        today_tab.empty();
        //date_time_row = $("<div>").addClass("row text-left")
        let date_time_h5 = $("<h5>").text(moment.unix(date_time).format("hh:mm A MM/DD/YYYY"));

        // main temp row - contains large image, temp with short unit, and short description
        let weather_image_large = $("<img>").attr("src", weather_api_icon_query_url).addClass("icon_large")

        let main_temp_row = $("<h1>").text(temp + short_unit + " " + weather_short_description);
        main_temp_row.addClass("d-inline")

        // weather_detail_row
        let weather_detail_row = $("<h6>").addClass("row")
        
        // -- wind_details:  Add wind speed and rotate the double arrow based on degrees, place in same column.
        let wind_details = $("<h6>")
        wind_details.attr("id", "wind_details")
        wind_details.addClass("col-3 text-center")
        wind_details.attr("style", "position:relative") // add position relative so the "⇑" can be positioned relative to it.
        console.log("87: " + wind_speed_unit)
        wind_details.text(wind_speed + " " + wind_speed_unit)
        console.log("wind_direction: " + wind_deg + " deg" )
        wind_icon_style = {
            "transform": "rotate(" + wind_deg + "deg)",
            "position": "absolute"          // add position absolute so it positioned relative to the wind_details
        }
        let wind_details_icon = $("<span>")     // span allows the text to stay on the same line
        wind_details_icon.addClass("ml-3")  // ml-3 adds some separation between the wind speed and the "⇑"
        wind_details_icon.attr("id", "wind_icon")
        wind_details_icon.text(wind_dir_icon)
        wind_details_icon.css(wind_icon_style)

        // -- humidity details
        let humidity_details = $("<h6>")
        humidity_details.attr("id", "humidity_details")
        humidity_details.addClass("col-3 text-center")
        humidity_details.text(humidity + "% Humidity")

        wind_details.append(wind_details_icon);
        weather_detail_row.append(wind_details);
        weather_detail_row.append(humidity_details);
        today_tab.append(date_time_h5);
        today_tab.append(weather_image_large);
        today_tab.append(main_temp_row);
        today_tab.append(weather_detail_row);
    }

    // -- get today weather forecast
    function get_weather_response_today(url, q_data){
        console.log("Get weather response data for today")
        // set units
        set_units()
        console.log("data: " + JSON.stringify(q_data))

        //execute ajax call for weather response
        $.ajax({
            url: url,
            data: q_data,
            method: "GET",
            sucess: function(){
                display_city_information()
                display_today_tab()
            }
        }).then(function(response) {
            console.log(response);
            // from result store:
            // -- weather_short_description, weather_description, weather_icon,
            weather_description = response.weather[0].description
            weather_icon = response.weather[0].icon + ".png"
            weather_api_icon_query_url = "http://openweathermap.org/img/wn/" + weather_icon
            weather_short_description = response.weather[0].main
            // -- main_temp, main_humidity
            temp = Math.floor(response.main.temp);
            humidity = response.main.humidity;

            // -- wind_speed: comes in as meters per second.  Change to km per hour
            if (q_data["units"] === "metric"){

                wind_speed = parseFloat(response.wind.speed) * 3.6;
                wind_speed = wind_speed.toFixed(2); // only have 2 digits in float
            } else{
                wind_speed = response.wind.speed;
            }
            wind_deg = response.wind.deg;
            
            // -- date_time
            date_time = response.dt;

            // -- location info
            city_name = response.name;
            city_id = response.id;
            coord_lon = response.coord.lat;
            coord_lat = response.coord.lon;

        }).fail(function(response){
            console.log(response);
            alert("Query Failed");
        })
    }

    // -- set C/F and windspeed units
    function set_units(){
        unit = $(".active").attr("unit")
        short_unit = $(".active").attr("short_unit")
        wind_speed_unit = $(".active").attr("wind_speed_unit")
        default_data["units"] = unit;
        data["units"] = unit;
        console.log("Set units to : " + unit )
    }

    // display today's weather with default city and units
    get_weather_response_today(weather_api_query_url, default_data)
    
}) // document.ready