// 1. Postman - використовується для створення запиту на backend без написання коду
// 2. Корисна інформація та АРІ для тесту
// https://www.weatherapi.com/
// https://uk.wikipedia.org/wiki/SOAP
// https://uk.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D1%96%D0%B2_%D1%81%D1%82%D0%B0%D0%BD%D1%83_HTTP#4xx_%D0%9A%D0%BB%D1%96%D1%94%D0%BD%D1%82%D1%81%D1%8C%D0%BA%D0%B0_%D0%BF%D0%BE%D0%BC%D0%B8%D0%BB%D0%BA%D0%B0
// https://www.weatherapi.com/docs/
// https://api.privatbank.ua/#p24/exchange
// https://handlebarsjs.com/guide/#what-is-handlebars
// https://swapi.dev/
// https://www.udemy.com/

// 3. Синтаксис
// ?- вказує на старт параметрів запиту.
// пара ім'я=значення.
// & використовується для зазначення смислового «І», розділяючи параметри в рядку запиту.
// Приклад :const url = "https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name";

// 4. Створення прогноза погоди
// - за допомогою Poatman створили запит http://api.weatherapi.com/v1/forecast.json?key=453cf0534c434bc7ba1221606230212 &q=Paris&days=5

const search = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
// Додаємо слухача на форму
search.addEventListener('submit', onSearch);
function onSearch(event) {
  event.preventDefault();
  // Робимо деструктуризацію,
  const { query, days } = event.currentTarget.elements;
  //   Функція отримання значень
  getWeather(query.value, days.value)
    .then(data => (list.innerHTML = createMarkup(data.forecast.forecastday)))
    .catch(err => console.log(err));
}
// Запит на backend
function getWeather(city, days) {
  // http://api.weatherapi.com/v1/forecast.json?key=453cf0534c434bc7ba1221606230212 &q=Paris&days=5
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const API_KEY = '47cce444510845a3b5890337232811';
  return fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`
  ).then(response => {
    // перевірка статусу ok : true  aбо false
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
// Створення розмітки
function createMarkup(arr) {
  // Перебираємо отриманий масив
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { icon, text },
        },
      }) =>
        `<li>
        <img src="${icon}" alt="${text}" />
        <p>${text}</p>
        <h2>${date}</h2>
        <h3>${avgtemp_c}</h3>
      </li>`
    )
    .join('');
}
