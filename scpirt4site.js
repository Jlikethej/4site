(function () {
  // Создаём HTML
  const html = `
    <div id="floating-buttons">
      <button id="proposal-btn">Отправить предложение</button>
      <button id="pay-btn">Оплатить по QR-коду</button>
    </div>

    <div id="modal-overlay" class="hidden"></div>

    <div id="proposal-modal" class="modal hidden">
      <div class="modal-content">
        <h2>Отправить предложение</h2>
        <p>Здесь будет форма для отправки предложения.</p>
        <button class="close-modal">Закрыть</button>
      </div>
    </div>

    <div id="pay-modal" class="modal hidden">
      <div class="modal-content">
        <h2>Оплата по QR-коду</h2>
        <img src="/uploads/sites_uploads/site-1803/qr/874211/qr_site_VTB.png" style="width:100%;border-radius:12px;">
        <button class="close-modal">Закрыть</button>
      </div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  // Добавляем CSS
  const style = document.createElement("style");
  style.textContent = `
    #floating-buttons {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    }
    #floating-buttons button {
      background-color: red;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      transition: background-color 0.3s ease;
    }
    #floating-buttons button:hover {
      background-color: darkred;
    }

    #modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      z-index: 9998;
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.3);
      z-index: 9999;
      max-width: 400px;
      width: 90%;
    }

    .modal-content {
      text-align: center;
    }

    .close-modal {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: red;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }

    .close-modal:hover {
      background-color: darkred;
    }

    .hidden {
      display: none;
    }
  `;
  document.head.appendChild(style);

  // Функциональность
  const overlay = document.getElementById("modal-overlay");
  const proposalModal = document.getElementById("proposal-modal");
  const payModal = document.getElementById("pay-modal");

  document.getElementById("proposal-btn").onclick = function () {
    overlay.classList.remove("hidden");
    proposalModal.classList.remove("hidden");
  };

  document.getElementById("pay-btn").onclick = function () {
    overlay.classList.remove("hidden");
    payModal.classList.remove("hidden");
  };

  document.querySelectorAll(".close-modal").forEach((button) => {
    button.onclick = function () {
      overlay.classList.add("hidden");
      proposalModal.classList.add("hidden");
      payModal.classList.add("hidden");
    };
  });

  overlay.onclick = function () {
    overlay.classList.add("hidden");
    proposalModal.classList.add("hidden");
    payModal.classList.add("hidden");
  };
})();
