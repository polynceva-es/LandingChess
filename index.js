const usersList = [
  {
    name: "Хозе-Рауль Капабланка",
    status: "Чемпион мира по шахматам",
  },
  {
    name: "Эммануил Ласкер",
    status: "Чемпион мира по шахматам",
  },
  {
    name: "Александр Алехин",
    status: "Чемпион мира по шахматам",
  },
  {
    name: "Арон Нимцович",
    status: "Чемпион мира по шахматам",
  },
  {
    name: "Рихард Рети",
    status: "Чемпион мира по шахматам",
  },
  {
    name: "Остап Бендер",
    status: "Гроссмейстер",
  },
];
const stagesList = [
  {
    id: 1,
    text: "Строительство железнодорожной магистрали Москва-Васюки",
  },
  {
    id: 2,
    text: "Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов",
  },
  {
    id: 3,
    text: "Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет",
  },
  {
    id: 4,
    text: "Строительство дворца для турнира",
  },
  {
    id: 5,
    text: "Размещение гаражей для гостевого автотранспорта",
  },
  {
    id: 6,
    text: "Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов",
  },
  {
    id: 7,
    text: "Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн",
  },
];
const runningLineText = [
  {
    id: 1,
    text: "Дело помощи утопающим — дело рук самих утопающих!",
  },
  {
    id: 2,
    text: "Шахматы двигают вперед не только культуру, но и экономику!",
  },
  {
    id: 3,
    text: "Лед тронулся, господа присяжные заседатели!",
  },
];

const users = document.querySelector(".users__list");
const slider = document.querySelector(".stages__slider");
const stages = slider.querySelector(".stages__list");
const sliderBtnLeft = slider.querySelector("#left");
const sliderBtnRight = slider.querySelector("#right");
const runningLine = document.querySelectorAll(".running__list");

const fillUsers = (array) => {
  array.map((elem, i) => {
    users.insertAdjacentHTML(
      "beforeend",
      `<li key=${i} class="users__item">
            <img class="users__img" src="./images/user.png"/>
            <h2 class="users__name">${elem.name}</h2>
            <h3 class="users__status">${elem.status}</h3>
            <button class="users__button">Подробнее</button>
        </li>`
    );
  });
};

const fillStages = (array) => {
  array.map((elem) => {
    stages.insertAdjacentHTML(
      "beforeend",
      `<li class="stages__item" key=${elem.id} id=item${elem.id}>
            <span class="stages__item-num">${elem.id}</span>
            <p>${elem.text}</p>
        </li>`
    );
  });
};

const fillRunningLine = (array) => {
  runningLine.forEach((line) => {
    array.map((elem) => {
      line.insertAdjacentHTML(
        "beforeend",
        `<li key=${elem.id} class="running__item">
                    ${elem.text}
                </li>`
      );
    });
  });
};

const handleArrow = (direction) => {
  if (direction === "left") {
    console.log("left");
  } else if (direction === "right") {
    console.log("right");
  }
};

fillUsers(usersList);
fillStages(stagesList);
fillRunningLine(runningLineText);

sliderBtnLeft.addEventListener("click", ()=> handleArrow("left"));
sliderBtnRight.addEventListener("click", () => handleArrow("right"));
