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
export default timer;
export {getNumbersOnly};
export {addZeroToNumbers};
