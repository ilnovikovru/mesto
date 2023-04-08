export const initialCards = [
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

export const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input-text_type_error",
  errorClass: "popup__input-error",
};

export const editButton = document.querySelector(".profile__info-edit-button");
export const addButton = document.querySelector(".profile__info-add-button");
export const deleteButton = document.querySelector(".element__delete");
export const inputName = document.querySelector(".popup__input-text_type_name");
export const inputCaption = document.querySelector(".popup__input-text_type_caption");
export const editFormElement = document.forms["about"];
export const addFormElement = document.querySelector(".popup__form_add");
export const elementsList = document.querySelector(".elements__list");
export const cardTemplate = document.querySelector(".element-template");
export const editAvatarButton = document.querySelector(".profile__avatar");
export const editAvatarFormElement = document.forms["edit-avatar"];
