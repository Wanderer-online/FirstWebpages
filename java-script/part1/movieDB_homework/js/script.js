/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

"use strict";

//ожидание загрузки DOM структуры. (вместо document может быть window)
document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  //удаление рекламы обернутое в функцию
  const deleteAdv = (add) => {
    add.remove();
  };
  deleteAdv(document.querySelector(".promo__adv"));

  const makeChanges = () => {
    document.querySelector(".promo__genre").innerHTML = "Драма";

    document.querySelector(".promo__bg").style.background =
      "url('img/bg.jpg') center center/cover no-repeat";
  };
  makeChanges();

  const sortArray = (arr) => {
    arr.sort();
  };

  for (let i = 0; i < movieDB.movies.length; i++) {
    movieDB.movies[i] = movieDB.movies[i].toLowerCase();
  }

  // movieDB.movies.forEach(movie =>{movie = movie.toLowerCase();});
  // console.log(movieDB.movies);

  //*******было переделано в функцию createMovieList
  // movieDB.movies.sort();
  // // console.log(movieDB.movies);

  // let filmsListItems = document.getElementsByClassName(
  //   "promo__interactive-item"
  // );

  // for (let i = 0; i < movieDB.movies.length; i++) {
  //   // console.log(filmsListItems[i]);
  //   filmsListItems[i].innerHTML =
  //     `${i + 1} ${movieDB.movies[i]}` + "<div class='delete'></div>";
  // }
  const filmsList = document.querySelector(".promo__interactive-list");

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
  const formContainer = document.querySelector("form.add"); //вместо просто .add чтобы точнее попасть на нужную форму если их много
  const btn = formContainer.lastElementChild;

  const chkBox = formContainer.querySelector('[type="checkbox"]'); //поиск чекбокса по атрибуту

  //мое решение по поиску чекбокса
  // let chkBox = "";
  // for (let elem of formContainer.childNodes) {
  //   if (elem.type == "checkbox") {
  //     chkBox = elem;
  //     break;
  //   }
  //   // console.log(elem.type);
  // }
  // const delBtn = document.querySelectorAll(".delete");//эти кнопки добавляются и удаляются динамически. т.е. константы не катят

  // const chkBox = document.querySelector("checkbox");
  console.log(chkBox);

  //добавление в базу новых фильмов + обрезка до 21 символа

  //мое решение по добавлению события для кнопки
  // btn.addEventListener("click", function (event) {
  formContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    let userFilm = inp.value.toLowerCase();
    if (userFilm != "") {
      //здесь можно использовать динамическую типизацию - пустая строка = false
      // console.log(inp.value);
      if (userFilm.length > 21) {
        userFilm = userFilm.slice(0, 21) + "...";
        // userFilm = `${userFilm.substring(0, 22)} ...`;
      }

      if (chkBox.checked == true) {
        console.log("favorite");
      }

      movieDB.movies.push(userFilm);
      console.log(movieDB.movies);
      createMovieList(movieDB.movies, filmsList);
      //очистка поля ввода в форме
      //а так не работает:inp.reset();
      event.target.reset();
    }
  });

  function createMovieList(films, parent) {
    // movieDB.movies.sort();
    sortArray(films);
    // console.log(movieDB.movies);
    console.log(parent);
    parent.innerHTML = "";

    films.forEach((film, i) => {
      parent.innerHTML += `<li class="promo__interactive-item"> ${i + 1} ${film}
      <div class="delete"></div>
      </li>`;
      });
    //удаление элементов из html и объекта базы по нажатию на корзинку

    let delBtn = document.querySelectorAll(".delete");//их каждый раз надо искать заново, потому что весь список меняется
    delBtn.forEach((elem, i) => {
      console.log(elem.parentElement);
      elem.addEventListener("click", function () {
        elem.parentElement.remove();
        films.splice(i, 1); //вырезает определенный элемент из массива splice(номер элемента, сколько удалить)
        createMovieList(films, parent); //рекурсивный вызов нужен для того чтобы нумерация изменялась при удалении элементов
      });
    });
  }
  createMovieList(movieDB.movies, filmsList);

  //удаление фильмов по нажатию на корзину (появляется при наведении на название)
  // console.log(delBtn);
  // delBtn.forEach((elem) => {
  //   elem.addEventListener("click", function (event) {
  //     // console.log(elem.parentElement);
  //     elem.parentElement.remove();
  //   });
  // });

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
});
