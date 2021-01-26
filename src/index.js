import { getSrcMap, getWeather } from "./api";
import { getStorage, setStorage } from "./storage";

const DEFAULT_CITY = "Yoshkar-Ola";
const STORAGE_CITIES = "cities";
const formElement = document.querySelector(".formCity");
const citiesElement = document.getElementById("cities");//див ол
// init().catch(exp => console.error(exp));

async function init() {
  let cities = await getStorage(STORAGE_CITIES);//асинхронно вызываю функцию с параметром "cities"
  if (!cities.includes(DEFAULT_CITY)) {//если асинхронно не нахожу "Yoshkar-Ola"
    cities = [DEFAULT_CITY];//тогда переназначаю cities в "Yoshkar-Ola"
    await setStorage(STORAGE_CITIES, cities);// и сохраняю в локал сторадж "Yoshkar-Ola"
  }
  cities.forEach(city => addCity(city));//перебираю массив с городами и отрисовываю
  initWeather(DEFAULT_CITY);//возвращаю погоду йошкар олы
  initMap(DEFAULT_CITY);// и картинку
}

export function initWeather(city) {//
  getWeather(city)
    .then(data => drawWeather(data))//если все ок от отрисовываю погоду
    .catch(exp => console.error(exp));//если ошибка вывожу в консоль
}

export function drawWeather(data) {//отрисовываю погоду
  document.querySelector(".weather__city").textContent = data.name;
  document.querySelector(".weather__forecast").innerHTML = data.temp;
  document.querySelector(".weatherInfo").innerHTML = data.speed;
}

 export function addCity(city) {//добавляю строку
    const li = document.createElement("li");
    li.innerText = city;
  citiesElement.appendChild(li);
}

export function initMap(city){//добавляю картинку
  console.log(city);
  const img = document.getElementById("map");
  img.src = getSrcMap(city);
}

 function onClickItem(event) {
  console.log("hi");
  initWeather(event.target.innerText);
  initMap(event.target.innerText);
}

export async function onSubmit(ev) {
  ev.preventDefault();
  const formElement = ev.target;
  const input = formElement.querySelector(".cityInput");
  const value = input.value;
  console.log(value)
  input.value = "";
  let cities = await getStorage(STORAGE_CITIES);
  if (cities.length <= 10) {
    cities.push(value);
    await setStorage(STORAGE_CITIES, cities);//ели есть место добавляю город
    addCity(value);
  }
}


if(formElement){
  formElement.addEventListener("submit", onSubmit);
}
if(citiesElement){
  citiesElement.addEventListener("click", onClickItem);
}



