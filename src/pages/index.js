import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"; // импортируем класс Апи
import { formValidationConfig, editButton, addButton, editAvatarButton, editAvatarFormElement,
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
  section.renderItems(cardData.reverse()); // вставляем данные с сервера в контейнер карточек
})
.catch((err) => {
  console.log(err); // если ошибка, выдаем ошибку
})

const profileValidator = new FormValidator(formValidationConfig, editFormElement);
profileValidator.enableValidation();

const cardFormValidator = new FormValidator(formValidationConfig, addFormElement);
cardFormValidator.enableValidation();

const profileAvatarFormValidator = new FormValidator(formValidationConfig, editAvatarFormElement);
profileAvatarFormValidator.enableValidation();

const photoPopup = new PopupWithImage('.popup_photo');
photoPopup.setEventListeners();

const handleOpenPhotoPopup = (name, link) => {
  photoPopup.open(name, link);
}

const handlePopupWithConfirmation = (card) => {
  popupWithConfirmation.setFormSubmitAction(() => {
    api.deleteCard(card._id)
      .then(() => {
        card.deleteCard();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const createCard = (item) => {
  const card = new Card(item.name,
    item.link,
    item.likes,
    item.owner._id,
    item._id,
    cardTemplate,
    handleOpenPhotoPopup,
    photoPopup,
    api,
    popupWithConfirmation, {
      handleLikeClick: () => {
        if(card.isCardLike()) {
          api.dislikeCard(card.getCardId())
          .then((data) => {
            card.setLikesCount(data.likes);
            card.deleteLike();
          })
          .catch((err) => {
            console.log(err);
          })
        } else {
          api.likeCard(card.getCardId())
          .then((data) => {
            card.setLikesCount(data.likes);
            card.setLike();
          })
          .catch((err) => {
            console.log(err);
          })
        };
      }
    }, handlePopupWithConfirmation);
  const cardElement = card.generateCard();
  return cardElement;
}

const renderInitialCard = (item) => {
  section.addItem(createCard(item));
};

const section = new Section(renderInitialCard, '.elements__list');

const addNewCard = (item) => {
  return api.addCard(item)
    .then((item) => {
      section.addItem(createCard(item));
    })
    .catch((err) => {
      console.log(err);
    })
};

const editPopup = new PopupWithForm('.popup_edit', handleProfileFormSubmit, '.popup__submit-button');

editPopup.setEventListeners();

const userInfo = new UserInfo({
  selectorOfNameElement: '.profile__info-title',
  selectorOfCaptionElement: '.profile__info-subtitle',
  selectorOfAvatarElement: '.profile__avatar'
});

function handleProfileFormSubmit({ name, about, avatar }) {
  editPopup.updateSubmitButton(true);
  api.editUserInfo({ name, about, avatar })
    .then(({ name, about, avatar }) => {
      userInfo.setUserInfo({ name, about, avatar });
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.updateSubmitButton(false);
    });
}

const addNewPhotoPopup = new PopupWithForm('.popup_add', handleAddPhotoFormSubmit, '.popup__submit-button_add');
addNewPhotoPopup.setEventListeners();

function handleAddPhotoFormSubmit({ name, link }) {
  const element = { name, link };
  addNewCard(element)
    .then(() => {
      addNewPhotoPopup.close();
      cardFormValidator.toggleButton();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addNewPhotoPopup.updateSubmitButton(false);
    });
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

const popupWithConfirmation = new PopupWithConfirmation('.popup_delete', handlePopupWithConfirmation);

popupWithConfirmation.setEventListeners();

function handleAvatarFormSubmit(data) {
  api.editAvatar(data)
  .then((data) => {
    editAvatarPopup.updateSubmitButton(true);
    userInfo.setUserInfo(data);
    editAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editAvatarPopup.updateSubmitButton(false);
  });
}

const editAvatarPopup = new PopupWithForm('.popup_edit-avatar', handleAvatarFormSubmit, '.popup__submit-button_edit-avatar');
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});
