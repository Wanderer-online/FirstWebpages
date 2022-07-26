/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
//############################################# калькулятор каллорий

const calcResult = document.querySelector(".calculating__result span"); //span внутри искомого элемента
let sex, height, weight, age, activity;

if (localStorage.getItem("sex")) {
  sex = localStorage.getItem("sex");
} else {
  sex = "female";
  localStorage.setItem("sex", sex);
}
if (localStorage.getItem("activity")) {
  activity = localStorage.getItem("activity");
} else {
  activity = 1.375;
  localStorage.setItem("activity", activity);
}
if (localStorage.getItem("height")) {
  height = localStorage.getItem("height");
  document.querySelector("#height").value = height;
}
if (localStorage.getItem("weight")) {
  weight = localStorage.getItem("weight");
  document.querySelector("#weight").value = weight;
}
if (localStorage.getItem("age")) {
  age = localStorage.getItem("age");
  document.querySelector("#age").value = age;
}

function initCalcLocalSettings(selector, activeClass) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((elem) => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute("id") === localStorage.getItem("sex")) {
      elem.classList.add(activeClass);
    }
    if (
      elem.getAttribute("data-activity") === localStorage.getItem("activity")
    ) {
      elem.classList.add(activeClass);
    }
  });
}
initCalcLocalSettings("#gender div", "calculating__choose-item_active");
initCalcLocalSettings(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);

function calcCalories() {
  if (!sex || !height || !weight || !age || !activity) {
    calcResult.textContent = "0.0";
    return;
  }
  if (sex === "female") {
    calcResult.textContent = (
      (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) *
      activity
    ).toFixed(2);
  } else {
    calcResult.textContent = (
      (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) *
      activity
    ).toFixed(2);
  }
}
calcCalories();

function getCalcStaticData(Selector, activeClass) {
  const allElements = document.querySelectorAll(`${Selector}`); //получить все div внутри родителя

  // document.querySelector(parentSelector).addEventListener("click", (e) => {
  // if (e.target.classList.contains("calculating__choose-item")) {//убедимся что кликаем именно по кнопке, а не родителю

  allElements.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      //есть 2 ряда кнопок - 1 с id, 2 с data-activity="число"
      if (e.target.getAttribute("data-activity")) {
        activity = +e.target.getAttribute("data-activity");
        localStorage.setItem("activity", activity);
      } else {
        sex = e.target.getAttribute("id");
        localStorage.setItem("sex", sex);
      }

      allElements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });
      e.target.classList.add(activeClass);

      calcCalories();
    });
  });
}

getCalcStaticData("#gender div", "calculating__choose-item_active");
getCalcStaticData(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);

function getCalcDynamicData(selector) {
  const input = document.querySelector(selector);
  input.addEventListener("input", () => {
    if (input.value.match(/\D/g)) {
      input.style.border = "1px solid red";
    } else {
      input.style.border = "none";
    }

    switch (input.getAttribute("id")) {
      case "height":
        height = +input.value;
        localStorage.setItem("height", height);
        break;
      case "weight":
        weight = +input.value;
        localStorage.setItem("weight", weight);
        break;
      case "age":
        age = +input.value;
        localStorage.setItem("age", age);
        break;
    }
    // console.log(height,weight,age);
    calcCalories();
  });
}

getCalcDynamicData("#height");
getCalcDynamicData("#weight");
getCalcDynamicData("#age");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/card-classes.js":
/*!************************************!*\
  !*** ./js/modules/card-classes.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cardClasses(){

//############################################# классы для карточек меню menu__field

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes; //[]
      this.transfer = 27; //добавить динамическое получение курса валюты НБУ
      this.changeToUAH(); //вызов метода класса прямо в нем самом
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // const getResources = async (url) => {
  //   const result = await fetch(url);
  //   if (!result.ok) {
  //     throw new Error(`fetch failed ${url}, status ${result.status}`);
  //   }

  //   return await result.json();
  // };

  //с сервера приходит массив "menu" с объектами. forEach перебирает каждый элемент, внутри деструктуризация по частям, их передаем внутрь конструктора класса, который создает карточку
  //({img, altimg, title, descr, price}) - деструктуризация, вместо object, чтобы потом не обращаться к элементам object.img...

  // getResources("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });


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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cardClasses);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _show_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./show-modal */ "./js/modules/show-modal.js");
/* harmony import */ var _services_post_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/post-data */ "./js/services/post-data.js");


