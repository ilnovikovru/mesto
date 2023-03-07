import { openPopup, photoPopup, photoPopupImage, photoPopupCaption } from "./index.js";

class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
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
    this._likeButton = this._element.querySelector(".element__like");
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element__like_active");
    });
  }

  _handleCardClick = () => {
    this._cardImage.addEventListener("click", () => {
      openPopup(photoPopup);
      photoPopupImage.src = this._link;
      photoPopupCaption.textContent = this._name;
      photoPopupImage.alt = this._name;
    });
    console.log();
  }

  _setEventListeners() {
    this._handleDeleteCard();
    this._handleLikeButton();
    this._handleCardClick();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._element.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

}

export default Card;
