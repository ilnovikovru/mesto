import Popup from "./Popup.js";

class Card {
  constructor(name, link, template) { // принимал в конструктор функцию handleCardClick.
    // Эта функция должна открывать попап с картинкой при клике на карточку.
    this._name = name;
    this._link = link;
    this._template = template;
    this._photoPopup = new Popup('.popup_photo');
  }

  _getTemplate() {
    const cardElement = this._template.content.cloneNode(true);
    return cardElement;
  }

  _handleDeleteCard() {
    this._deleteButton = this._element.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", () => {
      this._element = this._deleteButton.closest(".elements__list-item");
      this._element.remove();
    });
  }

  _handleLikeButton = () => {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element__like_active");
    });
  }

  _handleCardClick = () => {
    this._cardImage.addEventListener("click", () => {
      this._photoPopup.open();
      this._photoPopupImage.src = this._link;
      this._photoPopupCaption.textContent = this._name;
      this._photoPopupImage.alt = this._name;
    });
  }

  _setEventListeners() {
    this._handleDeleteCard();
    this._handleLikeButton();
    this._handleCardClick();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__image");

    this._photoPopupSelector = document.querySelector(".popup_photo");
    this._photoPopupImage = this._photoPopupSelector.querySelector('.popup__photo-image');
    this._photoPopupCaption = this._photoPopupSelector.querySelector('.popup__photo-caption');

    this._element.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

}

export default Card;
