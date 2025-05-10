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
      display: grid;
      grid-template-columns: repeat(4, 100%); /* 4 слайда, каждый из которых занимает 100% ширины */
      transition: transform 0.6s ease-in-out;
      height: 100%;
    }

    .custom-slides img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
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
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 0.9em;
      }

      .dots-container {
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: flex;
        gap: 6px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: background 0.3s;
      }

      .dot.active {
        background: white;
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
      <div class="slider-indicator">1 / 4</div>
      <div class="dots-container"></div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = sliderHTML;

  function preloadImages(images, callback) {
    let loaded = 0;
    const total = images.length;
    images.forEach(img => {
      if (img.complete) {
        loaded++;
        if (loaded === total) callback();
      } else {
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === total) callback();
        };
      }
    });
  }

  function initSlider() {
    const target = document.querySelector('.constructor-component__content') || document.body;
    target.insertBefore(container, target.firstChild);

    const slidesWrapper = container.querySelector('.custom-slides');
    const images = container.querySelectorAll('.custom-slides img');
    const prev = container.querySelector('.custom-prev');
    const next = container.querySelector('.custom-next');
    const indicator = container.querySelector('.slider-indicator');
    const dotsContainer = container.querySelector('.dots-container');

    let index = 0;
    const total = images.length;
    let intervalId;

    // Создание точек
    const dots = [];
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        showSlide(i);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

  //  function showSlide(i) {
 //     index = (i + total) % total;
   //   slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
   //   indicator.textContent = `${index + 1} / ${total}`;
  //    updateDots();
 //   }

    function startAutoSlide() {
      intervalId = setInterval(() => showSlide(index + 1), 5000);
    }

    function resetInterval() {
      clearInterval(intervalId);
      startAutoSlide();
    }

    prev.addEventListener('click', () => {
      showSlide(index - 1);
      resetInterval();
    });

    next.addEventListener('click', () => {
      showSlide(index + 1);
      resetInterval();
    });

    preloadImages([...images], () => {
      showSlide(0);
      startAutoSlide();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();
