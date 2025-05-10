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
    </style>

    <div class="custom-slider">
      <div class="custom-slides">
        <img src="/uploads/sites_uploads/site-1803/slider/895422/1.jpg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895259/2.jpeg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895260/3.jpeg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895261/4.jpeg" alt="">
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = sliderHTML;

  function initSlider() {
    const target = document.querySelector('.constructor-component__content') || document.body;
    target.insertBefore(container, target.firstChild);

    const images = container.querySelectorAll('.custom-slides img');
    let index = 0;
    const total = images.length;

    function showSlide(i) {
      images.forEach(img => img.classList.remove('active')); // Скрываем все слайды
      images[i].classList.add('active'); // Показываем текущий слайд
    }

    function startAutoSlide() {
      setInterval(() => {
        index = (index + 1) % total; // Переходим к следующему слайду с циклическим переходом
        showSlide(index);
      }, 5000); // Смена слайда каждые 5 секунд
    }

    showSlide(index);  // Показываем первый слайд
    startAutoSlide();  // Запускаем автоматический слайдер
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();
