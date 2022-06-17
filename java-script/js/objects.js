"use strict";
const numberOfFilms = +prompt("Сколько фильмов вы уже смотрели?", "");

const personalMovieDb = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

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

if (personalMovieDb.count < 10) {
  console.log('not much');
} else if (personalMovieDb.count >= 10 && personalMovieDb.count < 30) {
  console.log('normal');
} else if (personalMovieDb.count >= 30) {
  console.log('movie maniac');
} else {
  console.log('error');
}

console.log(personalMovieDb);
