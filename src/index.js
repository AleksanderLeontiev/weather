(async function () {
// Получаем указатели на нужные элементы
    const formEl = document.querySelector("form");
    const listEl = document.querySelector(".list");
//let currentPlace =//текущее место
//читаем список
    async function readList() {
        const list = JSON.parse(localStorage.getItem("items"));
        if (list === null) {
            return [];
        }
        return list
    }

    const items = await readList();

    // Сохраняет список
    function saveList(items) {
        localStorage.setItem("items", JSON.stringify(items));
    }

// отрисовываем список
    async function drawList(listEl, items) {
        let lengthArr = `<ol class="list_li">${items.map((el) => `<li>${el}</li>`).join("")}</ol>`;
        listEl.innerHTML = lengthArr;
        let g = document.querySelector(".list_li");
        g.addEventListener("click",  (ev) => {
            console.log(ev.target.innerText);
          getWeather(ev.target.innerText);

        });

    }
//делаем запрос погоды на сервер
    async function getWeather(cityName) {
        let API_KEY = `2a65fd6cf7e06ab6144595db8eef6f98`;
        let inputUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`;
        let response = fetch(inputUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
//добавляем название города
                document.querySelector('.weather__city').textContent = data.name;
//data.main.temp содержит значение в Кельвинах, отнимаем от 273, чтобы получить значение в градусах Цельсия
                document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp) + '&deg;';
//Добавляем описание погоды
                document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
//Добавляем иконку погоды
                document.querySelector('.weatherInfo').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
//Добавляем скорость ветра
                document.querySelector('.weatherInfo').innerHTML = "wind: " + data.wind.speed + " m/s";
                return data
            });
    }
//вешаем событие на форму
    formEl.addEventListener(
        "submit",
        async (ev) => {
// чтобы не перезагружать страницу
            ev.preventDefault();
// читаем значение из формы
            const formElement = ev.target;
            const input = formElement.querySelector(".userInput");
            const cityName = input.value;
            const weather = await getWeather(cityName);
            const value = input.value;
            input.value = "";
            // добавляем элемент в список
            if (items.length <= 9) {
                items.push(value);
            } else {
                return items
            }
// обновляем список
            await drawList(listEl, items);
// сохраняем список
            saveList(items);
        });
// и отрисовываем список
    await drawList(listEl, items);
    await readList(listEl, items);
})();
//делаем запрос погоды на сервер

function initWeather(data) {
    document.querySelector('.weather__city').textContent = data.name;
//data.main.temp содержит значение в Кельвинах, отнимаем от 273, чтобы получить значение в градусах Цельсия
    document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp) + '&deg;';
//Добавляем описание погоды
    document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
//Добавляем иконку погоды
    document.querySelector('.weatherInfo').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
//Добавляем скорость ветра
    document.querySelector('.weatherInfo').innerHTML = "wind: " + data.wind.speed + " m/s"
}
async function getWeather(cityName) {
    let num = `2a65fd6cf7e06ab6144595db8eef6f98`;
    let inputUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${num}`;
    const data = await fetch(inputUrl).then(response => response.json());
    initWeather(data);
}

getWeather("Yoshkar-Ola");


//const API_GOOGLE = `AIzaSyBSO7CSJ7OymEHydoFSoDmoELVRmsisjKc`;
//https://maps.googleapis.com/maps/api/staticmap?center=Yoshkar-Ola,CA&zoom=14&size=400x400&key=AIzaSyBfIUYKoGtBYh2Uro2jytHp54YOYATuA_o
//http://maps.google.com/staticmap?center=56.315455,44.017152&zoom=15&size=400x400&key=AIzaSyBSO7CSJ7OymEHydoFSoDmoELVRmsisjKc=ru