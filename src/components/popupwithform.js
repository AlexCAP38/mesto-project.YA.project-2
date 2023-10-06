import Popup from "./popup";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this._selectorPopup = selectorPopup;
    //this._cbApi = cbApi; , { cbApi }
  }

  _getInputValues() {
    this._inputList = document.querySelectorAll('.popup__input');

    this._formValues = {};


    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;


  }

  setEventListeners() {
super.setEventListeners();



  }

  closePopup() {

  }
}