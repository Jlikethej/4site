(function() {
  // Создание HTML-структуры
  const slider = document.createElement('div');
  slider.innerHTML = `
    <style>
      .custom-slider {
        position: relative;
        width: 100%;
        max-width: 1200px;
        height: 400px;
        overflow: hidden;
        margin: auto;
      }
      .custom-slides {
        display: flex;
        width: 300%;
        transition: transform 0.5s ease-in-out;
        height: 100%;
      }
      .custom-slides img {
        width: 100%;
        object-fit: cover;
      }
      .custom-prev, .custom-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        color: white;
        font-size: 2em;
        border: none;
        cursor: pointer;
        padding: 0 10px;
        z-index: 10;
      }
      .custom-prev { left: 10px; }
      .custom-next { right: 10px; }
    </style>
    <div class="custom-slider">
      <div class="custom-slides">
        <img src="/uploads/sites_uploads/site-1803/slider/895258/1.jpeg" style="width:100%;border-radius:12px;">
        <img src="/uploads/sites_uploads/site-1803/slider/895259/2.jpeg" style="width:100%;border-radius:12px;">
        <img src="/uploads/sites_uploads/site-1803/slider/895260/3.jpeg" style="width:100%;border-radius:12px;">
        <img src="/uploads/sites_uploads/site-1803/slider/895261/4.jpeg" style="width:100%;border-radius:12px;">
      </div>
      <button class="custom-prev">&#10094;</button>
      <button class="custom-next">&#10095;</button>
    </div>
  `;
  document.body.prepend(slider);

  // JS-логика
  const slides = slider.querySelector('.custom-slides');
  const images = slider.querySelectorAll('img');
  const prev = slider.querySelector('.custom-prev');
  const next = slider.querySelector('.custom-next');
  let index = 0;

  function showSlide(i) {
    if (i < 0) index = images.length - 1;
    else if (i >= images.length) index = 0;
    else index = i;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  prev.onclick = () => showSlide(index - 1);
  next.onclick = () => showSlide(index + 1);

  setInterval(() => showSlide(index + 1), 5000);
})();
