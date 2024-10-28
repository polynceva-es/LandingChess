const users = [
    {
        name: 'Хозе-Рауль Капабланка',
        status: 'Чемпион мира по шахматам'
    },
    {
        name: 'Эммануил Ласкер',
        status: 'Чемпион мира по шахматам'
    },
    {
        name: 'Александр Алехин',
        status: 'Чемпион мира по шахматам'
    },
    {
        name: 'Арон Нимцович',
        status: 'Чемпион мира по шахматам'
    },
    {
        name: 'Рихард Рети',
        status: 'Чемпион мира по шахматам'
    },
    {
        name: 'Остап Бендер',
        status: 'Гроссмейстер'
    },
]

const participants = document.querySelector('.participants__list');
const fillUsers = (array) => {
    array.map((elem)=> {
        participants.insertAdjacentHTML( "beforeend",
            `<li class="participants__item">
            <img class="participants__img" src="./images/user.png"/>
            <h2 class="participants__name">${elem.name}</h2>
            <h3 class="participants__status">${elem.status}</h3>
            <button class="participants__button">Подробнее</button>
        </li>`
        )
    })
}

fillUsers(users);