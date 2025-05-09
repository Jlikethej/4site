(function () {
  const sliderHTML = `
    <style>
      .custom-slider {
        position: relative;
        width: 100%;
        overflow: hidden;
      }

      .custom-slides {
        display: flex;
        transition: transform 0.8s ease-in-out;
      }

      .custom-slides img {
        width: 100%;
        flex-shrink: 0;
        object-fit: cover;
        aspect-ratio: 16 / 6;
        border-radius: 12px;
      }

      .custom-prev, .custom-next {
        display: none;
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
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = sliderHTML;

  function initSlider() {
    document.body.insertBefore(container, document.body.firstChild);

    const slides = container.querySelector('.custom-slides');
    const images = container.querySelectorAll('img');
    const prev = container.querySelector('.custom-prev');
    const next = container.querySelector('.custom-next');
    let index = 0;

    function showSlide(i) {
      index = (i + images.length) % images.length;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    if (prev && next) {
      prev.onclick = () => showSlide(index - 1);
      next.onclick = () => showSlide(index + 1);
    }

    setInterval(() => showSlide(index + 1), 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();
