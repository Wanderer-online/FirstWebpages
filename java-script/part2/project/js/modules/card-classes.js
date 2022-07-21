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
}
  module.exports = cardClasses;
