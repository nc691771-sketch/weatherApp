const API_KEY = "73613224ea08cd929fa1d65a4e97188f";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const error = document.getElementById("error");


async function getWeather(city) {

    try {

        loading.style.display = "block";
        error.innerText = "";
        weatherCard.style.display = "none";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        weatherCard.innerHTML = `
            <h2>${data.name}</h2>

            <h1>${Math.round(data.main.temp)}°C</h1>

            <p>${data.weather[0].description}</p>

            <p>💧 Humidity: ${data.main.humidity}%</p>

            <p>💨 Wind: ${data.wind.speed} m/s</p>
        `;

        weatherCard.style.display = "block";

    } catch (err) {

        error.innerText = err.message;

    } finally {

        loading.style.display = "none";
    }
}


searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {

        error.innerText = "Please enter a city";

        return;
    }

    getWeather(city);
});