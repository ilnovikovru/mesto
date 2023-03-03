import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const editFormElement = document.querySelector(".popup__form_edit");
const addFormElement = document.querySelector(".popup__form_add");
const photoPopup = document.querySelector(".popup_photo");
const photoPopupImage = photoPopup.querySelector('.popup__photo-image');
const photoPopupCaption = photoPopup.querySelector('.popup__photo-caption');
const elementsList = document.querySelector(".elements__list");

new FormValidator(formValidationConfig, editFormElement).enableValidation();
new FormValidator(formValidationConfig, addFormElement).enableValidation();

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

const renderInitialCard = (item) => {
  elementsList.append((new Card(item.name, item.link)).generateCard());
};

const addNewCard = (item) => {
  elementsList.prepend((new Card(item.name, item.link)).generateCard());
  closePopup(addNewPhotoPopup);
};

initialCards.forEach((element) => {
  renderInitialCard(element);
});

const newPhotoFormButton = document.querySelector(".popup__submit-button_add");

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
});

function formSubmitHandler(evt) {
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
editFormElement.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", () => {
  openPopup(addNewPhotoPopup);
  const isFormValid = addFormElement.checkValidity();
  newPhotoFormButton.disabled = !isFormValid;
  newPhotoFormButton.classList.toggle('popup__submit-button_inactive', !isFormValid);
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
