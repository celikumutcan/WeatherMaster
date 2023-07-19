// Selecting relevant HTML elements
const main = document.querySelector('.main');
const search = document.querySelector('.search-box button');
const findlocation = document.querySelector('.find-location');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const mistake = document.querySelector('.not-found');
const panel2 = document.querySelector('.panel2');
const panel3 = document.querySelector('.panel3');
const port1 = document.querySelector('.port1');
const port2 = document.querySelector('.port2');
const port3 = document.querySelector('.port3');
const port4 = document.querySelector('.port4');

// Function to find user's location using Geolocation API
const findMyState = () => 
{
    const findlocation = document.querySelector('.findlocation');
    const success = (position) => 
    {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Constructing the URL for reverse geocoding API
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        // Fetching location data
        fetch(geoApiUrl)
            .then(res => res.json())
            .then(data => {
                searchInput.value = data.principalSubdivision;
                searchInput.focus(); 
            })
            .catch(error => {
                console.log(error);
            });
    }

    const error = () => 
    {
        findlocation.textContent = 'Unable to retrieve your location';
    }
    
    // Getting user's current position
    navigator.geolocation.getCurrentPosition(success, error);
}

// Function to fetch current weather data for a given city
const fetchData = (sehir) => 
{
    const ApiKey = '8a4b96239ac3cf907bd91d0229237077';

    // Fetching weather data from OpenWeather API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&lang=en&units=metric&appid=${ApiKey}`)
        .then(response => response.json())
        .then(json => 
        {
            // Displaying error message if city data is not found
            if (json.cod === '404') 
            {
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                mistake.style.display = 'block';
                mistake.classList.add('fadeIn');
                document.body.style.background = 'url(http://127.0.0.1:5500/photos/1.jpg)';
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundRepeat = "no-repeat";
                return;
            }
            
            // Displaying weather data if available
            mistake.style.display = 'none';
            mistake.classList.remove('fadeIn');

            const picture = document.querySelector('.weather-box img');
            const heat = document.querySelector('.weather-box .temperature');
            const aciklama = document.querySelector('.weather-box .description');
            const zamanElement = document.querySelector('.weather-box .date');
            const nem = document.querySelector('.weather-details .humidity span');
            const ruzgar = document.querySelector('.weather-details .wind span');
            const feels_like = document.querySelector('.weather-details .feels_like span');

            // Setting weather icon and background image based on weather condition
            switch (json.weather[0].main) 
            {
                case 'Clear':
                    picture.src = 'images/sunny.png';
                    document.body.style.background = 'url(http://127.0.0.1:5500/photos/sunny.jpg)';
                    break;
                case 'Rain':
                    picture.src = 'images/rainy.png';
                    document.body.style.background = 'url(http://127.0.0.1:5500/photos/rainy.jpg)';
                    break;
                case 'Snow':
                    picture.src = 'images/snowy.png';
                    document.body.style.background = 'url(http://127.0.0.1:5500/photos/snowy.jpg)';
                    break;
                case 'Clouds':
                    picture.src = 'images/cloudy.png';
                    document.body.style.background = 'url(http://127.0.0.1:5500/photos/cloudy.jpg)';
                    break;
                case 'Haze':
                    picture.src = 'images/haze.png';
                    document.body.style.background = 'url(http://127.0.0.1:5500/photos/haze.jpg)';
                    break;
                case 'Party loudy':
                    picture.src = 'images/Party loudy.png';
                    document.body.style.background = 'url(http://127.0.0.1:5500/photos/partlyloudly.jpg)';
                    break;
                default:
                    picture.src = '';
                    document.body.style.background = '';
            }

            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundRepeat = "no-repeat";

            heat.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            aciklama.innerHTML = `${json.weather[0].main}`;
            
            // Converting Unix time to milliseconds
            const timeStamp = json.dt * 1000;

            // Converting Unix time to date
            const dateFormat = new Date(timeStamp);

            // Converting the date to local date format
            const formattedDate = dateFormat.toLocaleString();

            // Updating the content of the time element
            zamanElement.innerHTML = formattedDate;


            nem.innerHTML = `%${json.main.humidity}`;
            ruzgar.innerHTML = `${json.wind.speed} km/s`;
            feels_like.innerHTML = `${json.main.feels_like}<span>°C</span>`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');

        })
        .catch(error => 
        {
            console.log(error);
        });
}

