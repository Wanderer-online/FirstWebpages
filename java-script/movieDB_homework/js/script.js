/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

document.querySelector(".promo__adv").remove();
document.querySelector(".promo__genre").innerHTML = "Драма";

document.querySelector(".promo__bg").style.background =
  "url('img/bg.jpg') center center/cover no-repeat";

for (let i = 0; i < movieDB.movies.length; i++) {
  movieDB.movies[i] = movieDB.movies[i].toLowerCase();
}

// movieDB.movies.forEach(movie =>{movie = movie.toLowerCase();});
// console.log(movieDB.movies);

movieDB.movies.sort();
// console.log(movieDB.movies);

let filmsListItems = document.getElementsByClassName("promo__interactive-item");

for (let i = 0; i < movieDB.movies.length; i++) {
  // console.log(filmsListItems[i]);
  filmsListItems[i].innerHTML = `${i + 1} ${movieDB.movies[i]}`;
}
// document.querySelector(".promo__interactive-list").replaceWith("");

//*******правильное решение:
// const adv = document.querySelectorAll(".promo__adv img"), //возвращает коллекцию!
//   poster = document.querySelector(".promo__bg"),
//   genre = poster.querySelector(".promo__genre"),
//   movielist = document.querySelector(".promo__interactive-list");

// adv.forEach((item) => {
//   item.remove();
// });

// genre.textContent = "драма";

// poster.style.backgroundImage = "url('img/bg.jpg')"; //путь относительно html

// movielist.innerHTML = "";

// movieDB.movies.sort();

// movieDB.movies.forEach((film, i) => {
//   movielist.innerHTML += `
//     <li class="promo__interactive-item">${i+1} ${film}
//         <div class="delete"></div>
//     </li>
//     `;
// });