function forms(formSelector,modalTimerID){

//############################################# Формы. Отправка данных на сервер

const forms = document.querySelectorAll(formSelector);

const message = {
  loading: "img/forms/054 spinner.svg",
  success: "Спасибо! Скоро мы с вами свяжемся",
  faulure: "Что-то пошло не так",
};

forms.forEach((elem) => {
  bindPostData(elem);
});



function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let statusMessage = document.createElement("img");
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
    display: block;
    margin: 10px auto;
    `;
    // form.append(statusMessage);
    form.append(statusMessage);

    //в формах в html всегда должны быть уникальные name="уникальное_имя"! Иначе FormData не сможет найти input-ы и взять из них данные.
    // request.setRequestHeader("Content-type", "multipart/form-data");//в связке XMLHttpRequest и form-data заголовок устанавливать не нужно! он ставится автоматически. Если его установить вручную - то данные просто не дойдут
    const formData = new FormData(form);
    // console.log(formData);

    //пояснение: сначала берем содержимое formData и превращаем в массив массивов, затем результат превращаем обратно в объект. Потом это все конвертируем в формато JSON
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    //пример
    //const sampleObject = {a:22,b:33};
    // console.log(Object.entries(sampleObject));//выдаст [["a",22],["b",33]]
    //console.log(Object.entries(sampleObject))
    // console.log(Object.fromEntries([["a",22],["b",33]]));//выдаст { a: 22, b: 33 }

    //const someObject = {}; //промежуточный объект
    // formData.forEach(function (value, key) {
    //   someObject[key] = value;
    // });
    // console.log(someObject);

    // const json = JSON.stringify(someObject);
    // console.log(json);

    //если внутри fetch промис попадает на ошибку с http (404) он не выдаст reject.
    (0,_services_post_data__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        (0,_show_modal__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(message.success,modalTimerID);
        statusMessage.remove();
        console.log("statusMessage= " + statusMessage);
      })
      .catch((e) => {
        console.log(e);
        (0,_show_modal__WEBPACK_IMPORTED_MODULE_0__.showThanksModal)(message.faulure + e,modalTimerID);
      })
      .finally(() => {
        form.reset();
      });
  });
}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove("show");
  modalWindow.classList.add("hide");
  //modalWindow.classList.toggle("show");
  document.body.style.overflow = ""; //scroll выставится по умолчанию
}
function openModal(modalSelector, modalTimerID) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  //modalWindow.classList.toggle("show");
  document.body.style.overflow = "hidden";
  console.log(modalTimerID);
  if (modalTimerID){
  clearInterval(modalTimerID);}

}
function modal(triggerSelector, modalSelector,modalTimerID) {
  //############################################# modal window "связаться с нами"
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);



  modalTrigger.forEach((elem) => {
    elem.addEventListener("click", () => {
      openModal(modalSelector,modalTimerID);
    });
  });



  //закрываем модальное окно если клик вне пределов его содержимого
  //modalWindow = это контейнер для modal__dialog. если клик внутри modalWindow и только по нему - закрыть, если где-то еще (по самому телу диалога) - ничего не делать
  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  //коды можно нагуглить или посмотреть на сайте keycode.info
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });


  function showModalByScroll() {
    //прокрутка страницы вниз + видимая высота окна >= общая высота документа (пролистано до самого конца)
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector,modalTimerID);
      window.removeEventListener("scroll", showModalByScroll); //удалить обработчик можно и так - точно повторив то, что было назначено в его объявлении
      clearInterval(modalTimerID);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/show-modal.js":
/*!**********************************!*\
  !*** ./js/modules/show-modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showThanksModal": () => (/* binding */ showThanksModal)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


//############################################# показ модального окна (modal__content)
function showThanksModal(message,modalTimerID) {
  const originalDialog = document.querySelector(".modal__content");
  console.log(originalDialog);
  originalDialog.classList.add("hide");
  (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal",modalTimerID);

  const ThanksModal = document.createElement("div");
  ThanksModal.classList.add("modal__content");
  ThanksModal.innerHTML = `
    <div class="modal__close" data-close>×</div>
    <div class="modal__title">${message}</div>
  `;

  document.querySelector(".modal__dialog").append(ThanksModal);
  setTimeout(() => {
    ThanksModal.remove();
    originalDialog.classList.add("show");
    originalDialog.classList.remove("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
  }, 4000);
}


function showModal(){


  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showModal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");
// import tabs from "./modules/tabs";

function slider({container, nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}){

//############################################# слайдер картинок
function SliderNavigation(sliderNumber) {
  slidesField.style.transform = `translateX(-${
    sliderNumber * widthNum - widthNum
  }px)`;
  currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZeroToNumbers)(sliderNumber);

  //убираем у всех навигационных элементов  класс активности
  dots.forEach((elem) => {
    elem.classList.remove("dot-active");
  });
  //находим соответствующий навигационный элемент по data- аттрибуту и добавляем ему класс активности
  document
    .querySelector(`[data-number="${sliderNumber}"]`)
    .classList.add("dot-active");
  current = sliderNumber;
}
  // мое решение
  const prevSlide = document.querySelector(prevArrow),
    nextSlide = document.querySelector(nextArrow),
    currentSlide = document.querySelector(currentCounter),
    totalSlides = document.querySelector(totalCounter),
    sliderImages = document.querySelectorAll(container),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field);
  let widthPx = window.getComputedStyle(slidesWrapper).width; //ширина 1 слайда
  // const widthNum = Math.floor(widthPx.slice(0, widthPx.length - 2));
  // const widthNum = Math.floor(widthPx.replace(/\D/g,""));//заменяем не числа на ""
  const widthNum = Math.floor((0,_timer__WEBPACK_IMPORTED_MODULE_0__.getNumbersOnly)(widthPx));
  widthPx = widthNum + "px";

  let current = 1;

  totalSlides.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZeroToNumbers)(sliderImages.length);

  slidesField.style.width = 100 * sliderImages.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";
  sliderImages.forEach((slide) => {
    slide.style.width = widthPx;
  });
  nextSlide.addEventListener("click", function () {
    // + к offset добавляется ширина еще 1 слайда и вся линия слайдов будет смещаться на ширину 1 слайда ->
    if (current == sliderImages.length) {
      //width = "500px"
      current = 1;
    } else {
      current += 1;
    }

    SliderNavigation(current);
  });
  prevSlide.addEventListener("click", function () {
    // - от offset отнимается ширина еще 1 слайда и вся линия слайдов будет смещаться на ширину 1 слайда <-
    if (current == 1) {
      //width = "500px"
      current = sliderImages.length;
    } else {
      current -= 1;
    }
    SliderNavigation(current);
  });


  //############################################# навигация для слайдов
const sliderContainer = document.querySelector(".offer__slider"),
sliderIndicators = document.createElement("ol"),
dots = [];

sliderContainer.style.position = "relative";
sliderIndicators.classList.add("carousel-indicators");
sliderContainer.append(sliderIndicators);
//.dataset.imageNumber = i;

for (let i = 1; i <= sliderImages.length; i++) {
const dot = document.createElement("li");
dot.setAttribute("data-number", i);
dot.classList.add("dot");
sliderIndicators.append(dot);

dots.push(dot);
// sliderIndicators.innerHTML+= `
// <li class="dot" data-number="${i}"></li>
// `;
}

