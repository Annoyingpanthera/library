document.addEventListener('DOMContentLoaded', () => {
  const successNotification = document.getElementById("success-notification");
  successNotification.style.display = "none";
  let items = document.querySelectorAll('.img-container .img');
  let currentActiveIndex = 0;
  let isEnabled = true;
  let closeSuccessNotificationButton = null;
  let isLoggedIn = false;
  let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
  let ownBooksCount = 0;

  function hideItem(direction) {
    isEnabled = false;
    items[currentActiveIndex].classList.add(direction);
    items[currentActiveIndex].addEventListener('animationend', function () {
      this.classList.remove('active', direction);
    });
  }

  function showItem(direction) {
    items[currentActiveIndex].classList.add('next', direction);
    items[currentActiveIndex].addEventListener('animationend', function () {
      this.classList.remove('next', direction);
      this.classList.add('active');
      isEnabled = true;
    });
  }

  function updateActiveImages() {
    items.forEach((item, index) => {
      const position = index - currentActiveIndex;
      if (position >= 0 && position <= 2) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  function updateArrows() {
    if (currentActiveIndex === 0) {
      document.querySelector('.control.left').classList.add('disabled');
    } else {
      document.querySelector('.control.left').classList.remove('disabled');
    }

    if (currentActiveIndex >= items.length - 3) {
      document.querySelector('.control.right').classList.add('disabled');
    } else {
      document.querySelector('.control.right').classList.remove('disabled');
    }
  }

  const prevButton = document.querySelector('.control.left');
  const nextButton = document.querySelector('.control.right');
  const carouselButtons = document.querySelectorAll('.btn');

  nextButton.addEventListener('click', () => {
    if (isEnabled && currentActiveIndex < items.length - 1) {
      currentActiveIndex++;
      updateActiveImages();
      updateArrows();
      updateButtons();
    }
  });

  prevButton.addEventListener('click', () => {
    if (isEnabled && currentActiveIndex > 0) {
      currentActiveIndex--;
      updateActiveImages();
      updateArrows();
      updateButtons();
    }
  });

  carouselButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (isEnabled) {
        currentActiveIndex = index;
        updateActiveImages();
        updateArrows();
        updateButtons();
      }
    });
  });

  function updateArrows() {
    if (currentActiveIndex === 0) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }

    if (currentActiveIndex >= items.length - 1) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
  }

  function updateButtons() {
    carouselButtons.forEach((button, index) => {
      if (index === currentActiveIndex) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  updateActiveImages();
  updateArrows();
  updateButtons();

  const slides = document.querySelectorAll('.books');
  const buttons = document.querySelectorAll('.season-buttons input[type="radio"]');

  const activateSeasonWithAnimation = (index) => {
    setTimeout(() => {
      for (let i = index * 4; i < index * 4 + 4; i++) {
        slides[i].classList.add('active');
      }
    }, 300);

    setTimeout(() => {
      slides.forEach((slide, slideIndex) => {
        if (!slide.classList.contains('active')) {
          slide.style.display = 'none';
        } else {
          slide.style.display = 'flex';
        }
      });
    }, 500);
  };

  buttons.forEach((button, index) => {
    button.addEventListener('change', () => {
      if (button.checked) {
        slides.forEach(slide => {
          slide.classList.remove('active');
        });

        activateSeasonWithAnimation(index);
      }
    });
  });

  activateSeasonWithAnimation(0);

  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const closeIcon = document.getElementById('closeIcon');

  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  closeIcon.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  const profileIcon = document.getElementById("profileIcon");
  const profileModal = document.getElementById("non_autorised");
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const loginMenu = document.querySelector(".login_menu");
  const registerMenu = document.querySelector(".register_menu");
  const closeLoginButton = document.querySelector(".login_menu img[alt='close_btn']");
  const closeRegisterButton = document.querySelector(".register_menu img[alt='close_btn']");
  const overlay = document.getElementById("overlay");
  const modalBuyCardContainer = document.getElementById("modal_buy_a_card_container");

  overlay.addEventListener("click", closeProfileMenu);

  window.addEventListener('mousedown', (event) => {
    if (
      profileModal.classList.contains('active') &&
      !profileModal.contains(event.target)
    ) {
    }
  });

  profileIcon.addEventListener("click", () => {
    const autorisedMenu = document.getElementById("autorised");
    const nonAutorisedMenu = document.getElementById("non_autorised");

    if (isLoggedIn) {
      nonAutorisedMenu.classList.remove("active");
      autorisedMenu.classList.toggle("active");
    } else {
      autorisedMenu.classList.remove("active");
      nonAutorisedMenu.classList.toggle("active");
    }
  });
// При инициализации страницы
window.addEventListener("DOMContentLoaded", () => {
  // Получите значение счетчика из локального хранилища, если оно есть
  const storedOwnBooksCount = localStorage.getItem("ownBooksCount");

  if (storedOwnBooksCount) {
    // Если значение счетчика найдено, обновите счетчик и отображение
    ownBooksCount = parseInt(storedOwnBooksCount, 10);
    const ownBooksCounterElement = document.getElementById("ownBooksCounter");

    if (ownBooksCounterElement) {
      ownBooksCounterElement.textContent = ownBooksCount.toString();
    }
  }
});




  function openLoginModal() {
    overlay.style.display = "block";
    loginMenu.style.display = "block";
    registerMenu.style.display = "none";
  }

  function closeLoginModal() {
    overlay.style.display = "none";
    loginMenu.style.display = "none";
  }

  function openRegisterModal() {
    overlay.style.display = "block";
    registerMenu.style.display = "block";
    loginMenu.style.display = "none";
  }

  function closeRegisterModal() {
    overlay.style.display = "none";
    registerMenu.style.display = "none";
  }

  logButton.addEventListener("click", openLoginModal);
  registerButton.addEventListener("click", openRegisterModal);

  closeLoginButton.addEventListener("click", closeLoginModal);
  closeRegisterButton.addEventListener("click", closeRegisterModal);

  overlay.addEventListener("click", () => {
    closeLoginModal();
    closeRegisterModal();
  });

  const registerLink = document.querySelector('a[href="#registerModal"]');
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    closeLoginModal();
    openRegisterModal();
  });

  const loginLink = document.querySelector('a[href="#loginModal"]');
  loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    closeLoginModal();
    openLoginModal();
  });

  const signupButton = document.getElementById("signupButton");
  const loginButtonCards = document.getElementById("get_card_login_Button");

  signupButton.addEventListener("click", openRegisterModal);
  loginButtonCards.addEventListener("click", openLoginModal);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 8;
  }

  const confirmRegisterButton = document.getElementById("confirmRegister");

  confirmRegisterButton.addEventListener("click", () => {
    const firstName = document.querySelector(".register_menu input[type='text'][placeholder='Firstname']").value;
    const lastName = document.querySelector(".register_menu input[type='text'][placeholder='Lastname']").value;
    const email = document.querySelector(".register_menu input[type='email'][placeholder='Email']").value;
    const password = document.querySelector(".register_menu input[type='password'][placeholder='Password']").value;

    if (firstName === "" || lastName === "" || email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Создайте объект пользователя с именем читателя и номером карточки
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      readerName: `${firstName} ${lastName}`,
      cardNumber: generateRandomHexNumber(9)
    };

    // Сохраните объект пользователя в локальное хранилище
    localStorage.setItem('user', JSON.stringify(user));

    saveUserData(firstName, lastName, email, password);
    visitCount++;
    // Получите номер карты из объекта пользователя
    const cardNumber = user.cardNumber;

    // Установите номер карты в элементе с id "card-number"
    const cardNumberElement = document.getElementById("card-number");
    cardNumberElement.textContent = cardNumber;

    successNotification.style.display = "block";
    closeSuccessNotificationButton = document.getElementById("close-success-notification");
    closeRegisterModal();
    closeSuccessNotificationButton.addEventListener("click", () => {
      successNotification.style.display = "none";
    });
  });


  function generateRandomHexNumber(length) {
    let result = '';
    const characters = '0123456789ABCDEF';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  function saveUserData(firstName, lastName, email, password) {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  loginButton.addEventListener("click", login);

  // Обработчик нажатия кнопки "Log Out"
  const logOutButton = document.getElementById("Log_Out");
  logOutButton.addEventListener("click", () => {
    isLoggedIn = false;
    const autorisedMenu = document.getElementById("autorised");
    autorisedMenu.classList.remove("active");
    const nonAutorisedMenu = document.getElementById("non_autorised");
    nonAutorisedMenu.classList.add("active");
  });

  const myProfileButton = document.getElementById("My_profile");
  myProfileButton.addEventListener("click", () => {
    if (isLoggedIn) {
      const profileMenu = document.getElementById("profile_menu");
      profileMenu.classList.add("active"); // Открыть "profileModal"
      overlay.style.display = "block";
      const autorisedMenu = document.getElementById("autorised");
      autorisedMenu.classList.remove("active"); // Закрыть меню "autorised"
    }
  });
  function updateVisitCount() {
    visitCount++; // Увеличиваем счетчик на 1

    // Обновляем значение счетчика на странице
    const visitsCountElement = document.querySelector(".cards_profile_numb");
    if (visitsCountElement) {
      visitsCountElement.textContent = visitCount.toString();
    }

    // Сохраняем обновленное значение счетчика в локальное хранилище
    localStorage.setItem('visitCount', visitCount.toString());
  }


 const loginErrorNotification = document.getElementById("login-error-notification");
  loginErrorNotification.style.display = "none";
  // Обновление статуса авторизации и отображения соответствующего модального окна при успешной авторизации
  function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      alert("Login successful!");
      updateVisitCount();

      isLoggedIn = true; // Установить статус авторизованного пользователя
      const nonAutorisedMenu = document.getElementById("non_autorised");
      nonAutorisedMenu.classList.remove("active"); // Закрыть меню "non_autorised"
      closeLoginModal(); // Закрыть меню логина
      checkButton.style.display = "none";

      // Отображаем блок данных пользователя и бейджей
      getCard.classList.remove("cardcheck");
      profileActive.classList.add("cardcheck");

      // Отображаем блок с информацией о посещениях
      cardItems.forEach((item) => {
        item.style.display = "block";
      });

      // Убираем класс cardcheck у visitProfile
      visitProfile.classList.add("cardcheck");

      // Получите данные пользователя из localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const readerName = user.readerName;
      const cardNumber = user.cardNumber;

      // Найдите соответствующие элементы DOM для обновления
      const readerNameInput = document.querySelector("input[placeholder='Reader\\'s Name']");
      const cardNumberInput = document.querySelector("input[placeholder='Card Number']");

      // Обновите текст элементов DOM с данными профиля
      readerNameInput.value = readerName;
      cardNumberInput.value = cardNumber;

      // Изменяем цвет placeholder на #BB945F
      placeholders.forEach((placeholder) => {
        placeholder.style.color = "#BB945F";
      });

      // Добавляем класс для изменения стилей
      libraryCardsContainer.classList.remove("cardcheck");
      libraryCardsContainer.classList.add("cardchecked");
    } else {
      // Показать уведомление о неверных данных
      const loginErrorNotification = document.getElementById("login-error-notification");
      loginErrorNotification.style.display = "block";

      // Закрыть уведомление через 2 секунды
      setTimeout(() => {
        loginErrorNotification.style.display = "none";
      }, 2000);

      const successNotification = document.querySelector('.notification.success-notification');
      successNotification.style.display = 'block';

      // Закрываем уведомление через 2 секунды (прячем его)
      setTimeout(() => {
        successNotification.style.display = 'none';
      }, 2000);
    }
  }


  const checkButton = document.getElementById("checkCardButton");
  const profileActive = document.querySelector(".card_profile_container");
  const getCard = document.querySelector(".get-card");
  const visitProfile = document.querySelector(".visit_profile");
  const cardItems = document.querySelectorAll(".card_item");
  const readerNameInput = document.querySelector("input[placeholder='Reader\\'s Name']");
  const cardNumberInput = document.querySelector("input[placeholder='Card Number']");
  const user = JSON.parse(localStorage.getItem('user'));
  const placeholders = document.querySelectorAll("input[placeholder]");
  const libraryCardsContainer = document.querySelector(".library-cards__container");

  checkButton.addEventListener("click", () => {
    const readerName = readerNameInput.value;
    const cardNumber = cardNumberInput.value;

    if (user && readerName === user.readerName && cardNumber === user.cardNumber) {
      // При успешной проверке убираем класс cardcheck у getCard и добавляем его к profileActive
      getCard.classList.remove("cardcheck");
      profileActive.classList.add("cardcheck");
      cardItems.forEach((item) => {
        item.style.display = "block";
      });
      // Скрываем кнопку проверки карточки
      checkButton.style.display = "none";

      // Убираем класс cardcheck у visitProfile
      visitProfile.classList.add("cardcheck");

      // При успешной проверке меняем цвет placeholder на #BB945F
      placeholders.forEach((placeholder) => {
        placeholder.style.color = "#BB945F";
      });

      // Добавляем класс для изменения стилей
      libraryCardsContainer.classList.remove("cardcheck");
      libraryCardsContainer.classList.add("cardchecked");

      // Через 10 секунд возвращаем все в исходное состояние
      setTimeout(() => {
        placeholders.forEach((placeholder) => {
          placeholder.style.color = "";
        });

        // Удаляем класс изменения стилей
        libraryCardsContainer.classList.remove("cardchecked");
        libraryCardsContainer.classList.add("cardcheck");

        // Возвращаем кнопку checkCardButton
        checkButton.style.display = "block";

        // Убираем класс cardcheck у profileActive и добавляем его к getCard
        profileActive.classList.remove("cardcheck");
        getCard.classList.add("cardcheck");

        // Скрываем cardItems
        cardItems.forEach((item) => {
          item.style.display = "none";
        });

        // Убираем класс cardcheck у visitProfile
        visitProfile.classList.remove("cardcheck");
      }, 10000);
    } else {
      alert("Invalid Reader's Name or Card Number. Please try again.");
    }
    if (isLoggedIn) {
      // При успешной проверке
      getCard.classList.remove("cardcheck");
      profileActive.classList.add("cardcheck");
      cardItems.forEach((item) => {
        item.style.display = "block";
      });
      checkButton.style.display = "none";
      visitProfile.classList.add("cardcheck");
      placeholders.forEach((placeholder) => {
        placeholder.style.color = "#BB945F";
      });
      libraryCardsContainer.classList.remove("cardcheck");
      libraryCardsContainer.classList.add("cardchecked");
    }

  });

  const openProfileMenu = document.getElementById("profile_menu"); // Переименовали константу
  const profileButton = document.getElementById("my_profile");

  profileButton.addEventListener("click", () => {
    overlay.style.display = "block";
    openProfileMenu.classList.add("active"); // Показать модальное окно "profile_menu"
  });




  // Функция для сброса цвета placeholder
  function resetPlaceholderColor() {
    placeholders.forEach((placeholder) => {
      placeholder.style.color = "";
    });
  }

  // Добавляем обработчик события для каждого input
  placeholders.forEach((placeholder) => {
    placeholder.addEventListener("focus", resetPlaceholderColor);
  });




  function closeLoginModal() {
    overlay.style.display = "none";
    loginMenu.style.display = "none";
  }
  function updateProfileIcon() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const profileIcon = document.getElementById('profileIcon');
    const avatar = document.querySelector('.avatar_text');
    const firstLastText = document.querySelector('.first-last');
    const cardNumberText = document.querySelector('.card_numb_add');
    const user = JSON.parse(localStorage.getItem('user'));

    if (firstName && lastName) {
      const initials = `${firstName.charAt(0).toUpperCase()} ${lastName.charAt(0).toUpperCase()}`;
      profileIcon.textContent = initials;
      avatar.textContent = initials;
      firstLastText.textContent = `${firstName} ${lastName}`;
      cardNumberText.textContent = user.cardNumber; // Обновляем номер карты из объекта user
    }
  }

  function closeProfileMenu() {
    const profileMenu = document.getElementById("profile_menu");
    profileMenu.classList.remove("active");
    overlay.style.display = "none"
  }

  const closeProfileButton = document.querySelector(".close_svg img[alt='close_btn']");
  closeProfileButton.addEventListener("click", closeProfileMenu);

  const copyIcon = document.getElementById('copyIcon');
  const cardNumberText = document.querySelector('.card_numb_add');
  const copyNotification = document.getElementById('copyNotification');

  let isEnabledIcon = true; // Переменная, показывающая, включено ли уведомление

  copyIcon.addEventListener('click', () => {
    if (!isEnabledIcon) return; // Если уведомление отключено, не делаем ничего

    const tempInput = document.createElement('input');
    tempInput.value = cardNumberText.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Показываем уведомление
    copyNotification.classList.add('show');

    // Отключаем уведомление
    isEnabledIcon = false;
    copyNotification.setAttribute('disabled', 'disabled');

    // Скрываем уведомление через 2 секунды и включаем обратно
    setTimeout(() => {
      copyNotification.classList.remove('show');
      isEnabledIcon = true;
      copyNotification.removeAttribute('disabled');
    }, 2000);
  });

