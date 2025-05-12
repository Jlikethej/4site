(function () {
  const html = `
    <div id="form-container">
      <h2>Подача заявления онлайн</h2>
      <form id="application-form">
        <input type="hidden" name="_subject" value="Новое заявление с сайта">

        <label for="lastname">Фамилия</label>
        <input type="text" id="lastname" name="lastname" required>

        <label for="firstname">Имя</label>
        <input type="text" id="firstname" name="firstname" required>

        <label for="middlename">Отчество</label>
        <input type="text" id="middlename" name="middlename">

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="program">Выбор специальности</label>
        <select id="program" name="program" required>
          <option value="">-- выберите специальность --</option>
          <option value="08.02.04">08.02.04 Водоснабжение и водоотведение</option>
          <option value="38.02.01">38.02.01 Экономика и бухгалтерский учет</option>
          <option value="13.02.11">13.02.11 Техническая эксплуатация и обслуживание электрического и электромеханического оборудования</option>
        </select>

        <label for="passport">Паспорт (PDF/JPG)</label>
        <input type="file" id="passport" name="passport" accept=".pdf,.jpg,.jpeg,.png" required>

        <label for="education">Документ об образовании</label>
        <input type="file" id="education" name="education" accept=".pdf,.jpg,.jpeg,.png" required>

        <label for="photo">Фотография 3x4</label>
        <input type="file" id="photo" name="photo" accept=".jpg,.jpeg,.png" required>

        <label for="additional">Прочие документы (по желанию)</label>
        <input type="file" id="additional" name="additional" multiple accept=".pdf,.jpg,.jpeg,.png">

        <label>
          <input type="checkbox" name="agree" required>
          Согласие на обработку персональных данных
        </label>

        <button type="submit">Отправить заявление</button>
      </form>
      <div id="form-success" class="hidden">Заявление успешно отправлено!</div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  const style = document.createElement("style");
  style.textContent = `
    #form-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      font-family: sans-serif;
    }

    #form-container h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    #form-container label {
      display: block;
      margin-top: 10px;
      font-weight: bold;
    }

    #form-container input,
    #form-container select,
    #form-container button {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    #form-container button {
      background-color: #007BFF;
      color: white;
      border: none;
      margin-top: 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    #form-container button:hover {
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

  // Инициализация EmailJS с твоим User ID
  emailjs.init("_3kjXzbKVD1nlOt03");  // Замените на ваш User ID

  const form = document.getElementById("application-form");
  const successMessage = document.getElementById("form-success");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Сбор данных формы
    const formData = new FormData(form);

    // Отправка формы через EmailJS
    emailjs.sendForm('service_ejbo31j', 'YOUR_TEMPLATE_ID', form)  // Замените на ваш Template ID
      .then(() => {
        form.reset();
        successMessage.classList.remove("hidden");
      }, (error) => {
        alert("Ошибка отправки: " + error.text);
      });
  });
})();
