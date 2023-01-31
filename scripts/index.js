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
const photoPopup = document.querySelector(".popup_photo");

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

  const photoItem = cardElement.querySelectorAll(".element__image");
  const photoPopupElement = (element) => document.querySelector(`.popup_photo ${element}`);
  photoItem.forEach((img) => {
    img.addEventListener("click", (el) => {
    photoPopup.classList.add("popup_opened");
    photoPopupElement("img").src = img.src;
    photoPopupElement("p").textContent = img.alt;
    photoPopupElement("img").alt = img.alt;
  });
});

  return cardElement;
}

const renderCards = (element) => {
  elementsList.append(createCard(element));
};

const addNewCard = (element) => {
  element.preventDefault;
  elementsList.prepend(createCard(element));
  closeNew();
};

initialCards.forEach((item) => {
  renderCards(item);
});

//const newPhotoFormButton = document.querySelector(".popup__submit-button_add"); // ! исправить на форму
const addNewPhotoForm = document.querySelector('.popup__form_add');

const inputPhotoName = document.querySelector(".popup__input-text_type_title");
const inputLink = document.querySelector(".popup__input-text_type_link");

addNewPhotoForm.addEventListener('submit', () => { // ! исправить на submit
  const name = inputPhotoName.value;
  const link = inputLink.value;
  element = {name, link};
  addNewCard(element);
});

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

// Закрывает попап добавления фото
function closePhoto() {
  photoPopup.classList.remove('popup_opened');
}

const closePhotoButton = document.querySelector('.popup__close-button_photo');

closePhotoButton.addEventListener("click", closePhoto);
