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
const runningLine = document.querySelectorAll(".running__list");
const users = document.querySelector(".users__list");
const sliderConteiner = document.querySelector(".stages__slider");
const slider = sliderConteiner.querySelector(".stages__list");
const sliderBtnLeft = sliderConteiner.querySelector("#left");
const sliderBtnRight = sliderConteiner.querySelector("#right");
const dotsConteiner = sliderConteiner.querySelector(".stages__dots");

const slideCount = 5;
let slideIndex = 0;

// const selectDot = (dotsList, id) => {
// dotsList.find((dot) => {
//   const findDot = dot.id === id;
//   console.log(findDot);
//   return findDot;
// })

// if() {
//   dot.classList.add('stages__dot_active')
// } else {
//   dot.classList.remove('stages__dot_active');
// }
// }

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
    slider.insertAdjacentHTML(
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

const fillDotsInSlider = (number) => {
  for (let i = 0; i < number; i++) {
    dotsConteiner.insertAdjacentHTML(
      "beforeend",
      `<li key=${i} id=${i} class="stages__dot"></li>`
    );
  }
  const dotsList = dotsConteiner.querySelectorAll(".stages__dot");
  dotsList.forEach((dot) => {
    dot.addEventListener("click", () => handleDot(dotsList, dot.id));
  });
};

const updateSlider = () => {
  slider.style.transform = `translateX(calc(-375px * ${slideIndex}))`;
};

const disableButtons = () => {
  if (slideIndex === 0) {
    sliderBtnLeft.setAttribute("disable", true);
    sliderBtnLeft.classList.add("stages__button_disabled");
  } else if (slideIndex === slideCount - 1) {
    sliderBtnRight.setAttribute("disable", true);
    sliderBtnRight.classList.add("stages__button_disabled");
  } else if (slideIndex > 0 && slideIndex < slideCount) {
    sliderBtnLeft.removeAttribute("disable", true);
    sliderBtnRight.removeAttribute("disable", true);
    sliderBtnLeft.classList.remove("stages__button_disabled");
    sliderBtnRight.classList.remove("stages__button_disabled");
  }
};

const handleArrow = (direction) => {
  if (direction === "left") {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    disableButtons();
    updateSlider();
  } else if (direction === "right") {
    //??
    slideIndex = (slideIndex + 1) % slideCount;
    disableButtons();
    updateSlider();
  }
};

const handleDot = (dotsList, index) => {
  slideIndex = index;
  // selectDot(dotsList, index);
  updateSlider();
};

const handleResize = () => {
  let windowWidth = window.innerWidth;
  if (windowWidth >= 975) {
    slider.style.transform = `translateX(0)`;
  }
};

fillUsers(usersList);
fillStages(stagesList);
fillDotsInSlider(slideCount);
fillRunningLine(runningLineText);
updateSlider();

sliderBtnLeft.addEventListener("click", () => handleArrow("left"));
sliderBtnRight.addEventListener("click", () => handleArrow("right"));
window.addEventListener("resize", handleResize);