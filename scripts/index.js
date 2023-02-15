const editButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__info-add-button");
const closeEditPopupButton = document.querySelector(".popup__close-button");
const closeAddNewPhotoPopupButton = document.querySelector(
  ".popup__close-button_add"
);
const editPopup = document.querySelector(".popup_edit");
const addNewPhotoPopup = document.querySelector(".popup_add");
const profileName = document.querySelector(".profile__info-title");
const profileCaption = document.querySelector(".profile__info-subtitle");
const inputName = document.querySelector(".popup__input-text_type_name");
const inputCaption = document.querySelector(".popup__input-text_type_caption");
const editFormElement = document.querySelector(".popup__form_edit");
const photoPopup = document.querySelector(".popup_photo");
const popup = document.querySelector(".popup");

const elementsList = document.querySelector(".elements__list");
const elementsTemplate = document.querySelector(".element-template").content;

function openPopup(element) {
  element.classList.add("popup_opened");
}

function closePopup(element) {
  element.classList.remove("popup_opened");
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

  const photoItem = cardElement.querySelectorAll(".element__image");
  const photoPopupElement = (element) =>
    document.querySelector(`.popup_photo ${element}`);
  photoItem.forEach((img) => {
    img.addEventListener("click", (el) => {
      openPopup(photoPopup);
      photoPopupElement("img").src = img.src;
      photoPopupElement("p").textContent = img.alt;
      photoPopupElement("img").alt = img.alt;
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

const inputPhotoName = document.querySelector(".popup__input-text_type_title");
const inputLink = document.querySelector(".popup__input-text_type_link");

newPhotoFormButton.addEventListener("click", () => {
  const name = inputPhotoName.value;
  const link = inputLink.value;
  const element = { name, link };
  addNewCard(element);
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

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    closePopup(editPopup);
    closePopup(addNewPhotoPopup);
    closePopup(photoPopup);
  }
});
