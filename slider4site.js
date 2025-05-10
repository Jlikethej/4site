(function () {
  const sliderHTML = `
    <style>
      .custom-slider {
        position: relative;
        width: 100%;
        max-width: 1200px;
        aspect-ratio: 1021 / 378;
        overflow: hidden;
        margin: 20px auto;
        border-radius: 12px;
      }

      .custom-slides {
        display: flex;
        width: 100%;
      }

      .custom-slides img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: none; /* Все слайды скрыты по умолчанию */
      }

      .custom-slides img.active {
        display: block; /* Показываем только активный слайд */
      }

      .custom-prev,
      .custom-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 1.5em;
        border: none;
        cursor: pointer;
        padding: 8px 12px;
        z-index: 10;
        border-radius: 50%;
      }

      .custom-prev { left: 10px; }
      .custom-next { right: 10px; }

      .slider-indicator {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        gap: 10px;
      }

      .slider-indicator button {
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .slider-indicator button.active {
        background-color: rgba(255, 255, 255, 0.7);
      }
    </style>

    <div class="custom-slider">
      <div class="custom-slides">
        <img src="/uploads/sites_uploads/site-1803/slider/895422/1.jpg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895259/2.jpeg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895260/3.jpeg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895261/4.jpeg" alt="">
      </div>
      <button class="custom-prev">&#10094;</button>
      <button class="custom-next">&#10095;</button>
      <div class="slider-indicator">
        <button data-slide="0" class="active"></button>
        <button data-slide="1"></button>
        <button data-slide="2"></button>
        <button data-slide="3"></button>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = sliderHTML;

  function initSlider() {
    const target = document.querySelector('.constructor-component__content') || document.body;
    target.insertBefore(container, target.firstChild);

    const images = container.querySelectorAll('.custom-slides img');
    const prev = container.querySelector('.custom-prev');
    const next = container.querySelector('.custom-next');
    const indicatorButtons = container.querySelectorAll('.slider-indicator button');
    let index = 0;
    const total = images.length;
    let intervalId;

    // Функция для отображения слайда
    function showSlide(i) {
      images.forEach(img => img.classList.remove('active')); // Скрываем все слайды
      indicatorButtons.forEach(button => button.classList.remove('active')); // Убираем активные индикаторы
      images[i].classList.add('active'); // Показываем текущий слайд
      indicatorButtons[i].classList.add('active'); // Отображаем активный индикатор
    }

    // Запуск автоперелистывания слайдов
    function startAutoSlide() {
      intervalId = setInterval(() => {
        index = (index + 1) % total; // Переходим к следующему слайду с циклическим переходом
        showSlide(index);
      }, 5000); // Смена слайда каждые 5 секунд
    }

    // Сбросить интервал и перезапустить автоперелистывание
    function resetInterval() {
      clearInterval(intervalId);
      startAutoSlide();
    }

    // Обработчики кликов по кнопкам
    prev.addEventListener('click', () => {
      index = (index - 1 + total) % total; // Переход к предыдущему слайду
      showSlide(index);
      resetInterval();
    });

    next.addEventListener('click', () => {
      index = (index + 1) % total; // Переход к следующему слайду
      showSlide(index);
      resetInterval();
    });

    // Обработчик кликов по индикаторам
    indicatorButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        index = parseInt(e.target.getAttribute('data-slide')); // Переход на слайд по индикатору
        showSlide(index);
        resetInterval();
      });
    });

    showSlide(index);  // Показываем первый слайд
    startAutoSlide();  // Запускаем автоматический слайдер
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();