// Function to hide the centered-text div
const hideWelcomeText = () => 
{
    const centeredTextDiv = document.querySelector('.centered-text');
    centeredTextDiv.style.display = 'none';
};

// Event listener for custom button click to find user's location
document.querySelector('.custom-button').addEventListener('click', findMyState);

// Event listener for search button click to fetch weather data for the entered city
search.addEventListener('click', () => 
{
    const sehir = searchInput.value;
    if (sehir === '') return;

    fetchData(sehir);

    panel2.style.display = 'block';
    panel3.style.display = 'block';
    port1.style.display = 'block';
    port2.style.display = 'block';
    port3.style.display = 'block';
    port4.style.display = 'block';
    fetchForecastData(sehir);
    hideWelcomeText();
});

// Event listener for search input keydown event to fetch weather data for the entered city on pressing Enter
searchInput.addEventListener('keydown', (e) => 
{
    if (e.key === 'Enter') 
    {
        const sehir = searchInput.value;
        if (sehir === '') return;

        fetchData(sehir);

        panel2.style.display = 'block';
        panel3.style.display = 'block';
        port1.style.display = 'block';
        port2.style.display = 'block';
        port3.style.display = 'block';
        port4.style.display = 'block';
        fetchForecastData(sehir);
        hideWelcomeText();
    }
});

// Function to fetch 5-day weather forecast for a given city
const fetchForecastData = (sehir) => 
{
    const ApiKey = '8a4b96239ac3cf907bd91d0229237077';
  
    // Fetching 5-day weather forecast data from OpenWeather API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${sehir}&lang=en&units=metric&appid=${ApiKey}`)
    .then((response) => response.json())
    .then((json) => 
    {
        if (json.cod === '404')
        {
            // Displaying error message if forecast data is not found
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            mistake.style.display = 'block';
            mistake.classList.add('fadeIn');
            const forecastElements = document.querySelectorAll('.forecast-box');
            forecastElements.forEach((element) => 
            {
                element.style.display = 'none';
            });
            return;
        }
  
        mistake.style.display = 'none';
        mistake.classList.remove('fadeIn');
  
        // Processing forecast data
        processForecastData(json.list);
  
        panel2.style.display = 'block';
        panel3.style.display = 'block';
        port1.style.display = 'block';
        port2.style.display = 'block';
        port3.style.display = 'block';
        port4.style.display = 'block';
    })
    .catch((error) => 
    {
        console.log(error);
    });
};
  
// Function to process and display 5-day weather forecast data
const processForecastData = (forecastList) => 
{
    const forecastElements = document.querySelectorAll('.forecast-box');
    const forecastDates = document.querySelectorAll('.forecast-date');
    const forecastPictures = document.querySelectorAll('.forecast-picture');
    const forecastTemperatures = document.querySelectorAll('.forecast-temperature');
    const forecastDescriptions = document.querySelectorAll('.forecast-description');
  
    for (let i = 0; i < 4; i++) 
    {
        const forecast = forecastList[i * 8];
        const timeStamp = forecast.dt * 1000;
        const dateFormat = new Date(timeStamp);
        const formattedDate = dateFormat.toLocaleString();
        forecastElements[i].style.display = '';
        forecastDates[i].innerHTML = formattedDate; 
        switch (forecast.weather[0].main) 
        {
            case 'Clear':
                forecastPictures[i].src = 'images/sunny.png';
                break;
            case 'Rain':
                forecastPictures[i].src = 'images/rainy.png';
                break;
            case 'Snow':
                forecastPictures[i].src = 'images/snowy.png';
                break;
            case 'Clouds':
                forecastPictures[i].src = 'images/cloudy.png';
                break;
            case 'Haze':
                forecastPictures[i].src = 'images/haze.png';
                break;
            case 'Party loudy':
                forecastPictures[i].src = 'images/Party loudy.png';
                break;
            default:
                forecastPictures[i].src = '';
        }

        forecastTemperatures[i].innerHTML = `${parseInt(forecast.main.temp)}<span>°C</span>`;
        forecastDescriptions[i].innerHTML = forecast.weather[0].description;
    }
};