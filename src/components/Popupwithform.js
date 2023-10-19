import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {cbApi}) {
    super(popupSelector);
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._cbApi = cbApi;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
      console.log(input.value)
      console.log(this._formValues)
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._cbApi();
  }

  closePopup() {
    super.closePopup();
    this._popup.querySelector('.popup__form').reset();
   }

}