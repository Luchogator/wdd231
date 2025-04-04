// OpenWeatherMap API configuration
const API_KEY = '7c6db722f671147763aec9b9dd610d75'; // Tarapoto API key
const LAT = -6.48; // Tarapoto latitude
const LON = -76.36; // Tarapoto longitude
let currentUnit = 'metric'; // Default to metric (Celsius)
let weatherData = null; // Store the weather data globally
let originalData = null; // Store the original data without modifications

// Function to build API URL with current unit
function getApiUrl() {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${currentUnit}&appid=${API_KEY}`;
}

// Select HTML elements
const currentTemp = document.querySelector('.current-temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.querySelector('.weather-description');
const weatherDetails = document.querySelector('.weather-details');

// Function to capitalize each word in a string
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Add unit toggle button after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing weather module...');

    // Create the toggle button
    const unitToggle = document.createElement('button');
    unitToggle.textContent = 'Switch to °F';
    unitToggle.className = 'unit-toggle';
    unitToggle.setAttribute('aria-label', 'Switch temperature unit');

    // Insert the button after the weather heading
    const weatherSection = document.querySelector('.weather');
    if (weatherSection) {
        const weatherHeading = weatherSection.querySelector('h2');
        if (weatherHeading) {
            weatherHeading.insertAdjacentElement('afterend', unitToggle);
        }
    }

    // Add event listener to the toggle button
    unitToggle.addEventListener('click', function () {
        if (currentUnit === 'metric') {
            currentUnit = 'imperial';
            unitToggle.textContent = 'Switch to °C';
        } else {
            currentUnit = 'metric';
            unitToggle.textContent = 'Switch to °F';
        }

        // If we have original data, display it with the new unit
        if (originalData) {
            displayResults(originalData, false);
        } else {
            apiFetch();
        }
    });

    // Initial fetch of weather data
    apiFetch();
});

// Fetch current weather data
async function apiFetch() {
    try {
        console.log(`Fetching weather data from: ${getApiUrl()}`);
        const response = await fetch(getApiUrl());

        if (response.ok) {
            weatherData = await response.json();
            console.log('Weather data received:', weatherData);

            // Store original API data with its unit
            originalData = {
                ...weatherData,
                originalUnit: currentUnit // Save which unit the data was fetched in
            };

            // Validate temperature (Tarapoto should never be below freezing)
            if (weatherData.main && weatherData.main.temp < 0) {
                console.warn('Received unlikely negative temperature for Tarapoto. Using fallback data instead.');
                displayFallbackWeather();
            } else {
                displayResults(originalData, true);
            }
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayFallbackWeather();
    }
}

// Display weather results
function displayResults(data, isNewData = false) {
    // Get base temperatures from original data
    const originalUnit = data.originalUnit || 'metric';
    const tempUnit = currentUnit === 'metric' ? '&#8451;' : '&#8457;';

    console.log(`Converting from ${originalUnit} to ${currentUnit}`);

    // Get the original temperatures
    let mainTemp = data.main.temp;
    let maxTemp = data.main.temp_max;
    let minTemp = data.main.temp_min;
    let windSpeed = data.wind.speed;

    // Data validation - Tarapoto is tropical, so temperatures should be in a reasonable range
    if (originalUnit === 'metric' && (mainTemp < 0 || mainTemp > 50)) {
        console.warn(`Unusual temperature detected: ${mainTemp}°C. Using fallback values.`);
        mainTemp = 27; // Typical Tarapoto temperature in Celsius
        maxTemp = 32;
        minTemp = 22;
    }

    // Convert if the original unit is different from the current display unit
    if (originalUnit !== currentUnit) {
        if (originalUnit === 'metric' && currentUnit === 'imperial') {
            // Convert Celsius to Fahrenheit
            mainTemp = (mainTemp * 9 / 5) + 32;
            maxTemp = (maxTemp * 9 / 5) + 32;
            minTemp = (minTemp * 9 / 5) + 32;
            // Convert m/s to mph
            windSpeed = windSpeed * 2.237;
        } else if (originalUnit === 'imperial' && currentUnit === 'metric') {
            // Convert Fahrenheit to Celsius
            mainTemp = (mainTemp - 32) * 5 / 9;
            maxTemp = (maxTemp - 32) * 5 / 9;
            minTemp = (minTemp - 32) * 5 / 9;
            // Convert mph to m/s
            windSpeed = windSpeed / 2.237;
        }
    }

    // Display temps with no decimal points and correct HTML entity for degrees
    currentTemp.innerHTML = `${Math.round(mainTemp)}${tempUnit}`;

    // Set weather icon
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    // Set weather description with capitalized words
    const desc = capitalizeWords(data.weather[0].description);
    weatherDescription.textContent = desc;

    // Update weather details with correct HTML entity for degrees
    weatherDetails.innerHTML = `
        <p>High: ${Math.round(maxTemp)}${tempUnit}</p>
        <p>Low: ${Math.round(minTemp)}${tempUnit}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${windSpeed.toFixed(1)} ${currentUnit === 'metric' ? 'm/s' : 'mph'}</p>
    `;

    // Update forecast section if it exists
    updateForecast(tempUnit);
}

// Update forecast with current unit
function updateForecast(tempUnit) {
    const forecastContent = document.querySelector('.forecast-content');
    if (forecastContent) {
        // Define base temperatures in Celsius (realistic for Tarapoto)
        const baseTempC = [32, 31, 30]; // Today, Tomorrow, Thursday

        // Convert to Fahrenheit if needed
        const temps = baseTempC.map(temp =>
            currentUnit === 'metric' ? temp : ((temp * 9 / 5) + 32)
        );

        // Define day labels
        const days = ['Today', 'Tomorrow', 'Thursday'];

        // Create the forecast HTML with correct HTML entity for degrees
        forecastContent.innerHTML = days.map((day, index) =>
            `<p>${day}: ${Math.round(temps[index])}${tempUnit}</p>`
        ).join('');
    }
}

// Fallback weather display if API fails
function displayFallbackWeather() {
    console.log('Using fallback weather data for Tarapoto');

    const tempUnit = currentUnit === 'metric' ? '&#8451;' : '&#8457;';
    const temp = currentUnit === 'metric' ? 27 : 81;      // More realistic for Tarapoto
    const high = currentUnit === 'metric' ? 32 : 90;
    const low = currentUnit === 'metric' ? 22 : 72;
    const windSpeed = currentUnit === 'metric' ? 3.5 : 7.8; // 3.5 m/s ≈ 7.8 mph

    currentTemp.innerHTML = `${temp}${tempUnit}`;
    weatherIcon.src = 'images/weather-icon.png';
    weatherIcon.alt = 'Partly cloudy weather icon';
    weatherDescription.textContent = 'Partly Cloudy';

    weatherDetails.innerHTML = `
        <p>High: ${high}${tempUnit}</p>
        <p>Low: ${low}${tempUnit}</p>
        <p>Humidity: 65%</p>
        <p>Wind: ${windSpeed.toFixed(1)} ${currentUnit === 'metric' ? 'm/s' : 'mph'}</p>
    `;

    // Update forecast with fallback data
    updateForecast(tempUnit);
}

function displayWeather(weatherData) {
    const weatherContainer = document.querySelector('.weather-main');
    const icon = weatherData.weather[0].icon;
    const description = weatherData.weather[0].description;
    const temp = Math.round(weatherData.main.temp);
    const windSpeed = weatherData.wind.speed;
    const windDirection = getWindDirection(weatherData.wind.deg);
    const humidity = weatherData.main.humidity;
    const tempUnit = currentUnit === 'metric' ? '&#8451;' : '&#8457;';

    // Store the original temperature and wind speed values for conversions
    weatherContainer.dataset.tempC = temp;
    weatherContainer.dataset.windSpeedMS = windSpeed;

    // Update the DOM with weather data
    weatherContainer.innerHTML = `
        <p class="weather-temp">${temp}${tempUnit}</p>
        <button class="toggle-unit">Switch to ${currentUnit === 'metric' ? '°F' : '°C'}</button>
        <div class="weather-icon-container">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
            <p class="weather-description">${description}</p>
        </div>
        <div class="weather-details">
            <p>Wind Speed: <span class="wind-speed">${windSpeed}</span> m/s ${windDirection}</p>
            <p>Humidity: ${humidity}%</p>
        </div>
    `;

    // Add event listener for temperature unit toggle
    const toggleBtn = weatherContainer.querySelector('.toggle-unit');
    toggleBtn.addEventListener('click', toggleTemperatureUnit);
} 