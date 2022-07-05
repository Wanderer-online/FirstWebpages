"use strict";
//############################################# Tabs
window.document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((element) => {
      element.classList.add("hide");
      element.classList.remove("show", "fade"); //если не удалить то во второй раз анимация не воспроизведется
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    //значение по умолчанию для вызова без параметров
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  //здесь идет перебор элементов содержащихся в родителе для переключателей табов пока не будет найден тот, который вызвал событие click. После того как все табы скрываются, его номер позиции в этом родителе передается как номер включаемого таба

  //предполагается что в html порядок табов и порядок их переключалей совпадает
  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    console.log(target);
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          console.log(item);

          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //############################################# Timer
  const deadLine = "2022-09-12";

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

  //*************** часто встречающаяся задача
  function addZeroToNumbers(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
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

  setClock(".timer", deadLine);

  //############################################# modal window "связаться с нами"
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modalWindow = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]");

  function openModal() {
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    //modalWindow.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerID);
  }

  modalTrigger.forEach((elem) => {
    elem.addEventListener("click", () => {
      openModal();
    });
  });

  function closeModal() {
    modalWindow.classList.remove("show");
    modalWindow.classList.add("hide");
    //modalWindow.classList.toggle("show");
    document.body.style.overflow = ""; //scroll выставится по умолчанию
  }

  modalClose.addEventListener("click", closeModal);

  //закрываем модальное окно если клик вне пределов его содержимого
  //modalWindow = это контейнер для modal__dialog. если клик внутри modalWindow и только по нему - закрыть, если где-то еще (по самому телу диалога) - ничего не делать
  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow) {
      closeModal();
    }
  });

  //коды можно нагуглить или посмотреть на сайте keycode.info
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerID = setTimeout(openModal, 30000);

  function showModalByScroll() {
    //прокрутка страницы вниз + видимая высота окна >= общая высота документа (пролистано до самого конца)
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll); //удалить обработчик можно и так - точно повторив то, что было назначено в его объявлении
      clearInterval(modalTimerID);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  //############################################# Мой вариант решения для Шаблоны карточек меню menu__field
  //чтобы посмотреть - надо расскомментировать в html исходные элементы ибо я делал на основе замены их содержимого, а не создания новых элементов
  const cardsContainer = document.querySelector(".menu__field > .container");
  const cards = cardsContainer.querySelectorAll(".menu__item");
  // console.log(cards[0]);

  class MenuCard {
    constructor(title, image, description, price) {
      this.title = title;
      this.image = image;
      this.description = description;
      this.price = price;
    }
    addToDocument(count) {
      //0-2
      let card = cards[count];
      console.log(card);
      card.querySelector(".menu__item-subtitle").textContent = this.title;
      card.querySelector("img").src = this.image;
      card.querySelector("img").alt = this.title;
      card.querySelector(".menu__item-descr").textContent = this.description;
      card.querySelector(".menu__item-total > span").textContent = this.price;
    }
  }

  const cardContentDB = {
    title: ["Меню \"Фитнес\"", "Меню \“Премиум\”", "Меню \"Постное\""],
    image: ["img/tabs/vegy.jpg", "img/tabs/elite.jpg", "img/tabs/post.jpg"],
    description: [
      'Меню "Фитнес - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.'
    ],
    price: [229, 550, 430],
  };

  const cardFitness = new MenuCard(
    cardContentDB.title[0],
    cardContentDB.image[0],
    cardContentDB.description[0],
    cardContentDB.price[0]
  );
// console.log(cardFitness);
  const cardPremium = new MenuCard(
    cardContentDB.title[1],
    cardContentDB.image[1],
    cardContentDB.description[1],
    cardContentDB.price[1]
  );
  // console.log(cardPremium);
  const cardPost = new MenuCard(
    cardContentDB.title[2],
    cardContentDB.image[2],
    cardContentDB.description[2],
    cardContentDB.price[2]
  );
  // console.log(cardPost);
  cardFitness.addToDocument(0);
  cardPremium.addToDocument(1);
  cardPost.addToDocument(2);



  // cards.forEach((item, i)=>{
  //   console.log(item);

  // });
});
