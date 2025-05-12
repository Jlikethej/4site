(function () {
  const html = `
    <div id="form-container">
      <h2>Подача заявления онлайн</h2>
      <form id="application-form">
        <!-- Поля формы -->
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
        <!-- Файлы -->
        <div class="row">
          <div class="form-group">
            <label for="passport">Скан паспорта</label>
            <input type="file" id="passport" name="passport">
          </div>
          <div class="form-group">
            <label for="education">Документ об образовании</label>
            <input type="file" id="education" name="education">
          </div>
        </div>
        <div class="row">
          <div class="form-group">
            <label for="photo">Фотография 3x4</label>
            <input type="file" id="photo" name="photo">
          </div>
          <div class="form-group">
            <label for="additional">Прочие документы</label>
            <input type="file" id="additional" name="additional" multiple>
          </div>
        </div>
        <div class="row">
          <div class="form-group">
            <label for="application_statement">Скан заявления</label>
            <input type="file" id="application_statement" name="application_statement">
          </div>
          <div class="form-group">
            <label for="dormitory_statement">Скан заявления на общежитие</label>
            <input type="file" id="dormitory_statement" name="dormitory_statement">
          </div>
        </div>
        <div class="row">
          <div class="form-group" style="width: 100%">
            <label for="consent">Скан согласия на обработку персональных данных</label>
            <input type="file" id="consent" name="consent">
          </div>
        </div>
        <div class="submit-row">
          <button type="submit">Отправить заявление</button>
        </div>
      </form>
      <div id="form-success" class="hidden">Заявление успешно отправлено!</div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;
  const workZone = document.querySelector('.constructor__work-zone');
  if (workZone) {
    workZone.appendChild(container);
  }

  const style = document.createElement("style");
  style.textContent = `
    #form-container {
      max-width: 1000px;
      margin: 40px auto;
      padding: 20px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      font-family: sans-serif;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      flex: 1 1 45%;
      display: flex;
      flex-direction: column;
    }

    .form-group input, .form-group select {
      padding: 12px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    .submit-row {
      display: flex;
      justify-content: center;
    }

    button {
      padding: 12px 20px;
      font-size: 16px;
      border-radius: 6px;
      border: none;
      background-color: #007BFF;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    #form-success {
      margin-top: 20px;
      padding: 15px;
      background-color: #d4edda;
      color: #155724;
      border-radius: 6px;
      text-align: center;
    }

    .hidden { display: none; }
  `;
  document.head.appendChild(style);

  const form = document.getElementById("application-form");
  const successMessage = document.getElementById("form-success");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const attachments = [];

    const allFiles = [
      'passport', 'education', 'photo',
      'application_statement', 'dormitory_statement', 'consent'
    ];

    // Обработка одиночных файлов
    for (let name of allFiles) {
      const file = formData.get(name);
      if (file && file.size > 0) {
        const base64 = await toBase64(file);
        attachments.push({
          content: base64,
          filename: file.name,
          type: file.type,
          disposition: "attachment"
        });
      }
    }

    // Прочие документы (множественные)
    const additionalFiles = formData.getAll('additional');
    for (let file of additionalFiles) {
      if (file && file.size > 0) {
        const base64 = await toBase64(file);
        attachments.push({
          content: base64,
          filename: file.name,
          type: file.type,
          disposition: "attachment"
        });
      }
    }

    const body = {
      personalizations: [{
        to: [{ email: "perovvbk@gmail.com" }],
        subject: "Новое заявление от " + formData.get("firstname") + " " + formData.get("lastname")
      }],
      from: { email: "perovvbk@gmail.com" },
      content: [{
        type: "text/plain",
        value: `
Фамилия: ${formData.get("lastname")}
Имя: ${formData.get("firstname")}
Отчество: ${formData.get("middlename")}
Email: ${formData.get("email")}
Специальность: ${formData.get("program")}
        `.trim()
      }],
      attachments: attachments
    };

     try {
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        form.reset();
        successMessage.classList.remove("hidden");
      } else {
        alert("Ошибка отправки: " + response.statusText);
      }
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = error => reject(error);
    });
  }
})();
