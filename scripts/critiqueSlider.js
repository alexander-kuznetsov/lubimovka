(() => {
    const options = {
        slideWidth: 718,
        slideOffset: 30,
        slider: '.critique-reviews'
    }
    
    const reviews = [
        {
            text: '«Действие пьесы «Длань Господня» разворачивается в подвале провинциальной церкви в Техасе, где мать главного героя с группой добровольцев готовит кукольное представление. Ей отчаянно нужна эта работа, её муж недавно умер, оставив её с сыном-подростком в эмоциональной и финансовой яме. И вот жуткая тварь захватывает контроль над левой рукой её беспокойного Джейсона и принимается терроризировать его и всех вокруг. По мере накала страстей окружающие начинают подозревать, что рука одержима самим дьяволом, и пастор Грег предлагает прибегнуть к экзорцизму. Однако «Длань Господня» — это не ужастик, по крайней мере, природа зла тут вовсе не сверхъестественная. Чёрная комедия Аскинса о разделённой надвое душе человека ненавязчиво обнажает глубинные импульсы — сексуальные, саморазрушительные, агрессивные — которые притаились в каждом из нас».',
            image: 'nyt.jpg',
            alt: 'Логотип New York Times',
            link: ''
        },
        {
            text: '«Действие пьесы «Длань Господня» разворачивается в подвале провинциальной церкви в Техасе, где мать главного героя с группой добровольцев готовит кукольное представление. Ей отчаянно нужна эта работа, её муж недавно умер, оставив её с сыном-подростком в эмоциональной и финансовой яме. И вот жуткая тварь захватывает контроль над левой рукой её беспокойного Джейсона и принимается терроризировать его и всех вокруг.',
            image: 'sobaka.jpg',
            alt: 'Логотип Собака',
            link: ''
        }
    ]
    
    const critiqueContainer = document.querySelector('.critique');
    const prevButton = critiqueContainer.querySelector('.critique__slider-arrow_direction_left');
    const nextButton = critiqueContainer.querySelector('.critique__slider-arrow_direction_right');
    const slider = critiqueContainer.querySelector(options.slider);
    const dotsContainer = critiqueContainer.querySelector('.critique__slider-dots');
    const dotsContainerMobile = critiqueContainer.querySelector('.critique__slider-dots_mobile');
    const reviewTemplate = document.querySelector('#critiqueReviewTemplate').content;
    const reviewsContainer = critiqueContainer.querySelector('.critique-reviews');
    
    const highlightDots = (index) => {
        const dots = window.innerWidth <= 520 ? dotsContainerMobile.querySelectorAll('.critique__slider-dot') : critiqueContainer.querySelectorAll('.critique__slider-dot');
        dots.forEach((el, i) => {
            if(index === i) {
                el.classList.add('critique__slider-dot_selected');
            } else {
                el.classList.remove('critique__slider-dot_selected');
            }
        });
    }
    
    const highlightReviews = (index) => {
        const reviews = document.querySelectorAll('.critique-review');
        reviews.forEach((el, i) => {
            if(index === i) {
                
                el.classList.add('critique-review_current');
            } else {
                el.classList.remove('critique-review_current');
            }
        });
    }
    
    const moveSlide = (type, position) => {
        this.index = this.index || 0;
        if( type === 'next' ) { this.index++; } else { this.index--; }
        if( this.index < 0 ) { this.index = 0; }
        if( this.index > reviews.length - 1 ) { this.index = 0; }
        if(position) { this.index = position; }
        if(window.innerWidth > 830) {
            slider.style.transform = `translate(-${this.index * (options.slideWidth + options.slideOffset)}px)`;
        } else {
            slider.style.transform = `translate(-${this.index * window.innerWidth}px)`;
        }
        
        highlightDots(this.index);
        highlightReviews(this.index);
    }
    
    const createReviewElement = (review, i) => {
        const element = reviewTemplate.querySelector('.critique-review').cloneNode(true);
        element.querySelector('.critique-review__text').textContent = review.text;
        element.querySelector('.critique-review__image').src = `./images/${review.image}`;
        element.querySelector('.critique-review__image').alt = review.alt;
        element.querySelector('.critique-review__more').href = review.link;
        if(i === 0) {
            element.classList.add('critique-review_current');
        }
        return element;
    }
    
    const createDotElement = (i) => {
        const element = document.createElement('span');
        element.classList.add('critique__slider-dot');
        element.setAttribute('data-index', i);
        if(i === 0) { element.classList.add('critique__slider-dot_selected'); }
        element.addEventListener('click', (e) => {
            moveSlide('', parseInt(e.target.getAttribute('data-index')))
        })
        return element
    }
    
    reviews.map((review, i) => {
        dotsContainerMobile.append(createDotElement(i));
        dotsContainer.append(createDotElement(i));
        reviewsContainer.append(createReviewElement(review, i));
    })
    
    
    
    prevButton.addEventListener('click', () => moveSlide('prev'));
    nextButton.addEventListener('click', () => moveSlide('next'));
})()