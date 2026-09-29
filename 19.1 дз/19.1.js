const apiKey = '9b86c203a87f323822f361b7858398e2';
const city = 'Kyiv';

const weatherBlock = document.getElementById('weather');
const refreshBtn = document.getElementById('refreshBtn');

async function getWeather() {
    try {
        weatherBlock.innerHTML = '<p>Завантаження...</p>';

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`
        );

        if (!response.ok) {
            throw new Error('Помилка отримання даних');
        }

        const data = await response.json();

        const icon = data.weather[0].icon;
        const description = data.weather[0].description;

        weatherBlock.innerHTML = `
            <div class="city">${data.name}</div>

            <img
                class="weather-icon"
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="Погода"
            >

            <div class="temperature">
                ${Math.round(data.main.temp)}°C
            </div>

            <div class="info">
                <p>${description}</p>
                <p>Відчувається: ${Math.round(data.main.feels_like)}°C</p>
                <p>Вологість: ${data.main.humidity}%</p>
                <p>Тиск: ${data.main.pressure} hPa</p>
                <p>Вітер: ${data.wind.speed} м/с</p>
            </div>
        `;

    } catch (error) {
        weatherBlock.innerHTML =
            '<p>Не вдалося отримати дані про погоду</p>';

        console.error(error);
    }
}

refreshBtn.addEventListener('click', getWeather);

getWeather();