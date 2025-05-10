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
        height: 100%;
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
