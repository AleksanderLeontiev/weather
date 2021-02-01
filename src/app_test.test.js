import {
	drawWeather,
	addCity,
	initListeners,
	initMap,
	initWeather,
	run,
} from "./app";
import * as apiModule from "./api";
import * as moduleStorage from "./storage";
import { timeout } from "./timeout";

const mockData = {
	main: {
		temp: "-22",
	},
	wind: {
		speed: "1 m/c",
	},
	name: "Moscow",
};
beforeEach(() => {
	global.window.document.body.innerHTML = `<form class="formCity">
    <input class="cityInput" type="text"/>
    <button>Get weather</button>
</form>
    <div class="weather-city"></div>
    <div class="weather-forecast"></div>
    <div class="weatherInfo"></div>
    <div>
        <ol class="cities" style="cursor: pointer"></ol>
    </div>
    <img class="map">
`;
});

describe("add cities to list", () => {
	test("It'll add one test of city to list", async () => {
		initListeners();
		const city = "Moscow";
		const form = document.querySelector(".formCity");
		const inputCity = document.querySelector(".cityInput");
		inputCity.value = city;
		form.dispatchEvent(new Event("submit"));
		await timeout(1000);
		expect(inputCity.value).toBe("");
	});
});
describe("checks the function call", () => {
	jest.spyOn(apiModule, "getWeather");
	test("call getWeather", async () => {
		await initWeather();
		expect(apiModule.getWeather).toBeCalled();
	});
});
describe("draws a list from input", () => {
	test("checks the data entered from input", () => {
		drawWeather(mockData);
		expect(document.querySelector(".weather-city").textContent).toEqual(
			`${`Город:${mockData.name}`}`
		);
		expect(document.querySelector(".weather-forecast").innerHTML).toEqual(
			`${`Погода:${mockData.main.temp}`}°C`
		);
		expect(document.querySelector(".weatherInfo").innerHTML).toEqual(
			`${`Скорость ветра:${mockData.wind.speed}`} m/c`
		);
	});
});
describe("renders the list", () => {
	test("list li", () => {
		const cities = "ufa";
		addCity(cities);
		const citiesElement = document.querySelector(".cities"); // див ол
		const li = document.createElement("li");
		li.innerText = cities;
		expect(citiesElement).not.toBe(null);
		expect(li).not.toBe(null);
		expect(li.innerText).toEqual(cities);
	});
});
describe("renders the list map", () => {
	test("list li map", () => {
		const img = document.querySelector(".map");
		const spy = jest.spyOn(apiModule, "getSrcMap");
		initMap("ufa");
		expect(spy).toHaveBeenCalledWith("ufa");
		expect(img.src).not.toBe(null);
	});
});
describe("render run function", () => {
	jest.mock("./storage");
	test("run app", () => {
		const sp = jest.spyOn(moduleStorage, "getStorage");
		run();
		expect(sp).toHaveBeenCalled();
	});
});
