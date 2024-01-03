let city;
document.querySelector(".search-button").addEventListener('click', function(){
    weather.search();
})
function capitalizeTheSentence(word){
    return word.split(' ').map((word)=>{ return word.charAt(0).toUpperCase() + word.slice(1); }).join(' ');
}

document.querySelector("#cityName").addEventListener('keydown', function(event){
    // Check if the key pressed is 'Enter'
    if (event.key === 'Enter') {
        weather.search();
    }
});

let weather ={
    APIkey: "faeb27dd20e92018cd2cbac7fbc836db",
    fetchWeather : function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        +city
        +'&appid='+ 
        this.APIkey+ 
        '&units=metric')
        .then((response)=> response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        let {icon, description} = data.weather[0];
        const {temp, humidity} = data.main; 
        const {speed} = data.wind;
        description = capitalizeTheSentence(description);  
        console.log(description,temp, humidity, speed, icon, name);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerHTML = `<h2>${temp}&deg;C</h2>`;
        document.querySelector(".humidity").innerHTML = `   Humidity: ${humidity}%`;
        document.querySelector(".wind").innerHTML = `Wind Speed: ${speed}m/s`;
        document.querySelector(".weather").classList.remove("loading");
        let url = 'https://source.unsplash.com/1920x800/?' + name;
        document.querySelector(".container").style.backgroundImage = `url(${url})`;

    }, 
    search: function(){
        this.fetchWeather(document.querySelector("#cityName").value);
    }

}
document.querySelector('#homeButton').addEventListener('click', function(){
    document.querySelector(".weather").classList.add('loading');
    document.querySelector("#cityName").value="";
})