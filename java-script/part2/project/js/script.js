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

  //                                                      ************ раскомментировать перед деплоем
  // const modalTimerID = setTimeout(openModal, 30000);

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

  //объект может существовать и без переменной в которую его положили
  //при таком создании объекта посредством класса, сразу же будет вызван метод render. После отработки метода объект исчезнет, и к нему не будет доступа через js... однако в этом случае он и не нужен
  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "premium",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    21,
    ".menu .container",
    "menu__item"
  ).render();

  // передавать аргументы лучше сразу в кавычках, а не оставлять их в куске верстки

  // const card1 = new MenuCard();
  // card1.render();

  //############################################# Формы. Отправка данных на сервер

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "Загрузка",
    success: "Спасибо! Скоро мы с вами свяжемся",
    faulure: "Что-то пошло не так",
  };

  forms.forEach((elem) => {
    postData(elem);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");

      //в формах в html всегда должны быть уникальные name="уникальное_имя"! Иначе FormData не сможет найти input-ы и взять из них данные.
      // request.setRequestHeader("Content-type", "multipart/form-data");//в связке XMLHttpRequest и form-data заголовок устанавливать не нужно! он ставится автоматически. Если его установить вручную - то данные просто не дойдут
      request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);
      console.log(formData);
      const someObject = {};//промежуточный объект
      formData.forEach(function(value,key){
        someObject[key] = value;
      });
      console.log(someObject);

      const json = JSON.stringify(someObject);
      console.log(json);


      // request.send(formData);
      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(()=>{
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.faulure;
        }
      });
    });
  }
});
