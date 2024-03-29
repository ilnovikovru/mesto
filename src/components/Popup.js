export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this._popupOverlay = document.querySelector(".popup__overlay");
    this._closePhotoButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this._popup);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close(this._popup);
      }
    })

    this._closePhotoButton.addEventListener("click", () => {
      this.close(this._popup);
    });
  }
}
