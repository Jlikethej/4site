(function () {
  const sliderHTML = `
    <style>
      .custom-slider {
        position: relative;
        width: 100%;
        max-width: 1200px;
        aspect-ratio: 16 / 6;
        overflow: hidden;
        margin: 20px auto;
      }

      .custom-slides {
        display: flex;
        transition: transform 0.8s ease-in-out;
        height: 100%;
      }

      .custom-slides img {
        width: 100%;
        min-width: 100%;
        flex: 0 0 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
      }

      .custom-prev, .custom-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 2em;
        border: none;
        cursor: pointer;
        padding: 10px;
        z-index: 10;
      }

      .custom-prev { left: 10px; }
      .custom-next { right: 10px; }

      .slider-indicator {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1.2em;
        padding: 5px 10px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
      }
    </style>

    <div class="custom-slider">
      <div class="custom-slides">
        <img src="/uploads/sites_uploads/site-1803/slider/895258/1.jpeg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895259/2.jpeg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895260/3.jpeg" alt="">
        <img src="/uploads/sites_uploads/site-1803/slider/895261/4.jpeg" alt="">
      </div>
      <button class="custom-prev">&#10094;</button>
      <button class="custom-next">&#10095;</button>
      <div class="slider-indicator">1 / 4</div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = sliderHTML;

  function initSlider() {
    const target = document.querySelector('.constructor-component__content') || document.body;
    target.insertBefore(container, target.firstChild);

    const slider = container.querySelector('.custom-slider');
    const slidesContainer = container.querySelector('.custom-slides');
    const images = container.querySelectorAll('.custom-slides img');
    const prev = container.querySelector('.custom-prev');
    const next = container.querySelector('.custom-next');
    const indicator = container.querySelector('.slider-indicator');

    const totalSlides = images.length;
    let index = 0;
    let slideInterval;

    function updateSizes() {
      const sliderWidth = slider.clientWidth;
      slidesContainer.style.width = `${sliderWidth * totalSlides}px`;
      images.forEach(img => {
        img.style.width = `${sliderWidth}px`;
        img.style.minWidth = `${sliderWidth}px`;
        img.style.flex = '0 0 ' + sliderWidth + 'px';
      });
      showSlide(index);
    }

    function showSlide(i) {
      index = (i + totalSlides) % totalSlides;
      const offset = slider.clientWidth * index;
      slidesContainer.style.transform = `translateX(-${offset}px)`;
      indicator.textContent = `${index + 1} / ${totalSlides}`;
    }

    function startInterval() {
      slideInterval = setInterval(() => showSlide(index + 1), 5000);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }

    prev.onclick = () => {
      showSlide(index - 1);
      resetInterval();
    };
    next.onclick = () => {
      showSlide(index + 1);
      resetInterval();
    };

    window.addEventListener('resize', updateSizes);

    Promise.all([...images].map(img => {
      return img.complete ? Promise.resolve() : new Promise(res => img.onload = res);
    })).then(() => {
      updateSizes();
      showSlide(0);
      startInterval();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();
