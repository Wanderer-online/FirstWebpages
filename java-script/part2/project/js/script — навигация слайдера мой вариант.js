"use strict";
//############################################# Tabs
window.document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

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
      tab.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    //значение по умолчанию для вызова без параметров
    showCollectionContent(tabsContent, i);
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
    modalWindow = document.querySelector(".modal");

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

  //закрываем модальное окно если клик вне пределов его содержимого
  //modalWindow = это контейнер для modal__dialog. если клик внутри modalWindow и только по нему - закрыть, если где-то еще (по самому телу диалога) - ничего не делать
  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
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

  //############################################# слайдер картинок
  // мое решение
  const prevSlide = document.querySelector(".offer__slider-prev"),
    nextSlide = document.querySelector(".offer__slider-next"),
    currentSlide = document.querySelector("#current"),
    totalSlides = document.querySelector("#total"),
    sliderImages = document.querySelectorAll(".offer__slide"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner");
  let widthPx = window.getComputedStyle(slidesWrapper).width; //ширина 1 слайда
  //без округления херня получается
  const widthNum = Math.floor(widthPx.slice(0, widthPx.length - 2));
  widthPx = widthNum + "px";

  let current = 1;

  totalSlides.textContent = addZeroToNumbers(sliderImages.length);

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

  function SliderNavigation(sliderNumber){
    slidesField.style.transform = `translateX(-${sliderNumber*widthNum-widthNum}px)`;
    currentSlide.textContent = addZeroToNumbers(sliderNumber);

    //убираем у всех навигационных элементов  класс активности
    allSliderIndicators.forEach(elem =>{elem.classList.remove("dot-active");});
    //находим соответствующий навигационный элемент по data- аттрибуту и добавляем ему класс активности
    document.querySelector(`[data-number="${sliderNumber}"]`).classList.add("dot-active");
  }

  //############################################# навигация для слайдов
  const sliderContainer = document.querySelector(".offer__slider"),
    sliderIndicators = document.createElement("div");

  sliderContainer.style.position = "relative";
  sliderIndicators.classList.add("carousel-indicators");
  sliderContainer.append(sliderIndicators);
  //.dataset.imageNumber = i;


  for (let i = 1; i <= sliderImages.length; i++) {
    sliderIndicators.innerHTML+= `
    <div class="dot" data-number="${i}"></div>
    `;
  }
  const allSliderIndicators = sliderIndicators.querySelectorAll(".dot");

  sliderIndicators.addEventListener("click", (event) => {
    const target = event.target;
    // console.log(target);
    if (target.classList.contains("dot")) {
      SliderNavigation(parseInt(target.dataset.number));//dataset - чтение data-* аттрибута    number из data-number
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

  //############################################# Формы. Отправка данных на сервер

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/forms/054 spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    faulure: "Что-то пошло не так",
  };

  forms.forEach((elem) => {
    bindPostData(elem);
  });

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
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
          console.log("statusMessage= " + statusMessage);
        })
        .catch((e) => {
          console.log(e);
          showThanksModal(message.faulure + e);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  //############################################# показ модального окна (modal__content)

  function showThanksModal(message) {
    const originalDialog = document.querySelector(".modal__content");
    console.log(originalDialog);
    originalDialog.classList.add("hide");
    openModal();

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
      closeModal();
    }, 4000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
});
