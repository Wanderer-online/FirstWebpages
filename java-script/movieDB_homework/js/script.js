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
  filmsListItems[i].innerHTML =
    `${i + 1} ${movieDB.movies[i]}` + "<div class='delete'></div>";
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

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

// Возьмите свой код из предыдущей практики

const inp = document.querySelector(".adding__input");
const formContainer = document.querySelector(".add");
const btn = formContainer.lastElementChild;
let chkBox = "";
for (let elem of formContainer.childNodes) {
  if (elem.type == "checkbox") {
    chkBox = elem;
    break;
  }
  // console.log(elem.type);
}
const delBtn = document.querySelectorAll(".delete");

// const chkBox = document.querySelector("checkbox");
console.log(chkBox);

//добавление в базу новых фильмов + обрезка до 21 символа
btn.addEventListener("click", function (event) {
  event.preventDefault();
  let userFilm = inp.value;
  // console.log(inp.value);
  if (userFilm.length > 21) {
    userFilm = userFilm.slice(0, 21) + "...";
  }

  if (chkBox.checked == true) {
    console.log("favorite");
  }

  movieDB.movies.push(userFilm);
  movieDB.movies.sort();
  console.log(movieDB.movies);
});


//удаление фильмов по нажатию на корзину (появляется при наведении на название)
console.log(delBtn);
delBtn.forEach((elem) => {
  elem.addEventListener("click", function (event) {
    // console.log(elem.parentElement);
    elem.parentElement.remove();
  });
});

// let res = serchInDB(inp.value);
//   if (res!= false){
//     res.remove();
//   }
function serchInDB(str) {
  movieDB.movies.forEach((elem) => {
    if (elem == str) {
      console.log(elem);
      return elem;
    } else {
      console.log("not found");
      return false;
    }
  });
}
