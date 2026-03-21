document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified || 'Desconocida';

function calculateWindChill(tempF, speedMph) {
    return 35.74 + (0.6215 * tempF) - (35.75 * Math.pow(speedMph, 0.16))
        + (0.4275 * tempF * Math.pow(speedMph, 0.16));
}

function updateWindChill(tempF, speedMph) {
    const wcEl = document.getElementById('windChill');
    if (!isNaN(tempF) && !isNaN(speedMph) && tempF <= 50 && speedMph > 3) {
        const wc = calculateWindChill(tempF, speedMph);
        wcEl.textContent = Math.round(wc) + ' °F';
    } else {
        wcEl.textContent = 'N/A';
    }
}
async function loadWeather() {
    try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=51.179&longitude=-115.569&current_weather=true";
        const res = await fetch(url);
        const data = await res.json();

        const tempC = data.current_weather.temperature;
        const windKmh = data.current_weather.windspeed;

        const tempF = (tempC * 9 / 5 + 32).toFixed(1);
        const windMph = (windKmh / 1.609).toFixed(1);
        document.getElementById('tempF').textContent = tempF;
        document.getElementById('windMph').textContent = windMph;

        updateWindChill(parseFloat(tempF), parseFloat(windMph));
    } catch (err) {
        console.error("Error fetching weather data:", err);
        document.getElementById('tempF').textContent = "Error";
        document.getElementById('windMph').textContent = "Error";
        document.getElementById('windChill').textContent = "N/A";
    }
}
loadWeather();