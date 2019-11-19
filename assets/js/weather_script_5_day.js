/**
 * Create the 5 day forecast cards for media screens
 */
$(document).ready(function(){
    let days = ["day_1", "day_2","day_3","day_4","day_5"];
    let i = 0;
    days.forEach((day, i) => {
        console.log(i + ".  Create card for: " + day)
        const weather_card = divOf(
            "card d-block my-3 " + day, 
            {"border": "1px red solid", "background-color": "yellow"},
        )

        const weather_card_body = divOf(
            "card-body"
        )

        const weather_card_image = elementOf("img", "card-image-top mx-auto weather_card_image " + day)
        weather_card_image.attr("src", "http://openweathermap.org/img/wn/01n.png")

        appendAll($("#f5_day"), weather_card)
        appendAll(weather_card, 
            divOf("card-header", day),
            weather_card_image,
            weather_card_body
        )
        appendAll(weather_card_body,
            elementOf("h1", "card-title short_desc"),
            elementOf("h6", "humidity"),
            elementOf("h6", "wind"),
            elementOf("h6", "uv")
        )

    });



    // get query results
    $("#forecast_summaries").click(function(event) {
        event.preventDefault()
        const five_day_forecast = "forecast";
        delete query_data["q"]
        query_data["id"] = current_id;
        query_data["units"] = unit;

        console.log("Search for 5 day forecast")
        console.log(`${weather_query_url(five_day_forecast)}`)
        console.log(query_data)
        
        weather_query
        (five_day_forecast, query_data)        
    })

    

    // add card text to elements based on query results
    
}); // document.ready