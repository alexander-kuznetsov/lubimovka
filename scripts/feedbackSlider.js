(() => {
    const feedbackSlider = document.querySelector('.feedback-reviews');
    const nextButton = document.querySelector('.feedback__slider-arrow_direction_right');
    const prevButton = document.querySelector('.feedback__slider-arrow_direction_left');

    window.addEventListener('resize', () => adaptiveColumns());

    const adaptiveColumns = () => {
        const calculatedWidth = calculateColumnWidth(feedbackSlider.offsetWidth);
        resizeReview(calculatedWidth);
        resizeFeedbackHeading(calculatedWidth);
        renderDots();
    }

    const calculateColumnWidth = (sliderWidth, withOffset) => {
        let columnsCount = 3;
        let outerOffset = 0;
        let columnOffset = 30;

        switch(true) {
            case window.innerWidth <= 800: columnsCount = 1; columnOffset = 0; break;
            case window.innerWidth <= 1100: columnsCount = 2; outerOffset = 30; columnOffset = 30; break;
            case window.innerWidth <= 1420: columnsCount = 3; outerOffset = 30; columnOffset = 30; break;
        }
        
        return ((sliderWidth - outerOffset * 2) - columnOffset * (columnsCount - 1)) / columnsCount + (withOffset ? columnOffset : 0);
    }

    const resizeReview = (width) => {
        const reviewsElements = document.querySelectorAll('.feedback-review');
        reviewsElements.forEach(el => {
            el.style.width = `${width}px`;
        });
    }

    const resizeFeedbackHeading = (width) => {
        const feedbackHeading = document.querySelector('.feedback__heading');
        if(window.innerWidth > 1100) { 
            feedbackHeading.style.width = `auto`;
            return;
        }
        feedbackHeading.style.width = `${width}px`;
    }

    let feedbackSliderIndex = 0;

    const reviews = [
        { text: 'Что-то похожее на эффект от мультфильмов типа «Сауз Парк» или про коня Боджэка возникает — я думаю, и пьеса написана с этой интонацией американских взрослых мультсериалов. И как хорошо все это с куклой-носочком. Так все чисто сделано!', author: 'Наталья Зайцева' },
        { text: 'Для самой этой истории формат читки работает отличным ироническим отстранением', author: 'Дина Годер' },
        { text: 'Мне данный формат дал возможность самой выбирать, как двигается персонаж, что на нем надето, какую машину он водит, и что за плакат висит в подвале церкви. Это было приятно, ведь я как будто сама поучаствовала в спектакле', author: 'Дарья Морозова' },
        { text: 'Мне данный формат дал возможность самой выбирать, как двигается персонаж, что на нем надето, какую машину он водит, и что за плакат висит в подвале церкви. Это было приятно, ведь я как будто сама поучаствовала в спектакле', author: 'Дарья Морозова' }
    ];

    const renderDots = () => {
        const dotsContainer = window.innerWidth <= 520 ? document.querySelector('.feedback__slider-dots-mobile') : document.querySelector('.feedback__slider-dots');
        dotsContainer.innerHTML = '';
        
        reviews.map((el, index) => {
            const dot = document.createElement("span");
            dot.classList.add('feedback__slider-dot');
            dot.setAttribute('data-index', index);
            if( index === feedbackSliderIndex ) { 
                dot.classList.add('feedback__slider-dot_selected');
            }
            dot.addEventListener('click', (e) => {
                feedbackSliderIndex = parseInt(e.target.getAttribute('data-index'));
                moveSlides();
            })
            dotsContainer.append(dot);
        })

    }

    const renderReviews = () => {
        const reviewsContainer = document.querySelector('.feedback-reviews');
        const reviewTemplate = document.querySelector('#feedbackReviewTemplate').content;
        reviewsContainer.innerHTML = '';
        
        reviews.map((el) => {
            const elementReview = reviewTemplate.querySelector('.feedback-review').cloneNode(true);
            elementReview.querySelector('.feedback-review__text').textContent = el.text;
            elementReview.querySelector('.feedback-review__author').textContent = el.author;
            reviewsContainer.append(elementReview);
        })
        adaptiveColumns();
    }

    const moveSlides = () => {
        if(feedbackSliderIndex === reviews.length || feedbackSliderIndex < 0) { feedbackSliderIndex = 0; }
        feedbackSlider.style.transform = `translate(-${calculateColumnWidth(feedbackSlider.offsetWidth, true) * feedbackSliderIndex}px)`;
        renderDots();
    }

    nextButton.addEventListener('click', () => {
        feedbackSliderIndex++;
        moveSlides();
        
    })

    prevButton.addEventListener('click', () => {
        feedbackSliderIndex--;
        moveSlides();
        
    })

    renderDots();
    renderReviews();
})();
