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
const popup = document.querySelector(".popup");
const photoPopupImage = photoPopup.querySelector('.popup__photo-image');
const photoPopupCaption = photoPopup.querySelector('.popup__photo-caption');
const elementsList = document.querySelector(".elements__list");
const elementsTemplate = document.querySelector(".element-template").content;

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

const createCard = (element) => {
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector(".element__title").textContent = element.name;
  cardElement.querySelector(".element__image").src = element.link;
  cardElement.querySelector(".element__image").alt = element.name;

  const deleteButton = cardElement.querySelector(".element__delete");
  deleteButton.addEventListener("click", () => {
    const element = deleteButton.closest(".elements__list-item");
    element.remove();
  });

  const likeButton = cardElement.querySelectorAll(".element__like");
  likeButton.forEach(function (el) {
    el.addEventListener("click", function () {
      el.classList.toggle("element__like_active");
    });
  });

  const photoItem = Array.from(cardElement.querySelectorAll(".element__image"));
  photoItem.forEach(function (item) {
    item.addEventListener("click", () => {
      openPopup(photoPopup);
      photoPopupImage.src = item.src;
      photoPopupCaption.textContent = item.alt;
      photoPopupImage.alt = item.alt;
    });
  });

  return cardElement;
};

const renderInitialCard = (element) => {
  elementsList.append(createCard(element));
};

const addNewCard = (element) => {
  elementsList.prepend(createCard(element));
  closePopup(addNewPhotoPopup);
};

initialCards.forEach((item) => {
  renderInitialCard(item);
});

const newPhotoFormButton = document.querySelector(".popup__submit-button_add");
const newPhotoForm = document.querySelector(".popup__form_add");

const inputPhotoName = document.querySelector(".popup__input-text_type_title");
const inputLink = document.querySelector(".popup__input-text_type_link");

newPhotoForm.addEventListener("submit", () => {
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
