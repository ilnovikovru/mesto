import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector(".popup__photo-image");
    this._cardImageCaption = this._popup.querySelector(".popup__photo-caption");
  }

  open(title, link) {
    super.open();
    this._cardImage.src = link;
    this._cardImage.alt = title;
    this._cardImageCaption.textContent = title;
  }
}
