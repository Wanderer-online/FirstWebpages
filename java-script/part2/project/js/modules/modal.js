function modal(){

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
}
module.exports = modal;
