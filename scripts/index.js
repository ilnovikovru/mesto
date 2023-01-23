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
  cardsElement.querySelector('.element__image').alt = element.name;

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

editButton.addEventListener('click', openPopup);
closeEditPopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openNew);
closeAddNewPhotoPopupButton.addEventListener('click', closeNew);

// Добавляет карточку с местом и фото

let container = document.querySelector('.main'); // вводим переменную для <main>
let elementContainer = container.querySelector('.elements__list'); // вводим переменную для списка карточек
let newPhotoFormButton = document.querySelector('.new__submit-button'); // вводим переменную для формы

function addPhoto() {
  let inputTitle = document.querySelector('.new__input-text_type_name'); // вводим переменную для поля Название
  let inputLink = document.querySelector('.new__input-text_type_caption'); // вводим переменную для поля Ссылка

  elementContainer.insertAdjacentHTML('afterbegin', `
  <li class="elements__list-item">
  <article class="element">
    <button type="button" value="Удалить" class="element__delete" aria-label="Удалить"></button>
    <img src="${inputLink.value}" alt="" class="element__image">
    <div class="element__name">
      <h2 class="element__title">
      ${inputTitle.value}
      </h2>
      <button type="button" value="Нравится" class="element__like" aria-label="Нравится"></button>
    </div>
  </article>
</li>
  `); // вставляем блок с переменными в начало списка карточек
  closeNew();
}

newPhotoFormButton.addEventListener('click', addPhoto); // вызываем функцию по отправке формы


// Позволяет лайкать карточку

const likeButton = document.querySelectorAll('.element__like');

likeButton.forEach(function (el) {
  el.addEventListener('click', function () {
  el.classList.toggle('element__like_active');
  });
});

// Удаляет карточку по клику на урну

const deleteButton = document.querySelectorAll('.element__delete'); // получить все элементы по этому селектору

deleteButton.forEach(function (el) { // потом пройтись по этому массиву циклом
  el.addEventListener('click', function () { // каждому элементу добавить обработчик
  const element = document.querySelector('.element__delete').closest('.elements__list-item');
  element.remove();
  });
});

// Открывает попап c большим фото
let photo = document.querySelector('.photo');
let photoItem = document.querySelectorAll('.element__image');
const photoPopupElement = element =>
  document.querySelector(`.photo ${element}`);
const modalPopup = document.querySelector('.photo');

photoItem.forEach(img => {
  img.addEventListener('click', el => {
    photo.classList.add('photo_opened');
    photoPopupElement('img').src = img.src;
    photoPopupElement('p').textContent = img.alt;
  });
});

// Закрывает попап добавления фото
function closePhoto() {
  photo.classList.remove('photo_opened');
}

let closePhotoButton = document.querySelector('.photo__close-button');

closePhotoButton.addEventListener('click', closePhoto);
