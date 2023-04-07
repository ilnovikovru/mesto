export default class Card {
  constructor(name, link, template, handleCardClick, photoPopup, api) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._photoPopup = photoPopup;
    this._api = api;
  }

  // _saveItem = (text) => {
  //   this._api
  //   .addCard({ name: text })
  //   .then ((data) => this.addItem(data.name))
  //   .catch((err) => console.log(err))
  //   };

// там, где был метод add, станет _saveItem

  _getTemplate() {
    const cardElement = this._template.content.cloneNode(true);
    return cardElement;
  }

  _deleteCard(){
    // this._api.deleteCard(this._id)
    // .then(() => {
      // сюда переместить Remove
    // })
    // .catch((err) => console.log(err))
    this._element = this._deleteButton.closest(".elements__list-item");
    this._element.remove(); //
}

  _handleDeleteCard() {
    this._deleteButton = this._element.querySelector(".element__delete");
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard()
    });
  }

  _toggleLike(){
    this._likeButton.classList.toggle("element__like_active");
  }

  _handleLikeButton = () => {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });
  }

  _handleCardClickInner = () => {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  _setEventListeners() {
    this._handleDeleteCard();
    this._handleLikeButton();
    this._handleCardClickInner();
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
