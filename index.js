import { runningLineText, stagesList, usersList } from "./const.js";

let isMobile;
//conts running line
const runningLine = document.querySelectorAll(".running__list");
const templateRunningItem = document.querySelector("#runningItem").content;

//consts stages -> slider
const stagesSliderConteiner = document.querySelector(".stages__slider");
const slider = stagesSliderConteiner.querySelector(".stages__list");
const sliderBtnLeft = stagesSliderConteiner.querySelector("#stages-left");
const sliderBtnRight = stagesSliderConteiner.querySelector("#stages-right");
const dotsConteiner = stagesSliderConteiner.querySelector(".stages__dots");
const templateStagesDot = document.querySelector("#stagesDot").content;
const templateStagesItem = document.querySelector("#stagesItem").content;
const dots = [];
const slideCount = 5;
let slideIndex = 0;
let numberOfUsers;

//conts users -> slider
const usersSliderConteiner = document.querySelector(".users__slider");
const users = usersSliderConteiner.querySelector(".users__list");
const templateUserItem = document.querySelector("#userItem").content;
const usersBtnLeft = document.querySelectorAll("#users-left");
const usersBtnRight = document.querySelectorAll("#users-right");
const spanCurrentIndex = document.querySelectorAll("#currentIndex");
const usersCount = usersList.length;
let currentUser = 0;

// --> render page <--
const renderUsers = (array) => {
  array.map((elem, i) => {
    const userItem = templateUserItem
      .querySelector(".users__item")
      .cloneNode(true);
    userItem.querySelector(".users__name").textContent = elem.name;
    userItem.querySelector(".users__status").textContent = elem.status;
    users.append(userItem);
  });
};

const renderStages = (array) => {
  array.map((elem) => {
    const stagesItem = templateStagesItem
      .querySelector(".stages__item")
      .cloneNode(true);
    stagesItem.id = `item${elem.id}`;
    stagesItem.querySelector(".stages__item-num").textContent = elem.id;
    stagesItem.querySelector(".stages__item-text").textContent = elem.text;
    slider.append(stagesItem);
  });
};

const renderRunningLine = (array) => {
  runningLine.forEach((line) => {
    array.map((elem) => {
      const runningItem = templateRunningItem
        .querySelector(".running__item")
        .cloneNode(true);
      runningItem.textContent = elem.text;
      line.append(runningItem);
    });
  });
};

// --> stages + slider <--
const renderDotsInSlider = (number) => {
  for (let i = 0; i < number; i++) {
    const stagesDot = templateStagesDot
      .querySelector(".stages__dot")
      .cloneNode(true);
    stagesDot.id = i;
    dotsConteiner.append(stagesDot);
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
  });
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
  if (windowWidth >= 1366) {
    isMobile = false;
    numberOfUsers = 3;
  } else if (windowWidth >= 975) {
    isMobile = false;
    numberOfUsers = 2;
  } else if (windowWidth > 515) {
    isMobile = false;
    numberOfUsers = 1;
  } else {
    isMobile = true;
    numberOfUsers = 1;
  }
  if (!isMobile) {
    slider.style.transform = `translateX(0)`;
    users.style.transform = `translateX(0)`;
  }
  renderCountUser();
};

// --> users + slider <--
const renderCountUser = () => {
  spanCurrentIndex.forEach(
    (elem) =>
      (elem.textContent = `${
        ((currentUser + numberOfUsers - 1) % usersCount) + 1
      }/${usersCount}`)
  );
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
      (currentUser - 1 + (usersCount + 1 - numberOfUsers)) %
      (usersCount + 1 - numberOfUsers);
    updateUserSlider();
  } else if (direction === "right") {
    currentUser = (currentUser + 1) % (usersCount + 1 - numberOfUsers);
    updateUserSlider();
  }
};


// --> EventListeners <--
sliderBtnLeft.addEventListener("click", () => handleArrow("left"));
sliderBtnRight.addEventListener("click", () => handleArrow("right"));
usersBtnLeft.forEach((btn) =>
  btn.addEventListener("click", () => handleShowUser("left"))
);
usersBtnRight.forEach((btn) =>
  btn.addEventListener("click", () => handleShowUser("right"))
);
window.addEventListener("resize", handleResize);

// --> call functions <--
handleResize();
renderUsers(usersList);
renderStages(stagesList);
renderDotsInSlider(slideCount);
renderRunningLine(runningLineText);
updateSlider();
updateUserSlider();
setInterval(()=> handleShowUser("right"), 4000);
