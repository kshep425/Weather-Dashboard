/**
 * Create the 5 day forecast cards for media screens
 */
$(document).ready(function () {
    execute_forecast_query()

    let days = ["day_1", "day_2", "day_3", "day_4", "day_5", "day_6", "day_7", "day_8", "day_9", "day_10"];
    let i = 0;
    days.forEach((day, i) => {
        console.log(i + ".  Create card for: " + day)
        const weather_card = divOf(
            "card my-3 bg-light weather_card "
        )

        const weather_card_header = divOf("card-header " + day)
        const weather_card_body = divOf(
            "card-body weather_card_body"
        )

        const weather_card_image = elementOf("img", "card-image-top weather_card_image " + day)
        weather_card_image.attr("src", "http://openweathermap.org/img/wn/01n.png")

        weather_card_wind = elementOf("h6", "wind ");
        weather_card_wind_speed = elementOf("span", "wind " + day);
        weather_card_wind_icon = elementOf("span", "ml-3 wind_icon " + day);
        weather_card_wind_icon.text(wind_dir_icon)

        //appendAll($("#f5_day"), weather_card)

        appendAll(weather_card,
            weather_card_header,
            weather_card_image,
            weather_card_body
        )
        appendAll(weather_card_body,
            elementOf("h1", "card-title short_desc " + day),
            elementOf("h1", "card-title temperature " + day),
            elementOf("h6", "humidity " + day),
            weather_card_wind,
            elementOf("h6", "uv " + day)
        )

        appendAll(weather_card_wind, weather_card_wind_speed, weather_card_wind_icon)
        // create five day forecast cards
        //if (i > 5){
        var $elem = $(weather_card).data("arr", [1]),
            $clone1 = $elem.clone(true)
                // Deep copy to prevent data sharing
                .data("arr", $.extend([], $elem.data("arr")));
        $clone1.appendTo("#all_forecasts");
        console.log($("#all_forecasts"))
        //}

        // create 3 day forecast cards
        if (i >= 5 && i < 8) {
            console.log(i)
            // Original element with attached data
            var $elem2 = $(weather_card).data("arr", [1]),
                $clone2 = $elem2.clone(true)
                    // Deep copy to prevent data sharing
                    .data("arr", $.extend([], $elem.data("arr")));
            $clone2.appendTo("#f3_day")

            console.log($("#f3_day"))
        }

        // create five day forecast cards
        if (i >= 5) {
            var $elem = $(weather_card).data("arr", [1]),
                $clone1 = $elem.clone(true)
                    // Deep copy to prevent data sharing
                    .data("arr", $.extend([], $elem.data("arr")));
            $clone1.appendTo("#f5_day");
            console.log($("#f5_day"))
        }

        // create today forecast cards
        if (i <= 5) {
            // if (i === 1){
            console.log(i)
            console.log($(weather_card).data())
            // Original element with attached data
            var $elem3 = $(weather_card).data("arr", [1]),
                $clone3 = $elem3.clone(true)
                    // Deep copy to prevent data sharing
                    .data("arr", $.extend([], $elem.data("arr")));
            $clone3.appendTo("#today")

            console.log($("#today"))
        }

    });

    // get query results
    $("#forecast_summaries").click(function (event) {
        event.preventDefault();
        execute_forecast_query();
        execute_uvi_query("uvi");
        execute_uvi_query("uvi/forecast");
    })

    $("label").click(function (event) {
        event.preventDefault()
        execute_forecast_query()
        execute_uvi_query("uvi");
        execute_uvi_query("uvi/forecast");
    })

    function execute_forecast_query() {

        console.log("Search for 5 day forecast")

        const five_day_forecast = "forecast";
        delete query_data["q"]
        query_data["id"] = current_id;
        query_data["units"] = unit;

        weather_query
            (five_day_forecast, query_data)
    }

    function execute_uvi_query(type) {
        delete query_data["q"];
        delete query_data["id"];
        delete query_data["units"];

        query_data["lat"] = coord_lat;
        query_data["lon"] = coord_lon;
        weather_query
            (type, query_data)
    }

}); // document.ready