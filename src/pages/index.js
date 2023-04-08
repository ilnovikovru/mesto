import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithButton from "../components/PopupWithButton.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"; // импортируем класс Апи
import { formValidationConfig, editButton, addButton, editAvatarButton,
  inputName, inputCaption, editFormElement, addFormElement, cardTemplate } from "../utils/constants.js";
import '../pages/index.css';

const api = new Api({ // записываем экзепляр класса, передаем ему адрес сервера и как брать данные
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    'content-type': 'application/json',
    authorization: 'e70c5caa-7ab0-4df0-ba41-176f0bfef9df'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()]) // вызываем функции запроса данных пользователя и карточек
.then(data => {
  const userData = data[0];
  const cardData = data[1];
  userInfo.setUserInfo(userData); // вставляем данные с сервера в профиль
  section.renderItems(cardData); // вставляем данные с сервера в контейнер карточек
})
.catch((err) => {
  console.log(err); // если ошибка, выдаем ошибку
})

const profileValidator = new FormValidator(formValidationConfig, editFormElement);
profileValidator.enableValidation();

const cardFormValidator = new FormValidator(formValidationConfig, addFormElement);
cardFormValidator.enableValidation();

const photoPopup = new PopupWithImage('.popup_photo');
photoPopup.setEventListeners();

const handleOpenPhotoPopup = (name, link) => {
  photoPopup.open(name, link);
}

const createCard = (item) => {
  const cardElement = new Card(item.name,
    item.link,
    item.likes,
    item.owner._id,
    item._id,
    cardTemplate,
    handleOpenPhotoPopup,
    photoPopup,
    api,
    popupWithButton).
    generateCard();
  return cardElement;
}

const renderInitialCard = (item) => { // и это тоже
  section.addItem(createCard(item));
};

const section = new Section(renderInitialCard, '.elements__list');

const addNewCard = ({ name, link }) => {
  api.addCard({ name, link })
  .then(({ name, link }) => {
    section.addItem(createCard({ name, link }));
  })
  .catch((err) => {
    console.log(err);
  })

  addNewPhotoPopup.close();
};

const editPopup = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
editPopup.setEventListeners();

const userInfo = new UserInfo({
  selectorOfNameElement: '.profile__info-title',
  selectorOfCaptionElement: '.profile__info-subtitle',
  selectorOfAvatarElement: '.profile__avatar'
});

function handleProfileFormSubmit({ name, about, avatar }) {
  api.editUserInfo({ name, about, avatar })
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo({ name, about, avatar });
  })
  .catch((err) => {
    console.log(err);
  })
}

const addNewPhotoPopup = new PopupWithForm('.popup_add', handleAddPhotoFormSubmit);
addNewPhotoPopup.setEventListeners();

function handleAddPhotoFormSubmit({ name, link }) {
  console.log({ name, link });
  const element = { name, link };
  addNewCard(element);
  cardFormValidator.toggleButton();
}

editButton.addEventListener("click", () => {
  const infoObject = userInfo.getUserInfo();
  inputName.value = infoObject.name;
  inputCaption.value = infoObject.about;
  editPopup.open();
});

addButton.addEventListener("click", () => {
  addNewPhotoPopup.open();
});

const handlePopupWithButton = (cardId) => {
  api.deleteCard(cardId)
  .then(() => {
    popupWithButton.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

const popupWithButton = new PopupWithButton('.popup_delete', handlePopupWithButton);

popupWithButton.setEventListeners();

function handleAvatarFormSubmit({ data }) {
  api.editAvatar({ data })
  .then(({ data }) => {
    userInfo.setUserInfo({ data });
  })
  .catch((err) => {
    console.log(err);
  })
}

const editAvatarPopup = new PopupWithForm('.popup_edit-avatar', handleAvatarFormSubmit);
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});