// Функция для проверки, является ли строка числовой
function isNumeric(input) {
  return /^\d+$/.test(input);
}

// Функция для валидации полей
function validateForm() {
  const cardNumberInput = document.getElementById("cardNumber");
  const expirationMonthInput = document.getElementById("expirationMonth");
  const expirationYearInput = document.getElementById("expirationYear");
  const cvcInput = document.getElementById("cvv");

  // Проверка, является ли номер карты числовым и имеет 16 символов
  const cardNumberValue = cardNumberInput.value.replace(/\s/g, ''); // Удаляем пробелы
  const isCardNumberValid = isNumeric(cardNumberValue) && cardNumberValue.length === 16;

  // Проверка, что месяц и год истечения срока действия состоят из 2 цифр
  const isExpirationMonthValid = isNumeric(expirationMonthInput.value) && expirationMonthInput.value.length === 2;
  const isExpirationYearValid = isNumeric(expirationYearInput.value) && expirationYearInput.value.length === 2;

  // Проверка, что CVC состоит из 3 цифр
  const isCvcValid = isNumeric(cvcInput.value) && cvcInput.value.length === 3;

  // Активация или деактивация кнопки "Buy" в зависимости от валидности полей
  const buyButton = document.querySelector("button[type='submit']");
  buyButton.disabled = !(isCardNumberValid && isExpirationMonthValid && isExpirationYearValid && isCvcValid);

  // Дополнительно, вы можете добавить стилизацию для инпутов, чтобы указать, что они невалидны
  cardNumberInput.classList.toggle("invalid", !isCardNumberValid);
  expirationMonthInput.classList.toggle("invalid", !isExpirationMonthValid);
  expirationYearInput.classList.toggle("invalid", !isExpirationYearValid);
  cvcInput.classList.toggle("invalid", !isCvcValid);

  // Проверяем, все ли поля валидны
  return isCardNumberValid && isExpirationMonthValid && isExpirationYearValid && isCvcValid;
}

