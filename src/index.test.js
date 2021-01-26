import "@babel/polyfill";
import { drawWeather, initWeather, addCity, onClickItem, onSubmit, initMap } from "./index";
import "regenerator-runtime/runtime";
import { getStorage, setStorage } from "./storage";

const mockData = {
  temp: "-22",
  name: "Moscow",
  speed: "1 m/s"
};
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
describe("draws a list from input", () => {
  it("checks the data entered from input", function() {
    drawWeather(mockData);
    expect(document.querySelector(".weather__city").textContent).toEqual(mockData.name);
    expect(document.querySelector(".weather__forecast").innerHTML).toEqual(mockData.temp);
    expect(document.querySelector(".weatherInfo").innerHTML).toEqual(mockData.speed);
  });
});
describe("add cities to list", () => {
  test("It'll add one test of city to list", () => {
    const city = "Moscow";
    const form = document.querySelector(".formCity");
    const inputCity = document.querySelector(".cityInput");
    inputCity.value = city;
    //form.dispatchEvent(new Event("submit"));
    const test = document.querySelector("#cities");
    test.dispatchEvent(new window.Event("click"));

    expect(inputCity.value).toBe("");
  });
});

describe("checks the function call", () => {
  const city = "Kazan";
  const arg2 = {
    getWeather: global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(city) }
      ))
  };
  test("call getWeather", async () => {
    await initWeather(city);
    expect(arg2.getWeather).toBeCalled();
  });
});


// describe("renders the list", () => {
//   test("list li", () => {
//     initMap(mockData.name);
//     require("./api");
//
//     expect(document.getElementById("map")).toEqual(mockData);
//     expect(document.createElement("li")).not.toBe(null);
//   });
// });
// describe("call getWeather", () => {
//
//   test("add fetch",  () => {
//
//     expect().toBeCalled();
//   });
// });

