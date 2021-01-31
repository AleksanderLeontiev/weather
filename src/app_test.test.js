import {
	drawWeather,
	addCity,
	initListeners,
	initMap,
	initWeather,
	run,
} from "./app";
import * as module from "./api";
import { getSrcMap } from "./api";
import { getStorage } from "./storage";
import * as moduleStorage from "./storage";

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
    <div class="weather__city"></div>
    <div class="weather__forecast"></div>
    <div class="weather__desc"></div>
    <div class="weatherInfo"></div>
    <div>
        <ol id="cities" style="cursor: pointer"></ol>
    </div>
    <img id="map">
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
	jest
		.spyOn(module, "getWeather")
		.mockImplementation(() => Promise.resolve({ city: "Moscow" }));
	test("call getWeather", async () => {
		await initWeather();
		expect(module.getWeather).toBeCalled();
	});
});
describe("draws a list from input", () => {
	it("checks the data entered from input", () => {
		drawWeather(mockData);
		expect(document.querySelector(".weather__city").textContent).toEqual(
			mockData.name
		);
		expect(document.querySelector(".weather__forecast").innerHTML).toEqual(
			mockData.main.temp
		);
		expect(document.querySelector(".weatherInfo").innerHTML).toEqual(
			mockData.wind.speed
		);
	});
});
describe("renders the list", () => {
	test("list li", () => {
		const cities = "ufa";
		addCity(cities);
		const citiesElement = document.getElementById("cities"); // див ол
		const li = document.createElement("li");
		li.innerText = cities;
		expect(citiesElement).not.toBe(null);
		expect(li).not.toBe(null);
		expect(li.innerText).toEqual(cities);
	});
});
describe("renders the list map", () => {
	it("list li map", () => {
		const img = document.getElementById("map");
		const spy = jest.spyOn(module, "getSrcMap");
		initMap("ufa");
		expect(spy).toHaveBeenCalledWith("ufa");
		expect(img.src).not.toBe(null);
	});
});
describe("render run function", () => {
	jest.mock("./storage");
	it("run app", () => {
		const sp = jest.spyOn(moduleStorage, "getStorage");
		run();
		expect(sp).toHaveBeenCalled();
	});
});

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
