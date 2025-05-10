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
        transition: transform 0.6s ease-in-out;
      }

      .custom-slides img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        flex-shrink: 0;
        flex-grow: 0;
        flex-basis: 100%;
        display: block;
      }
    </style>

    <div class="custom-slider">
      <div class="custom-slides">
        <img src="/uploads/sites_uploads/site-1803/slider/895422/1.jpg" alt="" data-index="0">
        <img src="/uploads/sites_uploads/site-1803/slider/895259/2.jpeg" alt="" data-index="1">
        <img src="/uploads/sites_uploads/site-1803/slider/895260/3.jpeg" alt="" data-index="2">
        <img src="/uploads/sites_uploads/site-1803/slider/895261/4.jpeg" alt="" data-index="3">
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = sliderHTML;

  function initSlider() {
    const target = document.querySelector('.constructor-component__content') || document.body;
    target.insertBefore(container, target.firstChild);

    const slidesWrapper = container.querySelector('.custom-slides');
    const images = container.querySelectorAll('.custom-slides img');

    let index = 0;
    const total = images.length;

    function showSlide(i) {
      index = (i + total) % total; // цикл по слайдам
      slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    function startAutoSlide() {
      setInterval(() => {
        showSlide(index + 1);
      }, 5000); // смена слайда каждые 5 секунд
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
