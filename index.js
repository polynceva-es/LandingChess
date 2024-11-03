import { runningLineText, stagesList, usersList } from "./const.js";

let isMobile;
//conts running line
const runningLine = document.querySelectorAll(".running__list");

//consts stages -> slider
const stagesSliderConteiner = document.querySelector(".stages__slider");
const slider = stagesSliderConteiner.querySelector(".stages__list");
const sliderBtnLeft = stagesSliderConteiner.querySelector("#stages-left");
const sliderBtnRight = stagesSliderConteiner.querySelector("#stages-right");
const dotsConteiner = stagesSliderConteiner.querySelector(".stages__dots");
const dots = [];
const slideCount = 5;
let slideIndex = 0;
const numberOfUsers = () => {
  let num = isMobile ? 1 : 3;
  return num;
};

//conts users -> slider
const usersSliderConteiner = document.querySelector(".users__slider");
const users = usersSliderConteiner.querySelector(".users__list");
const usersListInSlider = users.querySelectorAll(".users__item");
const usersBtnLeft = document.querySelectorAll("#users-left");
const usersBtnRight = document.querySelectorAll("#users-right");
const spanCurrentIndex = document.querySelectorAll("#currentIndex");
const usersCount = usersList.length;
let currentUser = 0;

// --> render page <--
const renderUsers = (array) => {
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

const renderStages = (array) => {
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

const renderRunningLine = (array) => {
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

// --> stages + slider <--
const renderDotsInSlider = (number) => {
  for (let i = 0; i < number; i++) {
    dotsConteiner.insertAdjacentHTML(
      "beforeend",
      `<li key=${i} id=${i} class="stages__dot"></li>`
    );
  }
  const dotsList = dotsConteiner.querySelectorAll(".stages__dot");
  dotsList.forEach((dot) => {
    dots.push(dot);
    dot.addEventListener("click", () => handleDot(Number(dot.id)));
  });
};

const updateSlider = () => {
  slider.style.transform = `translateX(calc(-375px * ${slideIndex}))`;
  disableButtons();
  isActivedot();
};

const isActivedot = () => {
  dots.forEach((elem) => {
    if (Number(elem.id) === slideIndex) {
      elem.classList.add("stages__dot_active");
    } else {
      elem.classList.remove("stages__dot_active");
    }
  })
}

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
    updateSlider();
  } else if (direction === "right") {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
  }
};

const handleDot = (index) => {
  slideIndex = index;
  updateSlider();
};

const handleResize = () => {
  let windowWidth = window.innerWidth;
  if (windowWidth >= 975) {
    isMobile = false;
  } else {
    isMobile = true;
  }
  if (!isMobile) {
    slider.style.transform = `translateX(0)`;
    users.style.transform = `translateX(0)`;
  }
  renderCountUser();
  return isMobile;
};

// --> users + slider <--
const renderCountUser = () => {
  spanCurrentIndex.forEach((elem) => elem.textContent = `${
    ((currentUser + numberOfUsers() - 1) % usersCount) + 1
  }/${usersCount}`);
};

const updateUserSlider = () => {
  renderCountUser();
  users.style.transform = `translateX(calc(${
    isMobile ? "-367px" : "-414px"
  } * ${currentUser}))`;
};

const handleShowUser = (direction) => {
  if (direction === "left") {
    currentUser =
      (currentUser - 1 + (usersCount + 1 - numberOfUsers())) %
      (usersCount + 1 - numberOfUsers());
    updateUserSlider();
  } else if (direction === "right") {
    currentUser = (currentUser + 1) % (usersCount + 1 - numberOfUsers());
    updateUserSlider();
  }
};

// --> call functions <--
handleResize();
// renderUsers(usersList);
renderStages(stagesList);
renderDotsInSlider(slideCount);
renderRunningLine(runningLineText);
updateSlider();
updateUserSlider();

// --> EventListeners <--
sliderBtnLeft.addEventListener("click", () => handleArrow("left"));
sliderBtnRight.addEventListener("click", () => handleArrow("right"));
usersBtnLeft.forEach((btn) => btn.addEventListener("click", () => handleShowUser("left")));
usersBtnRight.forEach((btn) => btn.addEventListener("click", () => handleShowUser("right")));
window.addEventListener("resize", handleResize);
