function attachEvents() {
    document.getElementById("submit").addEventListener("click", onSubmit);
    const locationRef = document.getElementById("location");
    const BASE_URL = `http://localhost:3030/jsonstore/forecaster`;

    const forecastRef = document.getElementById("forecast");
    const currentRef = document.getElementById("current");
    const nextDay = document.getElementById("upcoming")

    const endPoints = {
        location: "/locations",
        today: (str) => `/today/${str}`,
        upcoming: (str) => `/upcoming/${str}`

    };

    const symbolEnum = {
        "Sunny": "&#x2600",
        "Partly sunny": "&#x26C5",
        "Overcast": "&#x2601",
        "Rain": "&#x2614",
        "Degrees": "&#176"
    }

    const userLocation = data.find(x => x.name === locationRef.value);

    //проверка дали userLocation е намерен
    if (!userLocation) {
        throw new Error("Invalid location");
    }

    async function onSubmit(event) {
        try {
            const response = await fetch(BASE_URL + endPoints.location)
            const data = await response.json();
            forecastRef.style.display = "block";
            const userLocation = data.find(x => x.name === locationRef.value);
            fillToday(userLocation.code);
            fillNextDay(userLocation.code);
        } catch (error) {
            forecastRef.style.display = "block";
            forecastRef.textContent = "Error";
        }

    }

    async function fillNextDay(code) {
        const response = await fetch(BASE_URL + endPoints.upcoming(code));
        const data = await response.json();
        createNextDay(data);

    }

    function createNextDay(data) {
        const div = document.createElement("div");
        div.classList.add("forecast-info");

        data.forecast.forEach(x => div.innerHTML += createSpan(x));

        div.innerHTML
        nextDay.appendChild(div);
    }

    function createSpan(data) {
        return `<span class="upcoming">
            <span class="symbol">${symbolEnum[data.condition]}</span>
            <span class="forecast-data">${data.low}${symbolEnum["Degrees"]}/${data.high}${symbolEnum["Degrees"]}</span>
            <span class="forecast-data">${data.condition}</span>
            </span>
            `
    }

    async function fillToday(location) {
        const response = await fetch(BASE_URL + endPoints.today(location));
        const data = await response.json();
        createTodayInfo(data);
    }

    function createTodayInfo(data) {
        console.log(data);
        const forecast = data.forecast
        const divContainer = document.createElement("div");
        divContainer.classList.add("forecast");

        divContainer.innerHTML = `
        <span class="condition symbol">${symbolEnum[forecast.condition]}</span>
        <span class="condition">
            <span class="forecast-data">${data.name}</span>
            <span class="forecast-data">${forecast.low}${symbolEnum["Degrees"]}/${forecast.high}${symbolEnum["Degrees"]}/</span>
            <span class="forecast-data">${forecast.condition}</span>
        </span>
        `
        currentRef.appendChild(divContainer);

    }
}

attachEvents();