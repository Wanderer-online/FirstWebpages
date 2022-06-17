"use strict";
let numberOfFilms;

function starting() {
  do {
    numberOfFilms = +prompt("Сколько фильмов вы уже смотрели?", "");
  } while (
    numberOfFilms == "" ||
    numberOfFilms == null ||
    isNaN(numberOfFilms)
  );
}
starting();

const personalMovieDb = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privateBase: false,
};
let genres = [];

function rememberFilms() {
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
}
rememberFilms();

function movieManiacLevel() {
  if (personalMovieDb.count < 10) {
    console.log("not much");
  } else if (personalMovieDb.count >= 10 && personalMovieDb.count < 30) {
    console.log("normal");
  } else if (personalMovieDb.count >= 30) {
    console.log("movie maniac");
  } else {
    console.log("error");
  }
}
movieManiacLevel();

console.log(personalMovieDb["privateBase"]);

function showMyDb(hidden) {
  if (!hidden) {
    console.log(personalMovieDb);
  }
}
showMyDb(personalMovieDb["privateBase"]);

function writeYourGenres() {
  for (let i = 0; i < 3; i++) {
    genres[i] = prompt(`Ваш любимый жанр под номером ${i+1}`, "");//${i} работает только с ` этим символом known as "grave accents" - which you'll find next to the 1 key
  }
}
writeYourGenres();
