import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
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
const editPopup = document.querySelector(".popup_edit");
const addNewPhotoPopup = document.querySelector(".popup_add");
const profileName = document.querySelector(".profile__info-title");
const profileCaption = document.querySelector(".profile__info-subtitle");
const inputName = document.querySelector(".popup__input-text_type_name");
const inputCaption = document.querySelector(".popup__input-text_type_caption");
const editFormElement = document.forms["about"];
const addFormElement = document.querySelector(".popup__form_add");
const photoPopup = document.querySelector(".popup_photo");
const photoPopupImage = photoPopup.querySelector('.popup__photo-image');
const photoPopupCaption = photoPopup.querySelector('.popup__photo-caption');
const elementsList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector(".element-template");

const profileValidator = new FormValidator(formValidationConfig, editFormElement);
profileValidator.enableValidation();

const cardFormValidator = new FormValidator(formValidationConfig, addFormElement);
cardFormValidator.enableValidation();

const createCard = (item) => {
  const cardElement = new Card(item.name, item.link, cardTemplate).generateCard();
  return cardElement;
}

const renderInitialCard = (item) => {
  elementsList.append(createCard(item));
};

const section = new Section(renderInitialCard, elementsList); // инициализирую класс, передаю ему функцию рендера и контейнер
section.renderItems(initialCards); // вызываю функцию ренедра и передаю ей данные

const addNewCard = (item) => {
  elementsList.prepend(createCard(item));
  closePopup(addNewPhotoPopup);
};

initialCards.forEach(renderInitialCard);

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

const inputPhotoName = document.querySelector(".popup__input-text_type_title");
const inputLink = document.querySelector(".popup__input-text_type_link");

addFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = inputPhotoName.value;
  const link = inputLink.value;
  const element = { name, link };
  addNewCard(element);
  inputPhotoName.value = "";
  inputLink.value = "";
  cardFormValidator.toggleButton();
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;
  closePopup(editPopup);
}

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
  openPopup(editPopup);
});
closeEditPopupButton.addEventListener("click", () => {
  closePopup(editPopup);
});
editFormElement.addEventListener("submit", handleProfileFormSubmit);
addButton.addEventListener("click", () => {
  openPopup(addNewPhotoPopup);
});
closeAddNewPhotoPopupButton.addEventListener("click", () => {
  closePopup(addNewPhotoPopup);
});

const closePhotoButton = document.querySelector(".popup__close-button_photo");

closePhotoButton.addEventListener("click", () => {
  closePopup(photoPopup);
});

function closePopupByOverlay() {
  const popupOverlayList = Array.from(
    document.querySelectorAll(".popup__overlay")
  );
  popupOverlayList.forEach((popupOverlay) => {
    popupOverlay.addEventListener("click", () => {
      const element = popupOverlay.closest(".popup");
      closePopup(element);
    });
  });
}
closePopupByOverlay();

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, photoPopup, photoPopupImage, photoPopupCaption };