// Добавление обработчиков событий для полей ввода
document.getElementById("cardNumber").addEventListener("input", validateForm);
document.getElementById("expirationMonth").addEventListener("input", validateForm);
document.getElementById("expirationYear").addEventListener("input", validateForm);
document.getElementById("cvv").addEventListener("input", validateForm);

// Обработчик события для кнопок Buy
const buyButtons = document.querySelectorAll(".buy-button");
buyButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (isLoggedIn) {
      overlay.style.display = "block";
      modalBuyCardContainer.style.display = "flex"; // Открываем modal_buy_a_card_container
      loginMenu.style.display = "none"; // Скрываем loginMenu (если открыто)
    } else {
      overlay.style.display = "block";
      loginMenu.style.display = "block"; // Открываем loginMenu
      modalBuyCardContainer.style.display = "none"; // Скрываем modal_buy_a_card_container (если открыто)
    }

    // Сохраняем ссылку на кнопку "Buy", на которую нажали
    const clickedButton = button;

    // Обработчик события для формы
    const cardDataForm = document.getElementById("cardDataForm");
    cardDataForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Предотвратите отправку формы

      if (validateForm()) { // Validate the form again
        // Изменяем текст и атрибуты кнопки "Buy" на "Own" только для нажатой кнопки
        clickedButton.textContent = "Own";
        clickedButton.classList.remove("buy-button");
        clickedButton.classList.add("own");
        clickedButton.classList.add("active");
        clickedButton.disabled = true;
        clickedButton.style.display = "block";
        modalBuyCardContainer.style.display = "none";
        overlay.style.display = "none";

        acquireBook();
      }
    });
  });
});

function acquireBook() {
  // Ваш код для изменения состояния книги на "Own" должен быть здесь

  // После изменения состояния книги, увеличьте счетчик
  ownBooksCount++;

  // Сохраните счетчик в локальное хранилище
  localStorage.setItem("ownBooksCount", ownBooksCount.toString());

  // Шаг 3: Обновление значения счетчика на веб-странице
  const ownBooksCounterElement = document.getElementById("ownBooksCounter");
  if (ownBooksCounterElement) {
    ownBooksCounterElement.textContent = ownBooksCount.toString();
  }
}



// Function to close the modal_buy_a_card_container
function closeModalBuyCardContainer() {
  const modalBuyCardContainer = document.getElementById("modal_buy_a_card_container");
  modalBuyCardContainer.style.display = "none";
  overlay.style.display = "none";
}

// Add an event listener to the close button
const closeBtnW = document.querySelector(".close_btn_w");
closeBtnW.addEventListener("click", closeModalBuyCardContainer);
overlay.addEventListener("click", closeModalBuyCardContainer);
  updateProfileIcon();
});
