## Application for displaying weather at user request

## [![codecov](https://codecov.io/gh/AleksanderLeontiev/weather/branch/weather/graph/badge.svg?token=ZAN3DJK0UL)](https://codecov.io/gh/AleksanderLeontiev/weather)

The user enters the name of the city in the input field, then clicks the "find out the weather" button. As a result, the screen displays the weather forecast and maps for the selected city. The app stores the last 10 cities that were searched. The user can select them from the list and see the weather forecast and map.

All the code is located in the src folder and is divided into modules: app, api, storage, index. Start running the application with index.js. Api.js provides methods for getting weather forecast and maps. Storage.js provides methods for reading and saving a list of cities. App .js provides source of map image and current weather.
