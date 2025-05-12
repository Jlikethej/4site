<script>
(function () {
  const html = `
    <div id="form-container">
      <h2>Подача заявления онлайн</h2>
      <form id="application-form">
        <input type="hidden" name="_subject" value="Новое заявление с сайта">

        <div class="form-row">
          <div class="form-group">
            <label for="lastname">Фамилия</label>
            <input type="text" id="lastname" name="lastname" required>
          </div>
          <div class="form-group">
            <label for="firstname">Имя</label>
            <input type="text" id="firstname" name="firstname" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="middlename">Отчество</label>
            <input type="text" id="middlename" name="middlename">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label for="program">Выбор специальности</label>
            <select id="program" name="program" required>
              <option value="">-- выберите специальность --</option>
              <option value="08.02.04">08.02.04 Водоснабжение и водоотведение</option>
              <option value="38.02.01">38.02.01 Экономика и бухгалтерский учет</option>
              <option value="13.02.11">13.02.11 Техническая эксплуатация и обслуживание электрического и электромеханического оборудования</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="passport">Скан паспорта</label>
            <input type="file" id="passport" name="passport" required>
          </div>
          <div class="form-group">
            <label for="education">Скан документа об образовании</label>
            <input type="file" id="education" name="education" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="photo">Фотография 3x4</label>
            <input type="file" id="photo" name="photo" required>
          </div>
          <div class="form-group">
            <label for="additional">Прочие документы (СНИЛС и т.д.)</label>
            <input type="file" id="additional" name="additional" multiple>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="application_statement">Скан заявления</label>
            <input type="file" id="application_statement" name="application_statement" required>
          </div>
          <div class="form-group">
            <label for="dormitory_statement">Скан заявления на общежитие</label>
            <input type="file" id="dormitory_statement" name="dormitory_statement" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label for="consent">Скан согласия на обработку персональных данных</label>
            <input type="file" id="consent" name="consent" required>
          </div>
        </div>

        <button type="submit">Отправить заявление</button>
      </form>
      <div id="form-success" class="hidden">Заявление успешно отправлено!</div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;

  const workZone = document.querySelector('.constructor__work-zone');
  if (workZone) {
    workZone.appendChild(container);
  } else {
    console.error('Контейнер с классом constructor__work-zone не найден!');
  }

  const style = document.createElement("style");
  style.textContent = `
    #form-container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 30px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      font-family: sans-serif;
    }

    #form-container h2 {
      text-align: center;
      margin-bottom: 25px;
    }

    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .form-group {
      flex: 1 1 48%;
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      flex: 1 1 100%;
    }

    .form-group label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .form-group input,
    .form-group select {
      padding: 10px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

     #application-form button {
      width: 200px;
      padding: 12px;
      font-size: 18px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      display: block;
      margin: 30px auto 0; /* центрирование */
    }


    #application-form button:hover {
      background-color: #0056b3;
    }

    #form-success {
      margin-top: 20px;
      padding: 15px;
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      border-radius: 6px;
      text-align: center;
    }

    .hidden {
      display: none;
    }
  `;
  document.head.appendChild(style);

  emailjs.init("YOUR_USER_ID"); // ← сюда вставь свой Public Key от EmailJS

  const form = document.getElementById("application-form");
  const successMessage = document.getElementById("form-success");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm('service_ejbo31j', 'YOUR_TEMPLATE_ID', form)
      .then(() => {
        form.reset();
        successMessage.classList.remove("hidden");
      }, (error) => {
        alert("Ошибка отправки: " + error.text);
      });
  });
})();
</script>
