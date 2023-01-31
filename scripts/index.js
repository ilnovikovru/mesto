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

function openPopup(element) {
  element.classList.add("popup_opened");
}

function closePopup(element) {
  element.classList.remove("popup_opened");
}

//
const createCard = (element) => {
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;

  const deleteButton = cardElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', () => {
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
  const photoPopupElement = (element) => document.querySelector(`.popup_photo ${element}`);
  photoItem.forEach((img) => {
    img.addEventListener("click", (el) => {
    openPopup(photoPopup);
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
  elementsList.prepend(createCard(element));
  closePopup(addNewPhotoPopup);
};

initialCards.forEach((item) => {
  renderCards(item);
});

const newPhotoFormButton = document.querySelector(".popup__submit-button_add");

const inputPhotoName = document.querySelector(".popup__input-text_type_title");
const inputLink = document.querySelector(".popup__input-text_type_link");

newPhotoFormButton.addEventListener('click', () => {
  const name = inputPhotoName.value;
  const link = inputLink.value;
  element = {name, link};
  addNewCard(element);
});

// Меняет имя и подпись
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;
  closePopup(editPopup);
}

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
  element = editPopup;
  openPopup(element);
});
closeEditPopupButton.addEventListener("click", () => {
  element = editPopup;
  closePopup(element);
});
editFormElement.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", () => {
  element = addNewPhotoPopup;
  openPopup(element);
});
closeAddNewPhotoPopupButton.addEventListener("click", () => {
  element = addNewPhotoPopup;
  closePopup(element);
});

const closePhotoButton = document.querySelector('.popup__close-button_photo');

closePhotoButton.addEventListener("click", () => {
  element = photoPopup
  closePopup(element);
});
