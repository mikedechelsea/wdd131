// Footer: current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = document.lastModified;

// Wind chill calculation (Metric: °C and km/h)
function calculateWindChill(temperature, windSpeed) {
    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1);
}

const temperature = 30;   // °C — static value matching page content
const windSpeed = 10;     // km/h — static value matching page content

if (temperature <= 10 && windSpeed > 4.8) {
    document.getElementById('windchill').textContent = calculateWindChill(temperature, windSpeed) + ' °C';
} else {
    document.getElementById('windchill').textContent = 'N/A';
}
