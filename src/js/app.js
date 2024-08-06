const header = document.querySelector('.header');
const heroScroll = document.querySelector('.hero__scroll');

window.addEventListener("scroll", function() {
  let scrollPos = window.scrollY;

  if (scrollPos > 0) {
     header.classList.add("scroll");
     heroScroll.classList.add("hide");
  } else {
     header.classList.remove("scroll");
     heroScroll.classList.remove("hide");
  };
});

const heroSlider = new Swiper('.hero', {
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
});

heroScroll.addEventListener('click', function() {
   window.scrollBy({
       top: window.innerHeight,
       behavior: 'smooth'
   });
});

const workItems = document.querySelectorAll('.works__item');
const workFilters = document.querySelectorAll('.works__filter');
const worksCategory = document.querySelector('.works__category');

worksCategory.addEventListener("click", event => {
    const { target } = event;
    
    if (!target.classList.contains('works__filter')) {
        return;
    }

    // Удаляем класс 'clicked' у всех фильтров и добавляем его к текущему фильтру
    workFilters.forEach(filter => filter.classList.remove('clicked'));
    target.classList.add('clicked');

    // Получаем класс фильтра
    const filterClass = target.dataset.filter;

    // Показываем или скрываем элементы
    workItems.forEach(item => {
        item.classList.toggle('hide', filterClass !== 'all' && !item.classList.contains(filterClass));
    });
});

const teamSlider = new Swiper('.team__slider', {
   fadeEffect: { 
      crossFade: true,
   },
   effect: 'fade',
   pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
   }
});


   
const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
    const progressBar = skill.querySelector('.skill__progress-bar');
    const percentElement = skill.querySelector('.skill__percent');

    function updateProgressBar() {
        // Получаем числовое значение процента из текста элемента
        let progressValue = parseInt(percentElement.textContent, 10);

        // Убеждаемся, что значение процента находится в пределах от 0 до 100
        if (progressValue < 0) progressValue = 0;
        if (progressValue > 100) progressValue = 100;

        // Обновляем ширину прогресс-бара
        progressBar.style.width = `${progressValue}%`;
    }

    // Первоначальное обновление прогресс-бара
    updateProgressBar();

    // Создаем экземпляр MutationObserver, связанный с callback-функцией
    const observer = new MutationObserver(() => {
        updateProgressBar();
    });

    // Начинаем наблюдение за целевым элементом для конфигурированных изменений
    observer.observe(percentElement, {
        childList: true,
        characterData: true,
        subtree: true
    });
});