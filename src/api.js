const APP_ID = `2a65fd6cf7e06ab6144595db8eef6f98`;

const geo = "https://get.geojs.io/v1/ip/geo.json";

export function getSrcMap(city) {
	return `https://maps.googleapis.com/maps/api/staticmap?center=${city},RU&zoom=14&size=400x400&key=AIzaSyDW6zlQYQGTpgsfqOILRe2WkMcoOPalSEo`;
}
export function getWeather(cityName) {
	const inputUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${APP_ID}`;
	return fetch(inputUrl).then((response) => response.json());
}

export function getCity() {
	return fetch(geo).then((response) => response.json());
}
