/**
 * Create the 5 day forecast cards for media screens
 */
$(document).ready(function(){
    let days = ["day_1", "day_2","day_3","day_4","day_5"];
    let i = 0;
    days.forEach((day, i) => {
        console.log(i + ".  Create card for: " + day)
        const weather_card = divOf(
            "card my-3 weather_card "
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

        var $elem = $( weather_card ).data( "arr", [ 1 ] ),
            $clone1 = $elem.clone( true )
            // Deep copy to prevent data sharing
            .data( "arr", $.extend( [], $elem.data( "arr" ) ) );
        $clone1.appendTo("#f5_day");
        console.log($("#f5_day"))

        if (i < 3){
            console.log(i)
            // Original element with attached data
            var $elem2 = $( weather_card ).data( "arr", [ 1 ] ),
                $clone2 = $elem2.clone( true )
                // Deep copy to prevent data sharing
                .data( "arr", $.extend( [], $elem.data( "arr" ) ) );
            $clone2.appendTo("#f3_day")

            console.log($("#f3_day"))
        }
    });

    // get query results
    $("#forecast_summaries").click(function(event){
        event.preventDefault()
        execute_forecast_query(event)
    })

    $("label").click(function(event){
        event.preventDefault()
        execute_forecast_query(event)
    })

    function execute_forecast_query(event) {
        event.preventDefault()
        console.log("Search for 5 day forecast")

        const five_day_forecast = "forecast";
        delete query_data["q"]
        query_data["id"] = current_id;
        query_data["units"] = unit;

        weather_query
        (five_day_forecast, query_data)
    }
}); // document.ready