dots.forEach((dot) => {
dot.addEventListener("click", (e) => {
  const slideTo = e.target.getAttribute("data-number");

  SliderNavigation(parseInt(slideTo));
});
});
sliderIndicators.addEventListener("click", (event) => {
const target = event.target;
// console.log(target);
if (target.classList.contains("dot")) {
  SliderNavigation(parseInt(target.dataset.number)); //dataset - чтение data-* аттрибута    number из data-number
}
});

// console.log(allSliderIndicators);

SliderNavigation(1);

// prevSlide.addEventListener("click", function () {
//   // -
//   renderSliderImage(-1);
// });
// nextSlide.addEventListener("click", function () {
//   // +
//   renderSliderImage(1);
// });

// function renderSliderImage(number) {
//   current+=number;
//   if (current >= sliderImages.length) {
//     current = 0;
//   }
//   if (current < 0) {
//     current = sliderImages.length-1;
//   }

//   hideCollectionContent(sliderImages);
//   showCollectionContent(sliderImages, current);
//   currentSlide.textContent = addZeroToNumbers(current + 1);
// }

// renderSliderImage(0);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);
// export {SliderNavigation};


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector,tabsContentSelector,tabsParentSelector, activeClass){

//############################################# Tabs
const tabs = document.querySelectorAll(tabsSelector),
tabsContent = document.querySelectorAll(tabsContentSelector),
tabsParent = document.querySelector(tabsParentSelector);

function hideCollectionContent(Collection) {
Collection.forEach((element) => {
  element.classList.add("hide");
  element.classList.remove("show", "fade"); //если не удалить то во второй раз анимация не воспроизведется
});
}
function showCollectionContent(Collection, i = 0) {
//значение по умолчанию для вызова без параметров
Collection[i].classList.add("show", "fade");
Collection[i].classList.remove("hide");
}

function hideTabContent() {
hideCollectionContent(tabsContent);
tabs.forEach((tab) => {
  tab.classList.remove(activeClass);
});
}
function showTabContent(i = 0) {
//значение по умолчанию для вызова без параметров
showCollectionContent(tabsContent, i);
tabs[i].classList.add(activeClass);
}

hideTabContent();
showTabContent();

//здесь идет перебор элементов содержащихся в родителе для переключателей табов пока не будет найден тот, который вызвал событие click. После того как все табы скрываются, его номер позиции в этом родителе передается как номер включаемого таба

//предполагается что в html порядок табов и порядок их переключалей совпадает
tabsParent.addEventListener("click", (event) => {
const target = event.target;
console.log(target);
if (target && target.classList.contains(tabsSelector.slice(1))) {//tabsSelector = ".tabheader__item", а нужно "tabheader__item"
  tabs.forEach((item, i) => {
    if (target == item) {
      console.log(item);

      hideTabContent();
      showTabContent(i);
    }
  });
}
});
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addZeroToNumbers": () => (/* binding */ addZeroToNumbers),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getNumbersOnly": () => (/* binding */ getNumbersOnly)
/* harmony export */ });
//*************** часто встречающаяся задача
function addZeroToNumbers(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function getNumbersOnly(str) {
  return parseFloat(str);
  // str.replace(/\W/g, "");
}

function timer(id,deadLine){

//############################################# Timer


function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}



function setClock(selector, endtime) {
  //".timer"
  const timer = document.querySelector(selector),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds"),
    timeInterval = setInterval(updateClock, 1000); //запустится только через 1 секунду. пользователь может увидеть мигание

  updateClock(); //чтобы избежать мигания вызываем эту функцию сразу после запуска скрипта

  function updateClock() {
    const t = getTimeRemaining(endtime);
    days.innerHTML = addZeroToNumbers(t.days);
    hours.innerHTML = addZeroToNumbers(t.hours);
    minutes.innerHTML = addZeroToNumbers(t.minutes);
    seconds.innerHTML = addZeroToNumbers(t.seconds);

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
}

setClock(id, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);




/***/ }),

