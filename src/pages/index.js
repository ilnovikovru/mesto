import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formValidationConfig, editButton, addButton,
  inputName, inputCaption, editFormElement, addFormElement, elementsList, cardTemplate } from "../utils/constants.js";
import '../pages/index.css';

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
  const cardElement = new Card(item.title, item.link, cardTemplate, handleOpenPhotoPopup, photoPopup).generateCard();
  return cardElement;
}

const renderInitialCard = (item) => {
  section.addItem(createCard(item));
};

const section = new Section(renderInitialCard, '.elements__list');
section.renderItems(initialCards);

const addNewCard = (item) => {
  section.addItem(createCard(item));
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
  cardFormValidator.toggleButton();
}

editButton.addEventListener("click", () => {
  const infoObject = userInfo.getUserInfo();
  inputName.value = infoObject.name;
  inputCaption.value = infoObject.caption;
  editPopup.open();
});

addButton.addEventListener("click", () => {
  addNewPhotoPopup.open();
});
