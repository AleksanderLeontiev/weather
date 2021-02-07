import { getCity, getSrcMap, getWeather } from "./api";
import { getStorage, setStorage } from "./storage";

const STORAGE_CITIES = "cities";

export function addCity(city) {
	const citiesElement = document.querySelector(".cities");
	const li = document.createElement("li");
	li.innerText = city;
	citiesElement.appendChild(li);
}

export function drawWeather(data) {
	document.querySelector(
		".weather-city"
	).textContent = `${`Город:${data.name}`}`;
	document.querySelector(
		".weather-forecast"
	).innerHTML = `${`Погода:${data.main.temp}`}°C`;
	document.querySelector(
		".weatherInfo"
	).innerHTML = `${`Скорость ветра:${data.wind.speed}`} m/c`;
}

export function initWeather(city) {
	getWeather(city).then((data) => drawWeather(data));
	// .catch(exp => console.error(exp));
}

export function initMap(city) {
	const img = document.querySelector(".map");
	img.src = getSrcMap(city);
}

export function onClickItem(event) {
	initWeather(event.target.innerText);
	initMap(event.target.innerText);
}

export async function onSubmit(ev) {
	ev.preventDefault();
	const formElement = ev.target;
	const input = formElement.querySelector(".cityInput");
	const { value } = input;
	if (value === "") {
		return;
	}
	input.value = "";
	const cities = await getStorage(STORAGE_CITIES);
	if (cities.length <= 9) {
		cities.push(value);
		await setStorage(STORAGE_CITIES, cities);
		addCity(value);
		initWeather(value);
		initMap(value);
	}
}
export function initListeners() {
	const formElement = document.querySelector(".formCity");
	const citiesElement = document.querySelector(".cities");
	formElement.addEventListener("submit", onSubmit);
	citiesElement.addEventListener("click", onClickItem);
}

export async function run() {
	const cities = await getStorage(STORAGE_CITIES);
	await setStorage(STORAGE_CITIES, cities);
	cities.forEach((city) => addCity(city));
	getCity().then((obj) => {
		const myCity = obj.city;
		initWeather(myCity);
		initMap(myCity);
	});
}
