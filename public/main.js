$(document).ready(() => {

    function showWeather(weather) {
        // We only want the first four days
        const cityName = weather.city_name;
        const weatherDays = [];
        for (let i = 0; i < 5; i++) {
            const day = weather.data[i];
            weatherDays.push({
                name: new Date(day.valid_date).toLocaleString('en-us', {weekday:'long'}),
                date: day.valid_date,
                prec: day.precip,
                humidity: day.rh,
                wind: day.wind_spd,
                iconUrl: `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`,
                desc: day.weather.description,
                temp: day.temp
            });
        }

        console.log(weatherDays);

        $('#city').text(cityName);

        const today = weatherDays[0];

        $('#main-day').text(today.name);
        $('#main-date-time').text(today.date);

        $('#main-weather-icon').html(`<img src="${today.iconUrl}">`);
        $('#main-temp').text(today.temp + '°');
        $('#main-weather-type').text(today.desc);

        $('#main-prec').text(today.prec + '%');
        $('#main-humidity').text(today.humidity + '%');
        $('#main-wind').text(today.wind + ' mph');

        for (let i=0; i < weatherDays.length; i++) {
            const day = weatherDays[i];
            $(`#day-wrap${i}-icon`).html(`<img src="${day.iconUrl}">`);
            $(`#day-wrap${i}-day`).text(day.name.substring(0, 3));
            $(`#day-wrap${i}-temp`).text(day.temp + '°');
        }

    }

    function getWeather(position) {
        // Get the weather from weatherbit
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        const apikey = '6597ffd75ecd4b86b0617f4b5278b16b';
        $.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=I&key=${apikey}`).then(res => {
            console.log(res);
            showWeather(res);
        })
        .catch(err => {
            console.error(err);
            alert('Sorry, there was an error getting the weather!');
        });
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeather);
        } else {
            alert(`Sorry, there was an error getting your location!`)
        }
    }

    getLocation();
});


// Some notes:

// const lat =  39.949521399999995;
// const lng = -75.16620069999999;

/*
    const closestCityUrl = `https://api.teleport.org/api/locations/${lat},${lng}/`;
    $.get(closestCityUrl).then(res => {
        console.log(res);
    })
        .catch(err => {
            console.error(err);
        });


    function showPosition(position) {
        console.log(position);
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
    }

 */
