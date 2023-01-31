const editButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__info-add-button");
const closeEditPopupButton = document.querySelector(".popup__close-button");
const closeAddNewPhotoPopupButton = document.querySelector(".popup__close-button_add");
const editPopup = document.querySelector(".popup_edit");
const addNewPhotoPopup = document.querySelector(".popup_add");
const profileName = document.querySelector(".profile__info-title");
const profileCaption = document.querySelector(".profile__info-subtitle");
const inputName = document.querySelector(".popup__input-text_type_name");
const inputCaption = document.querySelector(".popup__input-text_type_caption");
const editFormElement = document.querySelector(".popup__form_edit");

const elementsList = document.querySelector(".elements__list");
const elementsTemplate = document.querySelector(".element-template").content;

//
const createCard = (element) => {
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;

  const deleteButton = cardElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', () => {
    const element = document.querySelector(".element__delete").closest(".elements__list-item");
    element.remove();
  });

  const likeButton = cardElement.querySelectorAll(".element__like");
  likeButton.forEach(function (el) {
    el.addEventListener("click", function () {
      el.classList.toggle("element__like_active");
    });
  });

  return cardElement;
}

const renderCards = (element) => {
  elementsList.append(createCard(element));
};

const addNewCard = (element) => {
  element.preventDefault;
  const name = document.querySelector(".popup__input-text_type_name");
  const link = document.querySelector(".popup__input-text_type_link");
  elementsList.prepend(createCard(element));
  closeNew();
};

initialCards.forEach((item) => {
  renderCards(item);
});

const newPhotoFormButton = document.querySelector(".popup__submit-button_add"); // вводим переменную для формы

newPhotoFormButton.addEventListener('click', addNewCard);

//const addNewPhotoForm = document.querySelector('.popup__form_add');

//addNewPhotoForm.addEventListener('submit', editFormSubmitHandler);

// Открывает попап редактирования профиля
function openEditPopup() {
  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
  editPopup.classList.add("popup_opened");
}

// Закрывает попап редактирования профиля
function closeEditPopup() {
  editPopup.classList.remove("popup_opened");
}

// Меняет имя и подпись
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;
  closeEditPopup();
}

// Открывает попап добавления фото
function openNewPopup() {
  addNewPhotoPopup.classList.add("popup_opened");
}

// Закрывает попап добавления фото
function closeNew() {
  addNewPhotoPopup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openEditPopup);
closeEditPopupButton.addEventListener("click", closeEditPopup);
editFormElement.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", openNewPopup);
closeAddNewPhotoPopupButton.addEventListener("click", closeNew);

// Добавляет карточку с местом и фото
//const elementContainer = document.querySelector(".elements__list"); // вводим переменную для списка карточек
//
//function createCard(titleValue, linkValue) { // создаем метод createCard, примет параметрами имя и ссылку
//  const cardElement = elementsTemplate.cloneNode(true); // создаем клон темплейта
//  cardElement.querySelector('.element__title').textContent = titleValue; // задаем в него данные
//  cardElement.querySelector('.element__image').src = linkValue;
//  cardElement.querySelector('.element__title').alt = titleValue;
//  elementContainer.prepend(cardElement); // добавляем на страницу результат вызова метода
//  closeNew();
//  document.querySelector('.element__like').addEventListener('click', function (evt) {
//    evt.target.classList.toggle('element__like_active');
//  });
//  document.querySelector('.element__image').addEventListener("click", (el) => {
//    photoPopup.classList.add("popup_opened");
//    photoPopupElement(".popup__photo-image").src = document.querySelector('.element__image').src;
//    photoPopupElement(".popup__photo-caption").textContent = document.querySelector('.element__title').textContent;
//    photoPopupElement(".popup__photo-image").alt = document.querySelector('.element__image').alt;
//  });
//  document.querySelector('.element__delete').addEventListener("click", function () {
//    const element = document.querySelector(".element__delete").closest(".elements__list-item");
//    element.remove();
//  });
//}

//newPhotoFormButton.addEventListener('click', function () {
//  const title = document.querySelector(".popup__input-text_type_title");
//  const link = document.querySelector(".popup__input-text_type_link");
//
//  createCard(title.value, link.value);
//
//  title.value = '';
//  link.value = '';
//});


// Открывает попап c большим фото
const photoPopup = document.querySelector(".popup_photo");
const photoItem = document.querySelectorAll(".element__image");
const photoPopupElement = (element) =>
  document.querySelector(`.popup_photo ${element}`);

photoItem.forEach((img) => {
  img.addEventListener("click", (el) => {
    photoPopup.classList.add("popup_opened");
    photoPopupElement("img").src = img.src;
    photoPopupElement("p").textContent = img.alt;
    photoPopupElement("img").alt = img.alt;
  });
});

// Закрывает попап добавления фото
function closePhoto() {
  photoPopup.classList.remove('popup_opened');
}

const closePhotoButton = document.querySelector('.popup__close-button_photo');

closePhotoButton.addEventListener("click", closePhoto);