/***/ "./js/services/post-data.js":
/*!**********************************!*\
  !*** ./js/services/post-data.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//это асинхронный участок кода, значит нужно async (ставится перед функцией в месте ее объявления) await (ставится перед каждой операцией, которую нужно дождаться)
const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });

    // console.log(result);
    return await result.json();
  };
  


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_card_classes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/card-classes */ "./js/modules/card-classes.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_show_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/show-modal */ "./js/modules/show-modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


//cd "G:\VS Code HTML Projects\FirstWebpages\java-script\part2\project"
//npm init -y
//npx webpack

// импорт возможен только на самом верхнем уровне видимости










window.document.addEventListener("DOMContentLoaded", () => {
  //                                                      ************ раскомментировать перед деплоем
  const modalTimerID = setTimeout(() => {
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimerID);
    console.log("timer-set");
  }, 30000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerID);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_card_classes__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimerID);
  (0,_modules_show_modal__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    prevArrow:".offer__slider-prev",
    totalCounter:"#total",
    field:".offer__slider-inner",
    nextArrow:".offer__slider-next",
    currentCounter:"#current",
    wrapper:".offer__slider",
    container:".offer__slide"
  });

  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])(".timer", "2022-09-12");
});

})();

/******/ })()
;
//# sourceMappingURL=compiled.js.map