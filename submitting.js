<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Подача заявления онлайн</title>
  <style>
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

    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .form-group {
      flex: 1 1 calc(50% - 20px);
      display: flex;
      flex-direction: column;
    }

    label {
      font-weight: bold;
      margin-top: 10px;
    }

    input[type="text"],
    input[type="email"],
    select {
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    .file-wrapper {
      position: relative;
    }

    .custom-file-label {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: #f1f1f1;
      border: 1px solid #ccc;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
      overflow: hidden;
    }

    .custom-file-label input[type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .file-text {
      pointer-events: none;
      color: #333;
    }

    button[type="submit"] {
      display: block;
      margin: 30px auto 0;
      padding: 12px 0;
      width: 200px;
      font-size: 16px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button[type="submit"]:hover {
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
  </style>
</head>
<body>
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
        <div class="form-group" style="flex: 1 1 100%;">
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
          <div class="file-wrapper">
            <label class="custom-file-label">
              <input type="file" id="passport" name="passport" required>
              <span class="file-text">Выберите файл...</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="education">Скан документа об образовании</label>
          <div class="file-wrapper">
            <label class="custom-file-label">
              <input type="file" id="education" name="education" required>
              <span class="file-text">Выберите файл...</span>
            </label>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="photo">Фотография 3x4</label>
          <div class="file-wrapper">
            <label class="custom-file-label">
              <input type="file" id="photo" name="photo" required>
              <span class="file-text">Выберите файл...</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="additional">Прочие документы (СНИЛС и т.д.)</label>
          <div class="file-wrapper">
            <label class="custom-file-label">
              <input type="file" id="additional" name="additional" multiple>
              <span class="file-text">Выберите файл...</span>
            </label>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="application_statement">Скан заявления</label>
          <div class="file-wrapper">
            <label class="custom-file-label">
              <input type="file" id="application_statement" name="application_statement" required>
              <span class="file-text">Выберите файл...</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="dormitory_statement">Скан заявления на общежитие</label>
          <div class="file-wrapper">
            <label class="custom-file-label">
              <input type="file" id="dormitory_statement" name="dormitory_statement" required>
              <span class="file-text">Выберите файл...</span>
            </label>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group" style="flex: 1 1 100%;">
          <label for="consent">Скан согласия на обработку персональных данных</label>
          <div class="file-wrapper">
            <label class="custom-file-label">
              <input type="file" id="consent" name="consent" required>
              <span class="file-text">Выберите файл...</span>
            </label>
          </div>
        </div>
      </div>

      <button type="submit">Отправить заявление</button>
      <div id="form-success" class="hidden">Заявление успешно отправлено!</div>
    </form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
  <script>
    emailjs.init("_3kjXzbKVD1nlOt03");

    const form = document.getElementById("application-form");
    const successMessage = document.getElementById("form-success");

    form.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', () => {
        const span = input.closest('.custom-file-label').querySelector('.file-text');
        if (input.files.length > 0) {
          span.textContent = input.files.length === 1
            ? input.files[0].name
            : `${input.files.length} файла(-ов) выбрано`;
        } else {
          span.textContent = "Выберите файл...";
        }
      });
    });

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
  </script>
</body>
</html>
