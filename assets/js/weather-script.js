let query_url, default_data, coord_lon, coord_lat, 
weather_description, weather_icon, weather_short_description,
temp, humidity, 
wind_speed, wind_deg,
city_name, city_id,
date_time,
opencagedata_url, opencagedata_api_key,
weather_api_query_url, weather_api_icon_query_url,
today_tab, f_3_day_tab, f_5_day_tab,
farenheit, wind_dir_icon;
wind_dir_icon = "⇑"

// Move between tabs
$(document).ready(function(){

    today_tab = $("#today");
    f_3_day_tab = $("#f3_day");
    f_5_day_tab = $("#f5_day");

    farenheit = "imperial"
    celcius = "metric"
    weather_api_query_url = "https://api.openweathermap.org/data/2.5/weather";
    default_data = {
        "appid": "f16525c1c6fcefe387680a252092b626",
        "units": farenheit,
        "id": "4352053",
    }
    

    opencagedata_url = "https://api.opencagedata.com/geocode/v1/json?key=5b3d9ef1aa714124b8cefb0850ad8ec8&pretty=1&no_annotations=1&q=" + coord_lat + "%2C+" + coord_lon;

    $("#forecast_summaries a").on("click", function(e){

        e.preventDefault();
        console.log(e)
        console.log(this)
        $(this).tab("show");
    })

    


    //display today weather for Columbia, MD
    function display_today_tab(){
        // query for Columbia default URL
        console.log(temp)
        today_tab.empty();
        //date_time_row = $("<div>").addClass("row text-left")
        let date_time_h5 = $("<h5>").text(moment.unix(date_time).format("hh:mm A MM/DD/YYYY"));

        // main temp row - contains large image, temp with short unit, and short description
        let weather_image_large = $("<img>").attr("src", weather_api_icon_query_url).addClass("icon_large")
        let main_temp_row = $("<h1>").text(Math.floor(temp) + $("#c_f_toggle").attr("short_unit") + " " + weather_short_description);
        main_temp_row.addClass("d-inline")

        // weather_detail_row
        let weather_detail_row = $("<h6>").addClass("row")
        
        // -- wind_details:  Add wind speed and rotate the double arrow based on degrees, place in same column.
        let wind_details = $("<h6>")
        wind_details.attr("id", "wind_details")
        wind_details.addClass("col-3 text-center")
        wind_details.attr("style", "position:relative") // add position relative so the "⇑" can be positioned relative to it.
        wind_details.text(wind_speed + " MPH")
        
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


    function get_weather_response_today(url, data){
        
        //execute ajax call for weather response
        $.ajax({
            url: url,
            data: data,
            method: "GET",
        }).then(function(response) {
            console.log(response);
            // from result store:
            // -- weather_short_description, weather_description, weather_icon,
            weather_description = response.weather[0].description
            weather_icon = response.weather[0].icon + ".png"
            weather_api_icon_query_url = "http://openweathermap.org/img/wn/" + weather_icon
            weather_short_description = response.weather[0].main
            // -- main_temp, main_humidity
            temp = response.main.temp;
            humidity = response.main.humidity;

            // -- wind_speed, wind_deg,
            wind_speed = response.wind.speed;
            wind_deg = response.wind.deg;
            
            // -- date_time
            date_time = response.dt;

            // -- location info
            city_name = response.name;
            city_id = response.id;
            coord_lon = response.coord.lat;
            coord_lat = response.coord.lon;
            
            display_today_tab()
            
            

        }).fail(function(response){
            console.log(response);
            alert("Query Failed");
        })
    }


        get_weather_response_today(weather_api_query_url, default_data)
    

}) // document.ready