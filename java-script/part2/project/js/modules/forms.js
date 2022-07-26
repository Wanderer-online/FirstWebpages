import {showThanksModal} from "./show-modal";
import {postData} from "../services/post-data";
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
    postData("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success,modalTimerID);
        statusMessage.remove();
        console.log("statusMessage= " + statusMessage);
      })
      .catch((e) => {
        console.log(e);
        showThanksModal(message.faulure + e,modalTimerID);
      })
      .finally(() => {
        form.reset();
      });
  });
}
}
export default forms;
