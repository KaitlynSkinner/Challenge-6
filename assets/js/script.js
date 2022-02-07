// Variables for Search for a City Section Elements
var searchInputEl = $("#weather-search");
var searchButtonEl = $("#search-btn");
var searchOptionsEl = $("#search-options");
var searchHistoryEl = $("#search-history");

// Variable for history of searched cities (? used rather than writing out an if statement)
var searchedCities = JSON.parse(localStorage.getItem('searchHistory'))?JSON.parse(localStorage.getItem('searchHistory')):[];

// Variable for cities searched
var cityName = localStorage.getItem('recentCity');

// Fetch Weather API Information Function 
function fetchWeatherInfo() {
    // Variable for API Key
    var API_Key = "5c6ee5b59356b7a8caec73530ae850dd";

    // Fetch API Data for Longitude and Latitude
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + API_Key)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Data required for Weather Dashboard App
            var lon = data.coord.lon;
            var lat = data.coord.lat;

            // Fetch API Data for 5 Day Forecast
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + API_Key)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    // Call created functions in fetch
                    currentForecast(data);
                    fiveDayForecast(data.daily);
                })
        });
};

// When searchButtonEl is clicked..
$(searchButtonEl).on("click", function(e) {
    e.preventDefault();

    // Set localStorage to textarea id's and trimmed value of searched cities
    var lastCitySearched = searchInputEl.val().trim();
    console.log(lastCitySearched);  

    cityName = lastCitySearched;

    // Push to localStorage if search history exists
    if (searchedCities.indexOf(lastCitySearched) === -1) {
        searchedCities.push(lastCitySearched);
        localStorage.setItem('searchHistory', JSON.stringify(searchedCities));
    
        // Call fetchWeatherInfo & searchHistoryButtons function
        fetchWeatherInfo();
        searchHistoryButtons();
    }
    console.log(searchedCities);

    // Local Storage for setting user's searched cities
    localStorage.setItem('recentCity', lastCitySearched);

});

// User search history function
var searchHistoryButtons = function(data) {
    //console.log(searchedCities);
    //console.log(cityName);

    // For loop for creating buttons and appending to the page under search area)
    for (var i = 0; i < cityName.length; i++) {
        var weatherSearch = $("<button>")
            .addClass("col btn btn-info btn-light btn-option")
            .text(cityName);
        $("#search-history").append(weatherSearch);
        break;
    }

    $(searchHistoryEl).on("click", function(e) {
        e.preventDefault();

        localStorage.getItem(searchedCities);
    })

};

// Write a function to present the current dates data
var currentForecast = function(data){
    console.log(data);

    // Variables for Weather in Current Day Forecast
    // Append date, icon, temperature, wind, and uv index to current forecast
    var currentDate = moment().format('M/D/YYYY');
        $("#current-date").append(cityName + " " + currentDate);
                        
    var icon = data.current.weather[0].icon;
    var url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        $("#current-icon").attr("src", url)
            $("#current-icon").append(icon);
                        
    var temp = data.current.temp + " °F";
        $("#current-temp").append(temp);
                    
    var wind = data.current.wind_speed + " MPH";
        $("#current-wind").append(wind);

    var uvIndex = data.current.uvi;
        $("#uv-index").append(uvIndex);
                    
            if (uvIndex > 0) {
                $("#uv-index").addClass("severe");
            } else if (uvIndex > 3) {
                $("#uv-index").addClass("moderate");
            } else {
                $("#uv-index").addClass("favourable")
            }
            //console.log("#current-date");
};

//5 Day Forecast function, using data from API as a parameter
var fiveDayForecast = function (data){
    
            // For loop to loop through multiple cities data
            for (var i = 1; i < 6; i++) {
                console.log(data[i]);

                // Variable for 5 Day Forecast Cards, clearing content before appending
                var weatherContainer = $("#container");
                // Clearing Contents on screen
                //weatherContainer.html("");

                // Create a card, append to card, and append card to page
                // Append to card dates, icons, temperatures, wind speeds, and humidity  
                var weatherCard = $("<div>")
                    .addClass("card row col-3");
                weatherContainer.append(weatherCard);

                var cardBodyDiv = $("<div>")
                    .addClass("card-body");
                weatherCard.append(cardBodyDiv);

                var dates = "<p>" + moment().add(4, "days").format('M/D/YYYY') + "</p>";
                cardBodyDiv.append(dates);

                // Variable for icon, and url - append to img src, append img to card
                var icon = data[i].weather[0].icon;
                var url = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                var image = $("<img>")
                    .attr("src", url)
                    .text(image);
                cardBodyDiv.append(image);

                // Append temperature, wind, humidity, and uv index to 5-day-forecast cards
                var temp = "<p>Temp: " + data[i].temp.day + " °F</p>";
                cardBodyDiv.append(temp);

                var wind = "<p>Wind: " + data[i].wind_speed + " MPH</p>";
                cardBodyDiv.append(wind);

                var humidity = "<p>Humidity: " + data[i].humidity + "%</p>";
                cardBodyDiv.append(humidity);

                console.log(i);
            }
};
// Call fetchWeatherInfo function
fetchWeatherInfo();