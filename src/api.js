const appId = `2a65fd6cf7e06ab6144595db8eef6f98`;

export function getSrcMap(city) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${city},RU&zoom=14&size=400x400&key=AIzaSyDWml8rMJVcvqf6WhD0a9Z6q-PhrnnLb7A`;
}
export async function getWeather(cityName) {
  let inputUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${appId}`;
  return await fetch(inputUrl).then(response => response.json());
}