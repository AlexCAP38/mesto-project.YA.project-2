export default class FormValidator {
  constructor({ ...selectorList }) {
    this._selectorList = selectorList;
  }

  enableValidation(formElement) {                                                         //основаня функция проверки

    this._formElement = document.querySelector(formElement);                                                      //полученная форма
    //this._formElement = formElement;                                                      //полученная форма
    this._setEventListeners(formElement);                                                 //функция поиска инпутов в форме

  }

  _setEventListeners() {                                                                  //Ищет инпуты в форме, как аргумент принимает одну форму
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorList.inputSelector));//ищем все инпуты в форме
    this._buttonElement = this._formElement.querySelector(this._selectorList.submitButtonSelector);    //находим кнопку в форме

    this._inputList.forEach((element) => {                                                //обойдет все инпуты из массива

      element.addEventListener('input', () => {                                           //Событие по вводу
        this.isValid(element, this._selectorList);                                        //Проверяет введенные данные на валидность
        this._toggleButtonState(this._selectorList);                                      //При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit
      });

    });
  }

                                                                                  //Отвечает за проверку введенных данных и выдачу сообщенией об ошибках, принимает аргумент один инпут
  isValid(inputElement, selectorList) {                                           //принемаем один инпут, и объект из селекторов

    this._fieldErrorMessange = inputElement                                       //Находит поле для вывода ошибки
      .closest(selectorList.formSelector)                                         //находит родителя инпута по классу
      .querySelector(`#${inputElement.id}-error`);                                //ищет в форме "поле для ошибки" по id используя шаблонные строки

    if (!inputElement.validity.valid) {                                           //если состонияние инпута.valid false тогда будет выдавать сообщение об ошибке из validationMessage

      if (inputElement.validity.patternMismatch) {                                //Если регулярные выражения  возвращают true, не прошли провеку
        inputElement.setCustomValidity(inputElement.getAttribute('data-error'));  //создадть кастомное сообащение об ошибке
      } else {
        inputElement.setCustomValidity("");                                       //убрать кастомное сообащение об ошибке
      }

      this._showInputError(inputElement, selectorList);                           //Показать ошибку, передаем функции аргументы поле для ошибки и ошибку текущего инпута
    } else {
      this._hidenInputError(inputElement, selectorList);
    }
  }

  _toggleButtonState(selectorList) {                                             //Дейстиве с кнопкой SUBMIT если формы не валидны
    if (this._hasInvalidInput()) {                                               //если финкция вернет true занчит в полях ввода есть ошибки нужно заблокировать кнопку
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(selectorList.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;                                                     // иначе сделай кнопку активной
      this._buttonElement.classList.remove(selectorList.inactiveButtonClass);
    }

  }

  _hasInvalidInput() {                                                                     //Проверит инпуты в форме на валидность, функция принимает аргумент список инпутов ввиде массива

    return this._inputList.some((elm) => {                                                 //если все инпунты валидны, вернется true

      return !elm.validity.valid;                                                         //возвращает свойство элемента valid

    });
  }

    _showInputError(inputElement, selectorList) {                                                                 //Показать сообщение об ошибке
    this._fieldErrorMessange.textContent = inputElement.validationMessage;
    inputElement.classList.add(selectorList.inputErrorClass);
    this._fieldErrorMessange.classList.add(selectorList.errorClass);
  }

    _hidenInputError(inputElement, selectorList) {                                                                  //Скрыть сообщение об ошибки
    this._fieldErrorMessange.textContent = '';
    this._fieldErrorMessange.classList.remove(selectorList.errorClass);
    inputElement.classList.remove(selectorList.inputErrorClass);
  }
}