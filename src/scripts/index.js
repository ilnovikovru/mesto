import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import '../pages/index.css';

const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input-text_type_error",
  errorClass: "popup__input-error",
};

const editButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__info-add-button");
const closeEditPopupButton = document.querySelector(".popup__close-button");
const closeAddNewPhotoPopupButton = document.querySelector(".popup__close-button_add");
const profileName = document.querySelector(".profile__info-title");
const profileCaption = document.querySelector(".profile__info-subtitle");
const inputName = document.querySelector(".popup__input-text_type_name");
const inputCaption = document.querySelector(".popup__input-text_type_caption");
const editFormElement = document.forms["about"];
const addFormElement = document.querySelector(".popup__form_add");
const elementsList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector(".element-template");
const inputPhotoName = document.querySelector(".popup__input-text_type_title");
const inputLink = document.querySelector(".popup__input-text_type_link");
const closePhotoButton = document.querySelector(".popup__close-button_photo");

const profileValidator = new FormValidator(formValidationConfig, editFormElement);
profileValidator.enableValidation();

const cardFormValidator = new FormValidator(formValidationConfig, addFormElement);
cardFormValidator.enableValidation();

const photoPopup = new PopupWithImage('.popup_photo');
photoPopup.setEventListeners();

const handleOpenPhotoPopup = (title, link) => {
  photoPopup.open(title, link);
}

const createCard = (item) => {
  const cardElement = new Card(item.title, item.link, cardTemplate, handleOpenPhotoPopup).generateCard();
  return cardElement;
}

const renderInitialCard = (item) => {
  elementsList.append(createCard(item));
};

const section = new Section(renderInitialCard, 'elements__list');
section.renderItems(initialCards);

const addNewCard = (item) => {
  elementsList.prepend(createCard(item));
  addNewPhotoPopup.close();
};

const editPopup = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
editPopup.setEventListeners();

const userInfo = new UserInfo({
  selectorOfNameElement: '.profile__info-title',
  selectorOfCaptionElement: '.profile__info-subtitle'
});

function handleProfileFormSubmit({ name, caption }) {
  userInfo.setUserInfo({ name, caption });
}

const addNewPhotoPopup = new PopupWithForm('.popup_add', handleAddPhotoFormSubmit);
addNewPhotoPopup.setEventListeners();

function handleAddPhotoFormSubmit({ title, link }) {
  console.log({ title, link });
  const element = { title, link };
  addNewCard(element);
  inputPhotoName.value = "";
  inputLink.value = "";
  cardFormValidator.toggleButton();
}

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
  editPopup.open();
});
closeEditPopupButton.addEventListener("click", () => {
  editPopup.close();
});

addButton.addEventListener("click", () => {
  addNewPhotoPopup.open();
});
closeAddNewPhotoPopupButton.addEventListener("click", () => {
  addNewPhotoPopup.close();
});

closePhotoButton.addEventListener("click", () => {
  photoPopup.close();
});
