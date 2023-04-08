export default class UserInfo {
  constructor({ selectorOfNameElement, selectorOfCaptionElement, selectorOfAvatarElement }) {
    this._userName = document.querySelector(selectorOfNameElement);
    this._userCaption = document.querySelector(selectorOfCaptionElement);
    this._userAvatar = document.querySelector(selectorOfAvatarElement);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userCaption.textContent,
      avatar: this._userAvatar.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userCaption.textContent = about;
    this._userAvatar.src = avatar
  }

}
