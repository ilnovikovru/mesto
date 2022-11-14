// Открытие и закрытие попапа

let editButton = document.querySelector('.profile__info-edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
function openPopup() {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);


// Копирование имени и должности со страницы в поля формы

let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');
let inputName = document.querySelector('.popup__input__text_type_name');
let inputCaption = document.querySelector('.popup__input__text_type_caption');

inputName.value = profileTitle.innerText
inputCaption.value = profileSubtitle.innerText


// Редактирование имени и информации о себе

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input__text_type_name');
let jobInput = formElement.querySelector('.popup__input__text_type_caption');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Выбераем элементы, куда должны быть вставлены значения полей
    let profileTitle = document.querySelector('.profile__info-title');
    let profileSubtitle = document.querySelector('.profile__info-subtitle');

    // Вставляем новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Закрытие попапа по кнопке
formElement.addEventListener('submit', closePopup);
