(function () {
  const html = `
    <div id="form-container">
      <h2>Подача заявления онлайн</h2>
      <form id="application-form">
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

        <div class="row">
          <div class="form-group">
            <label for="passport">Скан паспорта</label>
            <input type="file" id="passport" name="passport" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
          </div>
          <div class="form-group">
            <label for="education">Документ об образовании</label>
            <input type="file" id="education" name="education" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
          </div>
        </div>

        <div class="row">
          <div class="form-group">
            <label for="photo">Фотография 3x4</label>
            <input type="file" id="photo" name="photo" accept=".jpg,.jpeg,.png">
          </div>
          <div class="form-group">
            <label for="additional">Прочие документы</label>
            <input type="file" id="additional" name="additional" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
          </div>
        </div>

        <div class="row">
          <div class="form-group">
            <label for="application_statement">Скан заявления</label>
            <input type="file" id="application_statement" name="application_statement" accept=".pdf,.jpg,.jpeg,.png">
          </div>
          <div class="form-group">
            <label for="dormitory_statement">Скан заявления на общежитие</label>
            <input type="file" id="dormitory_statement" name="dormitory_statement" accept=".pdf,.jpg,.jpeg,.png">
          </div>
        </div>

        <div class="row">
          <div class="form-group" style="width: 100%">
            <label for="consent">Скан согласия на обработку персональных данных</label>
            <input type="file" id="consent" name="consent" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
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
  } else {
    console.error('Контейнер с классом constructor__work-zone не найден!');
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

    #form-container h2 {
      text-align: center;
      margin-bottom: 20px;
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

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    .file-name {
      margin-top: 5px;
      font-size: 14px;
      color: #555;
      font-style: italic;
    }

    .submit-row {
      display: flex;
      justify-content: center;
    }

    #application-form button {
      width: 400px;
      padding: 12px;
      font-size: 16px;
      border-radius: 6px;
      border: none;
      background-color: #007BFF;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
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

  // Инициализация EmailJS
  emailjs.init("_3kjXzbKVD1nlOt03"); // используйте свой public key

  const form = document.getElementById("application-form");
  const successMessage = document.getElementById("form-success");

  // Авторизация Google API
  let gapiLoaded = false;

  function loadGoogleAPI() {
    gapi.load('client:auth2', initGoogleAuth);
  }

  function initGoogleAuth() {
    gapi.auth2.init({
      client_id: '837486853816-preg9mlngaqoi5kp4mkafjv6shmle2ua.apps.googleusercontent.com  ',
    }).then(() => {
      gapiLoaded = true;
    });
  }

  function uploadFileToGoogleDrive(file) {
    return new Promise((resolve, reject) => {
      const fileMetadata = {
        'name': file.name,
        'mimeType': file.type
      };

      const media = {
        mimeType: file.type,
        body: file
      };

      const request = gapi.client.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      });

      request.execute(function(file) {
        if (file.id) {
          resolve(`https://drive.google.com/uc?id=${file.id}`);
        } else {
          reject('Ошибка загрузки файла на Google Drive');
        }
      });
    });
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!gapiLoaded) {
      alert("Google API не загружен. Попробуйте снова.");
      return;
    }

    const formData = new FormData(form);
    const files = [];
    const fileUrls = [];

    for (let file of formData.values()) {
      if (file instanceof File) {
        files.push(file);
      }
    }

    // Загружаем файлы на Google Drive
    for (const file of files) {
      try {
        const fileUrl = await uploadFileToGoogleDrive(file);
        fileUrls.push(fileUrl);
      } catch (error) {
        alert(error);
      }
    }

    // После загрузки файлов на Google Drive, передаем ссылки на них в EmailJS
    const emailData = {
      lastname: formData.get('lastname'),
      firstname: formData.get('firstname'),
      middlename: formData.get('middlename'),
      email: formData.get('email'),
      passport_url: fileUrls[0] || '',
      education_url: fileUrls[1] || '',
      photo_url: fileUrls[2] || '',
      additional_url: fileUrls[3] || '',
      application_statement_url: fileUrls[4] || '',
      dormitory_statement_url: fileUrls[5] || '',
      consent_url: fileUrls[6] || ''
    };

    emailjs.send('service_ejbo31j', 'template_m0i7mf8', emailData)
      .then(() => {
        form.reset();
        successMessage.classList.remove("hidden");
      }, (error) => {
        alert("Ошибка отправки: " + error.text);
      });
  });

  // Загружаем Google API
  loadGoogleAPI();
})();
