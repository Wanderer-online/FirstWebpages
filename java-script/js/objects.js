"use strict";

const personalMovieDb = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privateBase: false,
  starting: function () {
    do {
      personalMovieDb.count = +prompt("Сколько фильмов вы уже смотрели?", "");
    } while (
      personalMovieDb.count == "" ||
      personalMovieDb.count == null ||
      isNaN(personalMovieDb.count)
    );
  },
  rememberFilms: function () {
    for (let i = 0; i < 2; i++) {
      const filmName = prompt("Один из последних просмотренных фильмов?", ""),
        filmDegree = +prompt("На сколько оцените его?", "");

      if (
        filmName != null &&
        filmName != "" &&
        filmDegree != null &&
        filmDegree != "" &&
        filmName.length < 50
      ) {
        personalMovieDb.movies[filmName] = filmDegree;
      } else {
        i -= 1;
      }
    }
  },
  movieManiacLevel: function () {
    if (personalMovieDb.count < 10) {
      console.log("not much");
    } else if (personalMovieDb.count >= 10 && personalMovieDb.count < 30) {
      console.log("normal");
    } else if (personalMovieDb.count >= 30) {
      console.log("movie maniac");
    } else {
      console.log("error");
    }
  },
  toggleVisibleMyDB: function () {
    personalMovieDb.privateBase = !personalMovieDb.privateBase;
  },
  showMyDb: function (hidden) {
    if (!hidden) {
      console.log(personalMovieDb);
    }
  },
  writeYourGenres: function () {
    for (let i = 0; i < 3; i++) {
      personalMovieDb.genres[i] = prompt(
        `Ваш любимый жанр под номером ${i + 1}`,
        ""
      ); //${i} работает только с ` этим символом known as "grave accents" - which you'll find next to the 1 key
      if (personalMovieDb.genres[i] == "" || personalMovieDb.genres[i] == undefined){
        i--;
        console.log("wrong input");
      }
    }
    personalMovieDb.genres.forEach((item, i) => {
      console.log(`любимый жанр ${i+1} - это ${item}`);
    })
  },
};
personalMovieDb.starting();
