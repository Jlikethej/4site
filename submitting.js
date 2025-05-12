(function () {
  const html = `
    <div id="form-container">
      <h2>Подача заявления онлайн</h2>
      <form id="application-form">
        <input type="hidden" name="_subject" value="Новое заявление с сайта">

        <div class="row">
          <div class="form-group">
            <label for="lastname">Фамилия</label>
            <input type="text" id="lastname" name="lastname" required>
          </div>
          <div class="form-group">
            <label for="firstname">Имя</label>
            <input type="text" id="firstname" name="firstname" required>
          </div>
        </div>

        <div class="row">
          <div class="form-group">
            <label for="middlename">Отчество</label>
            <input type="text" id="middlename" name="middlename">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
        </div>

        <div class="row">
          <div class="form-group" style="width: 100%">
            <label for="program">Выбор специальности</label>
            <select id="program" name="program" required>
              <option value="">-- выберите специальность --</option>
              <option value="08.02.04">08.02.04 Водоснабжение и водоотведение</option>
              <option value="38.02.01">38.02.01 Экономика и бухгалтерский учет</option>
              <option value="13.02.11">13.02.11 Техническая эксплуатация и обслуживание электрического и электромеханического оборудования</option>
            </select>
          </div>
        </div>

        <!-- Первая строка загрузки -->
        <div class="row">
          <div class="form-group">
            <label for="passport">Скан паспорта</label>
            <input type="file" id="passport" name="passport" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required>
          </div>
          <div class="form-group">
            <label for="education">Скан документа об образовании</label>
            <input type="file" id="education" name="education" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required>
          </div>
        </div>

        <!-- Вторая строка загрузки -->
        <div class="row">
          <div class="form-group">
            <label for="photo">Фотография 3x4</label>
            <input type="file" id="photo" name="photo" accept=".jpg,.jpeg,.png" required>
          </div>
          <div class="form-group">
            <label for="additional">Прочие документы (СНИЛС и т.д.)</label>
            <input type="file" id="additional" name="additional" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
          </div>
        </div>

        <!-- Третья строка загрузки -->
        <div class="row">
          <div class="form-group">
            <label for="application_statement">Скан заявления</label>
            <input type="file" id="application_statement" name="application_statement" accept=".pdf,.jpg,.jpeg,.png" required>
          </div>
          <div class="form-group">
            <label for="dormitory_statement">Скан заявления на общежитие</label>
            <input type="file" id="dormitory_statement" name="dormitory_statement" accept=".pdf,.jpg,.jpeg,.png" required>
          </div>
        </div>

        <!-- Четвёртая строка -->
        <div class="row">
          <div class="form-group" style="width: 100%">
            <label for="consent">Скан согласия на обработку персональных данных</label>
            <input type="file" id="consent" name="consent" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required>
          </div>
        </div>

        <button type="submit">Отправить заявление</button>
      </form>
      <div id="form-success" class="hidden">Заявление успешно отправлено!</div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;

  // Вставляем форму в .constructor__work-zone
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
      margin-bottom: 30px;
    }

    .row {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .form-group {
      flex: 1;
      min-width: 0;
    }

    .form-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 6px;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 16px;
      box-sizing: border-box;
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
      margin: 30px auto 0;
    }

    #application-form button:hover {
      background-color: #0056b3;
    }

    #form-success {
      margin-top: 30px;
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

  // EmailJS инициализация
  emailjs.init("YOUR_USER_ID"); // замените на ваш PUBLIC KEY

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
