export default class Card {
  constructor(name, link, likes, id, cardId, template, handleCardClick, photoPopup, api, popupWithButton) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userId = id;
    this._id = cardId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._photoPopup = photoPopup;
    this._api = api;
    this._popupWithButton = popupWithButton;
  }

  _getTemplate() {
    const cardElement = this._template.content.cloneNode(true);
    return cardElement;
  }

  _deleteCard(){
    this._api.deleteCard(this._id)
    .then(() => {
      this._element = this._deleteButton.closest(".elements__list-item");
      this._element.remove();
    })
    .catch((err) => console.log(err))
}

  _handleDeleteCard() {
    this._deleteButton.addEventListener("click", () => {
      this._popupWithButton.open(this._id);
      this._popupWithButton.setFormSubmitAction(this._deleteCard.bind(this));
    });
  }

  _toggleLike(){
    this._likeButton.classList.toggle("element__like_active");
  }


  _handleLikeButton = () => {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();

      if(this.isCardLike()) {
        this._api.dislikeCard(this._id)
        .then((data) => {
          this.setLikesCount(data.likes);
          this.deleteLike();
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        this._api.likeCard(this._id)
        .then((data) => {
          this.setLikesCount(data.likes);
          this.setLike();
        })
        .catch((err) => {
          console.log(err);
        })
      };

    });
  }

  setLikesCount(likes) {
    this._likes = likes;
    this._likeCount.textContent = likes.length;
  }

  _handleCardClickInner = () => {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

  }

  _checkId() {
    if(this._userId !== this._ownerID) {
      this._deleteButton.remove();
    }
  }

  _setEventListeners() {
    this._handleDeleteCard();
    this._handleLikeButton();
    this._handleCardClickInner();
    this._checkId();
  }

  isCardLike() {
    return this._likes.some((like) => like._id === this._ownerID);
  }

  setLike() {
    this._likeButton.classList.add('element__like_active');
  }

  deleteLike() {
    this._likeButton.classList.remove('element__like_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__image");
    this._likeCount = this._element.querySelector(".element__like-count");

    this._photoPopupSelector = document.querySelector(".popup_photo");
    this._photoPopupImage = this._photoPopupSelector.querySelector('.popup__photo-image');
    this._photoPopupCaption = this._photoPopupSelector.querySelector('.popup__photo-caption');

    this._element.querySelector(".element__like-count").textContent = this._likes.length;
    this._element.querySelector(".element__title").textContent = this._name;

    this._ownerID = "295c5e30eef3ea3937a5c213";
    this._deleteButton = this._element.querySelector(".element__delete");

    if(this.isCardLike()) {
      this.setLike();
    } else {
      this.deleteLike();
    };

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

}
