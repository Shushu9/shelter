console.log("Самопроверка Shelter-part2\n1. Реализация burger menu на обеих страницах: +26\n2. Реализация слайдера-карусели на странице Main: +16\n3. Реализация пагинации на странице Pets: +32\n 4.Реализация попап на обеих страницах: +12 \nИтого: 86 баллов");


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
    const sliderInner = document.querySelector('.slider__inner');


    sliderInner.onclick = function (event) {

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



// ******* SLIDER ***********//

document.addEventListener("DOMContentLoaded", function () {

    const prev = document.querySelector('.slider__prev'),
        next = document.querySelector('.slider__next'),
        slidesWrapper = document.querySelector('.slider__wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.slider__inner');


    let offset = 0;
    let sliderCount = (width === '1080px') ? 3 : (width === '620px') ? 4 : 9;

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (sliderCount - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (sliderCount - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    });


    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
})