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
        position: relative;
        width: 100%;
        height: 100%;
      }

      .custom-slides img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
        display: block;
      }

      .custom-slides img.active {
        opacity: 1;
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

      .slider-dots {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        gap: 10px;
        z-index: 10;
      }

      .slider-dots span {
        width: 10px;
        height: 10px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        cursor: pointer;
      }

      .slider-dots .active {
        background-color: white;
      }
    </style>

    <div class="custom-slider">
      <div class="custom-slides">
        <img src="/uploads/sites_uploads/site-1803/slider/895259/2.jpeg" alt="" class="active">
        <img src="/uploads/sites_uploads/site-1803/slider/895260/3.jpeg" alt="">
        <a href="https://kkst.kemobl.ru/studentam/zashishayu-rodinu/">
        <img src="/uploads/sites_uploads/site-1803/slider/1526613/bpla.jpg" alt="">
        </a>
      </div>
      <button class="custom-prev">&#10094;</button>
      <button class="custom-next">&#10095;</button>
      <div class="slider-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
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
    const dots = container.querySelectorAll('.slider-dots .dot');

    let index = 0;
    const total = images.length;
    let intervalId;

    function showSlide(i) {
      index = (i + total) % total;
      images.forEach((img, i) => {
        img.classList.remove('active');
        dots[i].classList.remove('active');
      });
      images[index].classList.add('active');
      dots[index].classList.add('active');
    }

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

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        resetInterval();
      });
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
