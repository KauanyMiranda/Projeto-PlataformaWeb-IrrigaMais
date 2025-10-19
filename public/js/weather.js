// const { error } = require("console")
// const { response } = require("express")

// const api = {
//     key: "b530897f08b4433bc6736eafe8867095",
//     base: "https://api.openweathermap.org/data/2.5",
//     lang: "pt_br",
//     units: "metric"
// }

// const cityName = document.querySelector('#city_name')
// const btn = document.querySelector('#btn')
// const weather = document.querySelector('#weather')
// const title = document.querySelector("#title")
// const temp_value = document.querySelector("#temp_value")
// const temp_description = document.querySelector("#temp_description")
// const temp_img = document.querySelector("#temp_img")
// const temp_max = document.querySelector("#temp_max")
// const temp_min = document.querySelector("#temp_min")
// const humidity = document.querySelector("#humidity")
// const wind = document.querySelector("#wind")

// cityName.addEventListener('click', function() {
//     searchResults(cityName.value)
// })

// cityName.addEventListener('keypress', enter)
// function enter(event) {
//     key = event.keyCode
//     if (key === 13) {
//         searchResults(cityName.value)
//     }
// }

// function searchResults(title) {
//     fetch(`${api.base}weather?q=${title}&lang=${api.lang}&units=${api.units}&APPID${api.key}`)
//         .then(response => {
//             console.log(response)
//             if (!response.ok) {
//                 throw new Error(`http error: status ${response.status}`)
//             }
//             return response.json();
//         })
//         .catch(error => {
//             alert(error.message)
//         })
//         .then(response => {
//             displayResults(response)
//         })
// }



















// document.querySelector('#search').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const cityName = document.querySelector('#city_name').value;
//     if(!cityName) {
//         return showAlert('Você precisa digitar uma cidade');
//     }

//     const apiKey =""
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

//     const results = await fetch(apiUrl);
//     const json = await results.json();

//     showInfo( {
//         city: json.name,
//         country: json.sys.country,
//         temp: json.main.temp,
//         tempMax: json.main.temp_max,
//         tempMin: json.main.temp_min,
//         description: json.weather[0].description,
//         tempIcon: json.weather[0].icon,
//         windSpeed: json.wind.speed,
//         humidity: json.main.humidity
//     })       
// });

// function showInfo(json) {
//     showAlert("")
//     document.querySelector("#weather").classList.add("show")

//     document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`
//     document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
//     document.querySelector("#temp_description").innerHTML = `${json.description}`
//     document.querySelector("#temp_img").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}d@2x.png`)
//     document.querySelector("#temp_max").innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
//     document.querySelector("#temp_min").innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
//     document.querySelector("#humidity").innerHTML = `${json.humidity}%`
//     document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(1)} km/h`


// }

// function showAlert(msg) {
//     document.querySelector('#alert').innerHTML = msg
// }