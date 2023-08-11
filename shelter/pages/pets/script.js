//****** HAMBURGER TOGGLING ******* */
const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.hamburger'),
    navOverlay = document.querySelector('.nav__overlay');

function openNavMenu() {
    hamburger.classList.add('hamburger_active');
    menu.classList.add('menu_active');
    navOverlay.classList.add('nav__overlay_active');
    document.body.classList.add('hide-overflow');
};

function closeNavMenu() {
    hamburger.classList.remove('hamburger_active');
    menu.classList.remove('menu_active');
    navOverlay.classList.remove('nav__overlay_active');
    document.body.classList.remove('hide-overflow');
};

hamburger.addEventListener('click', openNavMenu);

menuItem.forEach(item => {
    item.addEventListener('click', closeNavMenu);
});

navOverlay.addEventListener('click', closeNavMenu);


//****** POPUP GENERATING AND OPENING ******* */


document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector('.popup');
    const petsInner = document.querySelector('.pets__inner');


    petsInner.onclick = function (event) {

        if (!event.target.closest('.card')) return;

        fetch('../pets.json')
            .then(res => res.json())
            .then(data => {
                generatePopupInfo(data[event.target.closest('.card').dataset.number])
            });

        openPopup()
    };



    function generatePopupInfo(data) {

        const img = popup.querySelector(".popup__image");
        const title = popup.querySelector(".popup__title");
        const subtitle = popup.querySelector(".popup__subtitle");
        const description = popup.querySelector(".popup__description");
        const age = popup.querySelector(".popup__item:nth-child(1)");
        const inoculations = popup.querySelector(".popup__item:nth-child(2)");
        const diseases = popup.querySelector(".popup__item:nth-child(3)");
        const parasites = popup.querySelector(".popup__item:nth-child(4)");

        img.src = data.img;
        title.innerText = data.name;
        subtitle.innerText = `${data.type} - ${data.breed}`;
        description.innerText = data.description;
        age.innerHTML = `<span>Age:</span> ${data.age}`;
        inoculations.innerHTML = `<span>Inoculations:</span> ${data.inoculations}`;
        diseases.innerHTML = `<span>Diseases:</span> ${data.diseases}`;
        parasites.innerHTML = `<span>Parasites:</span> ${data.parasites}`;
    }

    function openPopup() {
        popup.classList.add('popup-active');
        document.body.classList.add('hide-overflow');
    }


    function closePopup() {
        popup.classList.remove('popup-active');
        document.body.classList.remove('hide-overflow');
    }

    document.querySelector('.popup__overlay').addEventListener('click', closePopup)
    document.querySelector('.popup__close').addEventListener('click', closePopup)

})


//************** CARDS PAGINATION **************//

const buttonFirst = document.querySelector(".pets__first");
const buttonPrevious = document.querySelector(".pets__prev");
const currentCounter = document.querySelector(".pets__counter");
const buttonNext = document.querySelector(".pets__next");
const buttonLast = document.querySelector(".pets__last");
const container = document.querySelector(".container");


const windowWidth = window.getComputedStyle(container).getPropertyValue("max-width").replace(/\D/g, '')


function getPageCount() {
    return (windowWidth == 1200) ? 48 / 8 : (windowWidth == 950 || windowWidth == 750) ? 48 / 6 : 48 / 3;
}

function fillArray(initialArray) {
    const filledArray = [];

    for (let i = 0; i < 48 / initialArray.length; i++) {
        filledArray.push(...initialArray);
    }

    return filledArray;
}

function generatePetsArray(pageCount, initialPets) {
    const petsArray = [];

    const petsCountPerPage = initialPets.length / pageCount;

    for (let i = 0; i < pageCount; i++) {
        const petsPerPage = initialPets.slice(i * petsCountPerPage, petsCountPerPage * (i + 1));
        const snuffledPets = petsPerPage.sort(() => Math.random() - 0.5);
        petsArray.push(snuffledPets);
    }

    return petsArray;
}

function createPetHtml(id, name, imageSrc) {
    const card = document.createElement("div");
    card.dataset.number = id;
    card.className = "card";

    card.innerHTML = `
        <div class="card__photo">
                <img src=${imageSrc} alt="pets-scarlett">
        </div>
        <div class="card__info">
            <h4 class="card__title">${name}</h4>
            <button class="btn card__button">Learn more</button>
        </div>
    `

    return card;
}

function toggleDisablePreviousButtons(disabled) {
    buttonPrevious.disabled = disabled;
    buttonFirst.disabled = disabled;

    if (disabled) {
        buttonPrevious.classList.remove('active');
        buttonFirst.classList.remove('active');
    } else {
        buttonPrevious.classList.add('active');
        buttonFirst.classList.add('active');
    }


}


function toggleDisableNextButtons(disabled) {
    buttonNext.disabled = disabled;
    buttonLast.disabled = disabled;

    if (disabled) {
        buttonNext.classList.remove('active');
        buttonLast.classList.remove('active');
    } else {
        buttonNext.classList.add('active');
        buttonLast.classList.add('active');
    }
}


document.addEventListener("DOMContentLoaded", function () {


    fetch("../pets.json")
        .then((result) => result.json())
        .then((data) => {
            const petsContainer = document.querySelector(".pets__inner");
            const filledArray = fillArray(data);
            const pageCount = getPageCount();

            const pets = generatePetsArray(pageCount, filledArray);

            let activePage = 1;

            initializePets();

            function initializePets() {
                pets[activePage - 1].forEach((pet) => {
                    const newCard = createPetHtml(pet.id, pet.name, pet.img);
                    petsContainer.appendChild(newCard);
                });

                toggleDisablePreviousButtons(true);
                currentCounter.innerText = activePage;
            }

            function onPaginationButtonClick(activePage) {
                if (activePage === 1) {
                    toggleDisablePreviousButtons(true);
                }

                if (activePage === pageCount) {
                    toggleDisableNextButtons(true);
                }

                if (activePage !== 1 && (buttonPrevious.disabled || buttonFirst.disabled)) {
                    toggleDisablePreviousButtons(false);
                }

                if (activePage !== pageCount && (buttonNext.disabled || buttonLast.disabled)) {
                    toggleDisableNextButtons(false);
                }

                currentCounter.innerText = activePage;

                let newPetNodes = [];

                pets[activePage - 1].forEach((pet) => {
                    const newCard = createPetHtml(pet.id, pet.name, pet.img);
                    newPetNodes.push(newCard);
                });

                petsContainer.replaceChildren(...newPetNodes);
            }

            function onPreviousButtonClick() {
                activePage = activePage - 1;
                onPaginationButtonClick(activePage);
            }

            function onNextButtonClick() {
                activePage = activePage + 1;
                onPaginationButtonClick(activePage);
            }

            function onFirstButtonClick() {
                activePage = 1;
                onPaginationButtonClick(activePage);
            }

            function onLastButtonClick() {
                activePage = pageCount;
                onPaginationButtonClick(activePage);
            }

            buttonPrevious.addEventListener("click", onPreviousButtonClick);
            buttonFirst.addEventListener("click", onFirstButtonClick);
            buttonNext.addEventListener("click", onNextButtonClick);
            buttonLast.addEventListener("click", onLastButtonClick);

        });
});