const page = document.querySelector('.page');
const menu = page.querySelector('.header__list_type_menu');
const elementsArr = menu.querySelectorAll('.header__list-el_type_menu');
const buttonBurger = page.querySelector('.button_type_burger');

menu.addEventListener('click', (event) => {

    let target = event.target;
    let parent = target.closest('.header__list-el_type_menu');

    if(!parent.classList.contains('header__list-el_point-on')) {

        const buttonProjects = page.querySelector('.button__content_type_projects');
        const point = menu.querySelector('.header__list-el_point-on');

        buttonProjects.textContent = point.textContent

        for(i = 0; i < elementsArr.length; i++) {

            elementsArr[i].classList.remove('header__list-el_point-on');

        }

        parent.classList.add('header__list-el_point-on');

    }

});

buttonBurger.addEventListener('click', () => {

    menu.style.cssText = 'display: flex;';
    console.log(menu.style);

})