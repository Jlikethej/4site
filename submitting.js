(function () {
  const html = 
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

        <!-- Оставь остальные поля формы без изменений -->
        
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

        <!-- Поля для остальных файлов остаются такими же -->

        <div class="submit-row">
          <button type="submit">Отправить заявление</button>
        </div>
      </form>
      <div id="form-success" class="hidden">Заявление успешно отправлено!</div>
    </div>
  ;

  const container = document.createElement("div");
  container.innerHTML = html;
  const workZone = document.querySelector('.constructor__work-zone');
  if (workZone) {
    workZone.appendChild(container);
  } else {
    console.error('Контейнер с классом constructor__work-zone не найден!');
  }

  const style = document.createElement("style");
  style.textContent = 
    /* Здесь стили остаются без изменений */
  ;
  document.head.appendChild(style);

  // Инициализация EmailJS
  emailjs.init("_3kjXzbKVD1nlOt03"); // используй свой public key

  const form = document.getElementById("application-form");
  const successMessage = document.getElementById("form-success");

  // Авторизация Google
  let gapiLoaded = false;

  function loadGoogleAPI() {
    gapi.load('client:auth2', initGoogleAuth);
  }

  function initGoogleAuth() {
    gapi.auth2.init({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
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
          resolve(https://drive.google.com/uc?id=${file.id});
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

    for (let file of formData.values()) {
      if (file instanceof File) {
        files.push(file);
      }
    }

    const fileUrls = [];

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
      passport_url: fileUrls[0] || '',
      education_url: fileUrls[1] || '',
      // Добавь ссылки для остальных файлов по аналогии
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
