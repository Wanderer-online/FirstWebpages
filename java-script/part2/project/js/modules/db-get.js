function dbGet(){

//############################################# получение содержимого карточек товаров из db.json

axios
.get("http://localhost:3000/menu")
.then(function (response) {
  response.data.forEach(({ img, altimg, title, descr, price }) => {
    // handle success
    // console.log(response);
    new MenuCard(
      img,
      altimg,
      title,
      descr,
      price,
      ".menu .container"
    ).render();
  });
})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});

//альтернативное решение без использования класса
// getResources("http://localhost:3000/menu").then((data) => createCard(data));

// function createCard(data) {
//   data.forEach(({ img, altimg, title, descr, price }) => {
//     const element = document.createElement("div");
//     element.classList.add("menu__item");
//     element.innerHTML = `<img src=${img} alt=${altimg}>
//     <h3 class="menu__item-subtitle">${title}</h3>
//     <div class="menu__item-descr">${descr}</div>
//     <div class="menu__item-divider"></div>
//     <div class="menu__item-price">
//         <div class="menu__item-cost">Цена:</div>
//         <div class="menu__item-total"><span>${price*27}</span> грн/день</div>
//     </div>`;

//     document.querySelector(".menu .container").append(element);
//   });
// }

//объект может существовать и без переменной в которую его положили
//при таком создании объекта посредством класса, сразу же будет вызван метод render. После отработки метода объект исчезнет, и к нему не будет доступа через js... однако в этом случае он и не нужен

// передавать аргументы лучше сразу в кавычках, а не оставлять их в куске верстки

// const card1 = new MenuCard();
// card1.render();
}
module.exports = dbGet;
