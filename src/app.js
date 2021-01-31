import { getSrcMap, getWeather } from "./api";
import { getStorage, setStorage } from "./storage";

const DEFAULT_CITY = "Yoshkar-Ola";
const STORAGE_CITIES = "cities";

export async function run() {
	let cities = await getStorage(STORAGE_CITIES); // асинхронно вызываю функцию с параметром "cities"
	if (!cities.includes(DEFAULT_CITY)) {
		// если  не нахожу "Yoshkar-Ola"
		cities = [DEFAULT_CITY]; // тогда переназначаю cities в "Yoshkar-Ola"
		await setStorage(STORAGE_CITIES, cities); // и сохраняю в локал сторадж "Yoshkar-Ola"
	}
	cities.forEach((city) => addCity(city)); // перебираю массив с городами и отрисовываю
	initWeather(DEFAULT_CITY); // возвращаю погоду йошкар олы
	initMap(DEFAULT_CITY); // и картинку
}

export function initWeather(city) {
	// делаю запрос на погоду
	getWeather(city).then((data) => drawWeather(data)); // если все ок от отрисовываю погоду
	// .catch(exp => console.error(exp));//если ошибка вывожу в консоль
}
export function drawWeather(data) {
	// отрисовываю погоду
	document.querySelector(".weather__city").textContent = data.name;
	document.querySelector(".weather__forecast").innerHTML = data.main.temp;
	document.querySelector(".weatherInfo").innerHTML = data.wind.speed;
}
export function addCity(city) {
	// добавляю строку
	const citiesElement = document.getElementById("cities"); // див ол
	const li = document.createElement("li");
	li.innerText = city;
	citiesElement.appendChild(li);
}
export function initMap(city) {
	// добавляю картинку
	const img = document.getElementById("map");
	img.src = getSrcMap(city);
}
// добавляю обработчики
function onClickItem(event) {
	initWeather(event.target.innerText);
	initMap(event.target.innerText);
}
export async function onSubmit(ev) {
	ev.preventDefault();
	const formElement = ev.target;
	const input = formElement.querySelector(".cityInput");
	const { value } = input;
	input.value = "";
	const cities = await getStorage(STORAGE_CITIES);
	if (cities.length <= 10) {
		cities.push(value);
		await setStorage(STORAGE_CITIES, cities); // ели есть место добавляю город
		addCity(value);
	}
}
export function initListeners() {
	const formElement = document.querySelector(".formCity");
	const citiesElement = document.getElementById("cities"); // див ол
	formElement.addEventListener("submit", onSubmit);
	citiesElement.addEventListener("click", onClickItem);
}
