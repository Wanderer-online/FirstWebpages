function tabs(){

//############################################# Tabs
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
}
module.exports = tabs;
