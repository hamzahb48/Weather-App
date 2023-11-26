let weather = {
    "apiKey":'028166bf0a297487cc6717e3a8b8ef32',
    fetchWeather : function (city){
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            + city
            + '&units=metric&appid='
            + this.apiKey
        )
        .then(result => result.json())
        // .then(data =>console.log(data))
        .then(data =>this.displayWeather(data));
    },
    displayWeather : function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.icon').src = "http://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = "Humidity: "+ humidity + "%";
        document.querySelector('.wind').innerText = "wind speed: "+ speed + " km/h";
        document.querySelector('.weather').classList.remove("loading");
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value)
    }
}

document.querySelector('.search button').addEventListener('click',()=>{
    weather.search();
})

document.querySelector('.search-bar').addEventListener('keyup',event=>{
    if (event.key=='Enter'){
        weather.search();
    }
})
document.querySelector('.search-bar').value=''
weather.fetchWeather('Doha');