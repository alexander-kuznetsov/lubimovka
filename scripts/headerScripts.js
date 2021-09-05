const page = document.querySelector('.page');
const menu = page.querySelector('.header__nav');
const point = menu.querySelector('.header__list-el_point-on');
const buttonProjects = page.querySelector('.button__content_type_projects');
const buttonBurger = page.querySelector('.button_type_burger');
const elementsArr = menu.querySelectorAll('.header__list-el_type_menu');


function displayMobileMenu() {

    if(!menu.classList.contains('header__nav_mobile')){

        menu.classList.add('header__nav_mobile');

    } else {

        menu.classList.remove('header__nav_mobile');

    }

};

function setPoint(event) {

    let target = event.target;
    let parent = target.closest('.header__list-el_type_menu');

    if(!parent.classList.contains('header__list-el_point-on')) {

        buttonProjects.textContent = point.textContent;

        for(i = 0; i < elementsArr.length; i++) {

            elementsArr[i].classList.remove('header__list-el_point-on');

        }

        parent.classList.add('header__list-el_point-on');

    }

};

buttonBurger.addEventListener('click', displayMobileMenu);
menu.addEventListener('click', setPoint);