let editButton = document.querySelector('.profile__info-edit-button');
let addButton = document.querySelector('.profile__info-add-button');
let closeEditPopupButton = document.querySelector('.popup__close-button');
let closeAddNewPhotoPopupButton = document.querySelector('.new__close-button');
let popup = document.querySelector('.popup');
let addNewPhoto = document.querySelector('.new');
let profileName = document.querySelector('.profile__info-title');
let profileCaption = document.querySelector('.profile__info-subtitle');
let inputName = document.querySelector('.popup__input-text_type_name');
let inputCaption = document.querySelector('.popup__input-text_type_caption');
let inputTitle = document.querySelector('.new__input-text_type_name');
let inputLink = document.querySelector('.new__input-text_type_caption');
let elementTitle = document.querySelector('.element__title');
let elementLink = document.querySelector('.element__image');
let formElement = document.querySelector('.popup__form');

const elementsList = document.querySelector('.elements__list');
const elementsTemplate = document.querySelector('.element-template').content;

// массив с местами и фото
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

// функция выводит фотки из массива
initialCards.forEach(function (element) {
  const cardsElement = elementsTemplate.cloneNode(true);

  cardsElement.querySelector('.element__title').textContent = element.name;
  cardsElement.querySelector('.element__image').src = element.link;

  elementsList.append(cardsElement)
})

// Открывает попап редактирования профиля
function openPopup() {
  inputName.value = profileName.textContent
  inputCaption.value = profileCaption.textContent
  popup.classList.add('popup_opened');
}

// Закрывает попап редактирования профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Меняет имя и подпись
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileCaption.textContent = inputCaption.value;
    closePopup();
}

// Открывает попап добавления фото
function openNew() {
  addNewPhoto.classList.add('new_opened');
}

// Закрывает попап добавления фото
function closeNew() {
  addNewPhoto.classList.remove('new_opened');
}

// Добавляет карточку с местом и фото
//function addPlace(titleValue, linkValue) {
//  cardsElement.querySelector('.element__title').textContent = titleValue;
// cardsElement.querySelector('.element__image').src = linkValue;

//  const artistElement = document.createElement('h4');

//  elementsList.prepend(cardsElement)

//  closeNew();
//}

//function newFormSubmitHandler (nevt) {
//  nevt.preventDefault();
//  elementTitle.textContent = inputTitle.value;
//  elementLink.src = inputLink.value;
//}

editButton.addEventListener('click', openPopup);
closeEditPopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openNew);
closeAddNewPhotoPopupButton.addEventListener('click', closeNew);
// formElement.addEventListener('submit', addPlace);
