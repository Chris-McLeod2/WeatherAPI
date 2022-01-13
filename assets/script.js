var apikey ="ZhqV2HJbVaGToPrjP6TkMoT7TzT9XNxO";
var cityFormEl = document.getElementById("citySearch")
var cityEl = document.getElementById("city")
var cityContainerEl = document.getElementById("cityContainer")
var searchHistoryEl = document.getElementById("searchHistory")
var currentCityEl = document.getElementById("currentCity")
var currentTempEl = document.getElementById("Temp")
var currentWindEl = document.getElementById("Wind")
var currentHumidityEl = document.getElementById("Humidity")
var date = document.getElementById("date")
var weatherPicture = document.getElementById("weatherpicture")
var temperature = document.getElementById("temperature")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")

var cities = []
console.log("test")
var formSubmitHandler = function (event) {
    event.preventDefault();
    
    var cityName = cityEl
        .value
        .trim() 

    if (cityName) {
        getCoord(cityName)
        cityEl.value = ""
        
    }}


    var Coords = function(city) {
        var apiURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1b50cbb3b2c102d6f7def4cf1a1ea24d&units=imperial"
    
        fetch(apiURL).then(function(data) {
            var lon = data.coord.lon
            var lat = data.cooord.lat
            getWeather(lon, lat)

            var searchedCity = data.name
            currentCityEl.textContent = searchedCity


            if (!cities.includes(searchedCity)) {
                cities.push(searchedCity)
                saveToSearchHistory()
                createButton(searchedCity)
                
            }
        }
        )}

var getWeather = function (lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=1b50cbb3b2c102d6f7def4cf1a1ea24d&units=imperial"
    console.log(apiUrl)

    
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data)
            })
        } else {
            alert("Error: City Not Found. Please check spelling.")
        }
    })
}

var displayCurrentWeather = function (city) {

    var Date = convertDate(city.current.dt)
    var DateEl = document.createElement("span")
    DateEl.textContent = " (" + Date + ")"
    CityEl.appendChild(currentDateEl)

    var icon = city.current.weather[0].icon
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
    var iconEl = document.createElement("img")
    iconEl.setAttribute("src", iconUrl)
    CityEl.appendChild(iconEl)

    var Temp = "Temp: " + city.current.temp + " °F"
    TempEl.textContent = Temp

    var Wind = "Wind: " + city.current.wind_speed + " MPH"
    WindEl.textContent = Wind

    var Humidity = "Humidity: " + city.current.humidity + " %"
    HumidityEl.textContent = Humidity

    display5DayForcast(city)
}
var display5DayForcast = function (city) {

    document.querySelector("#title").innerHTML = "5 Day Forcast:"

    for (var i = 1; i < 6; i++) {

 
        document.querySelector("#day" + i).classList.add("forcast")

        
        document.querySelector("#day" + i + ">.date").innerHTML = convertDate(city.daily[i].dt)
        document.querySelector("#day" + i + ">.date").classList.add("forcast-date")

       
        var icon = city.daily[i].weather[0].icon
        var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector("#day" + i + ">.weather-icon").setAttribute("src", iconUrl)

      
        document.querySelector("#day" + i + ">.temp").innerHTML = "Temp: " + city.daily[i].temperature.day + " °F"

       
        document.querySelector("#day" + i + ">.wind").innerHTML = "Wind: " + city.daily[i].wind_speed + " MPH"

        
        document.querySelector("#day" + i + ">.humidity").innerHTML = "Humidity: " + city.daily[i].humidity + " %"
    }
}
var convertDate = function (unixTimeStamp) {
    var milliseconds = unixTimeStamp * 1000 
    var date = new Date(milliseconds)
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
}


var retriveWeather = function (event) {

    getCoord(event.target.innerHTML)
}

var saveToSearchHistory = function () {
    localStorage.setItem("cities", JSON.stringify(cities)) 
}

var loadSearchHistory = function () {
    var savedCities = localStorage.getItem("cities")

    if (savedCities === null) {
        return false;
    }

    cities = JSON.parse(savedCities)

    for (var i = 0; i < cities.length; i++) {
        createButton(cities[i])
    }
}


var createButton = function (city) {
    var searchHistoryBtn = document.createElement("button")
    searchHistoryBtn.classList.add("btn-secondary", "btn", "col-12", "align-items-center", "mt-2")
    searchHistoryBtn.innerHTML = city
    document.querySelector("#search-history").appendChild(searchHistoryBtn)
}

cityFormEl.addEventListener("submit", formSubmitHandler)

searchHistoryEl.addEventListener("click", retriveWeather)

loadSearchHistory()