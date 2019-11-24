// declare variables
let query_url, default_data, data,
    coord_lon, coord_lat,
    weather_description, weather_icon, weather_short_description,
    temp, humidity, uvi,
    wind_speed, wind_deg,
    city_name, city_id, state,
    date_time,
    opencagedata_url, opencagedata_api_key,
    weather_api_query_url, weather_api_icon_query_url,
    today_tab, f_3_day_tab, f_5_day_tab,
    farenheit, wind_dir_icon,
    unit, short_unit,
    ci_city, ci_state, ci_icon_small, ci_temp, ci_unit,
    recent_searches, popular_searches;

// set wind_dir_icon to north pointing double arrow
wind_dir_icon = "⇑"

$(document).ready(function () {
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

    // Click functions
    // -- display forecast tabs
    $("#forecast_summaries a").on("click", function (event) {
        event.preventDefault();
        console.log("Display " + $(this).text())
        $(this).tab("show");
    })

    // -- set C or F units based on toggle button
    $("label").click(function (event) {
        event.preventDefault()
        console.log("C-F unit toggle clicked")
        unit = $(this).attr("unit")
        short_unit = $(this).attr("short_unit")
        wind_speed_unit = $(this).attr("wind_speed_unit")

        data["units"] = unit
        // data["id"] = current_id
        console.log("Set units to : " + unit)
        get_weather_response_today(weather_api_query_url, data)
    })

    // -- Open search bar when search is selected
    $("input#search_text").focus(function (event) {
        event.preventDefault();
        console.log("Open Recent Searches List");
        $("#search_history").removeClass("d-none");
    });

    // -- Search for city
    $("#search_form").submit(function (event) {
        event.preventDefault()
        search_text = $("#search_text").val()
        console.log("Search for city: " + search_text)
        delete data["id"]
        data["q"] = search_text
        $("#search_history").addClass("d-none")

        get_weather_response_today(weather_api_query_url, data)
    });

    // -- Search by id
    $("#search_history").click(function (event) {
        event.preventDefault();
        if ($(event.target).attr("class").includes("search_list_item")) {
            sli_id = $(event.target).attr("id") // search list item (sli) id
            console.log("Search by id: " + sli_id)
            data["id"] = sli_id;
            delete data["q"];
            get_weather_response_today(weather_api_query_url, data)
        }
    })

    // Functions
    // -- display city information
    function display_city_information() {
        $("#ci_city").text(city_name);
        $("#ci_state").text(state);
        $("#ci_country").text(country);
        $("#ci_icon_small").attr("src", weather_api_icon_query_url);
        $("#ci_temp").text(temp);
        $("#ci_unit").text(short_unit);
        $("#humidity").text(humidity);
        $("#wind_speed").text(wind_speed);
        $("#wind_unit").text(wind_speed_unit);
        $("#wind_icon2").text(wind_dir_icon)
        $("#uv_index").text(uvi)
        display_complete("Finished displaying city info: " + $("#ci_city").text() + " " + $("#ci_temp").text() + " " + $("#ci_unit").text())
    }

    // -- get today weather forecast
    function get_weather_response_today(url, q_data) {
        console.log("Get weather response data for today")
        console.log("data: " + JSON.stringify(q_data))

        //execute ajax call for weather response
        $.ajax({
            url: url,
            data: q_data,
            method: "GET",
        }).then(function (response) {
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
            if (q_data["units"] === "metric") {

                wind_speed = parseFloat(response.wind.speed) * 3.6;
                wind_speed = wind_speed.toFixed(2); // only have 2 digits in float
            } else {
                wind_speed = response.wind.speed;
            }
            wind_deg = response.wind.deg;

            // -- date_time
            date_time = response.dt;

            // -- location info
            city_name = response.name;
            city_id = response.id;
            coord_lon = response.coord.lon;
            coord_lat = response.coord.lat;
            country = response.sys.country;

            //current_id
            current_id = response.id;
            data["id"] = current_id
        }).then(function () {
            state = get_state(coord_lat, coord_lon);
        }).then(function () {
            get_uvi_data();
            display_complete("Finished getting response");
        }).fail(function (response) {
            console.log(response);
            alert("Query Failed");
        })
    }

    // -- set C/F and windspeed units
    function set_units() {
        unit = $(".active").attr("unit")
        short_unit = $(".active").attr("short_unit")
        wind_speed_unit = $(".active").attr("wind_speed_unit")
        default_data["units"] = unit;
        data["units"] = unit;
        console.log("Set units to : " + unit)
        display_complete("Finished Setting Units")
    }

    function get_state(lat, long) {
        console.log("Get state based on lat: " + lat + "& long: " + long + " coordinates")
        opencagedata_url = "https://api.opencagedata.com/geocode/v1/json?key=5b3d9ef1aa714124b8cefb0850ad8ec8&pretty=1&no_annotations=1&q=" + lat + "%2C+" + long;
        $.ajax({
            url: opencagedata_url,
            method: "GET",
        }).then(function (response) {
            state = response.results[0].components.state;
            console.log("State: " + state);
            return state;
        }).then(function (response) {
            display_complete("Finished Getting State")
        }).then(function (response) {
            display_city_information()
        }).then(function (response) {
            add_to_searches();

        }).fail(function (response) {
            console.log(response)
            alert("Query Failed");
        });

    }

    function add_to_searches() {
        recent_searches = localStorage.getItem("recent_searches");
        // Add to local storage
        if (recent_searches === null) {
            recent_searches = {}
        } else {
            recent_searches = JSON.parse(recent_searches)
            Object.keys(recent_searches).forEach(key => {
                let recent_search_list_item = $("<a>");
                recent_search_list_item.attr("id", key);
                recent_search_list_item.attr("href", "#")
                recent_search_list_item.addClass("list-group-item list-group-item-action search_list_item");
                recent_search_list_item.text(recent_searches[key].formatted);
                $("#recent_list_header").after(recent_search_list_item)
            });
        };

        let formatted = city_name + ", " + state + " " + country
        if (recent_searches[current_id] === undefined) {
            recent_searches[current_id] = { count: 1, formatted: formatted }
        } else {
            console.log("searched before")
            if ($(".search_list_item:first").text() != formatted) {
                count = parseInt(recent_searches[current_id].count)
                recent_searches[current_id].count = count + 1;
            }
        }
        localStorage.setItem("recent_searches", JSON.stringify(recent_searches))

        // Add to recent searches list display
        if ($(".search_list_item:first").text() != formatted) {

            let recent_search_list_item = $("<a>");
            recent_search_list_item.attr("id", current_id);
            recent_search_list_item.attr("href", "#")
            recent_search_list_item.addClass("list-group-item list-group-item-action search_list_item");
            recent_search_list_item.text(formatted);
            $("#recent_list_header").after(recent_search_list_item)
            console.log(recent_searches)
        }

        display_complete("Finished Adding to Searches")
    }

    function add_popular_searches() {
        // Clear popular searches

        // add top 3 recent searches
        // -- get recent searches, sort by count, take top 3

        // add New york, Los Angeles, and Paris by default
        const ny = search_list_item("5128638", "New York, NY USA")
        const la = search_list_item("5368361", "Los Angeles, CA USA")
        const london = search_list_item("2643743", "London, England GB")

        appendAll($("#popular_searches_list"), ny, la, london)

    }

    function display_complete(msg) {
        console.log(msg)
    }

    //set_units
    set_units()

    // display today's weather with default city and units
    get_weather_response_today(weather_api_query_url, default_data)

    // add popular searches
    add_popular_searches();

}) // document.ready