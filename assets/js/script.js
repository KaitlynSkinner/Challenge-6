// Variables for Search
var weatherSearchEl = $("#weather-search");
var searchButtonEl = $("#search-btn");
// If searchButtonEl clicked searchOptionsEl display:none; class remove!!
var searchOptionsEl = $("#search-options");

// Variables for Weather
// If searchButtonEl clicked 5 Day Forecast display:none; class remove!!
var cityDateEmojiEl = $("#city-date-emoji");
var tempEl = $("#weather-temp");
var windEl = $("#weather-wind");
var uvEl = $("#weather-uv");
var humidityEl = $("#weather-hum");

// Search City Function
$(searchButtonEl).on("click", function(e) {
    e.preventDefault();

    // Set localStorage to textarea id's and trimmed value of searched city names
    var cities = {
        names: names.val().trim(),
    };

    // Local Storage for set/get user's calendar events
    localStorage.setItem('citied', JSON.stringify(calEvent));
})

// Weather API Fetch
//API URL + cityName user will search + API Key
var longUrl = "https://api.openweathermap.org/data/2.5/forecast?q=${cityName},us&modexml&appid=5c6ee5b59356b7a8caec73530ae850dd"
var url = "https://api.openweathermap.org/data/2.5/forecast?q=Austin,us&modexml&appid=5c6ee5b59356b7a8caec73530ae850dd"
var cities = {
    names: names,
    date: date,
    temp: temp,
    wind: wind,
    humidity: humidity,
    uvIndex: uvIndex
};

// Fetch Data
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Data required for Weather Dashboard App
        var pullingData = data.split();
        var names = pullingData.city;
        var date = pullingData.list.dt_txt;
        var temp = pullingData.list.main.temp;
        var wind = pullingData.list.wind.speed + "MPH";
        var humidtiy = pullingData.list.main.humidity;
        var uvIndex = pullingData.list.main.temp_kf;
        var compareDate = 0;

        // For loop to loop through multiple cities data
        for (var i = 0; data.length; i++) {
            console.log(data[i]);
            
        }
    });


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city