import Popup from "./Popup.js";
import { openPopup, photoPopup, photoPopupImage, photoPopupCaption } from "./index.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }
  open(name, link) {
    this._cardImage.addEventListener("click", () => {
      openPopup(photoPopup);
      photoPopupImage.src = link;
      photoPopupCaption.textContent = name;
      photoPopupImage.alt = link;
    });
  }

}
