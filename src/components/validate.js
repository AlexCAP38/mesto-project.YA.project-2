//===========================================================================================
//Валидация инпутов, проверка на корректность ввода
//===========================================================================================

export default class FormValidator {
  constructor({ ...selectorList }) {
    this._selectorList = selectorList;
  }

  //===========================================================================================
  //основаня функция проверки
  enableValidation() {
    const getFormList = Array.from(document.querySelectorAll(this._selectorList.formSelector));//найдет все формы в доме, преобразуем в массив

    getFormList.forEach((formElement) => {                                   //обходим все формы из массива
      this._findInput(formElement);                                           //функция поиска инпутов в форме
    });                                                                      //Передаем аргументы форму и список селекторов
  }

  //===========================================================================================
  //Ищет инпуты в форме, как аргумент принимает одну форму
  _findInput(form) {
    const inputList = Array.from(form.querySelectorAll(this._selectorList.inputSelector));//ищем все инпуты в форме
    const buttonElement = form.querySelector(this._selectorList.submitButtonSelector);    //находим кнопку в форме

    inputList.forEach((inputElement) => {                                     //обойдет все инпуты из массива

      inputElement.addEventListener('input', () => {                          //Событие по вводу
        this.isValid(inputElement, this._selectorList);                            //Проверяет введенные данные на валидность
        this._toggleButtonState(inputList, buttonElement, this._selectorList);      //При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit
      });
    });
  }

  //===========================================================================================
  //Отвечает за проверку введенных данных и выдачу сообщенией об ошибках, принимает аргумент один инпут
  isValid(inputElement, selectorList) {                                           //принемаем один инпут, и объект из селекторов

    const fieldErrorMessange = inputElement                                       //Находит поле для вывода ошибки
      .closest(selectorList.formSelector)                                         //находит родителя инпута по классу
      .querySelector(`#${inputElement.id}-error`);                                //ищет в форме "поле для ошибки" по id используя шаблонные строки

    if (!inputElement.validity.valid) {                                           //если состонияние инпута.valid false тогда будет выдавать сообщение об ошибке из validationMessage

      if (inputElement.validity.patternMismatch) {                                //Если регулярные выражения  возвращают true, не прошли провеку
        inputElement.setCustomValidity(inputElement.getAttribute('data-error'));  //создадть кастомное сообащение об ошибке
      } else {
        inputElement.setCustomValidity("");                                       //убрать кастомное сообащение об ошибке
      }

      this._showInputError(fieldErrorMessange, inputElement, selectorList);        //Показать ошибку, передаем функции аргументы поле для ошибки и ошибку текущего инпута
    } else {
      this._hidenInputError(fieldErrorMessange, inputElement, selectorList);
    }
  }

  //===========================================================================================
  //Дейстиве с кнопкой SUBMIT если формы не валидны
  _toggleButtonState(inputList, buttonElement, selectorList) {                            //Принимает на вход список инпутов, форму где искать кнопку, объект из селекторов
    if (this._hasInvalidInput(inputList)) {                                               //если финкция вернет true занчит в полях ввода есть ошибки нужно заблокировать кнопку
      buttonElement.disabled = true;
      buttonElement.classList.add(selectorList.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;                                                     // иначе сделай кнопку активной
      buttonElement.classList.remove(selectorList.inactiveButtonClass);
    }

  }

  //===========================================================================================
  //Проверит инпуты в форме на валидность, функция принимает аргумент список инпутов ввиде массива
  _hasInvalidInput(inputList) {

    return inputList.some((elm) => {                                                 //если все инпунты валидны, вернется true

      return !elm.validity.valid;                                                    //возвращает свойство элемента valid

    });
  }

  //===========================================================================================
  //Показать сообщение об ошибке, принимает аргументы:
  //Имя класса элемента спан, системную ошибку
  _showInputError(spanName, inputElement, selectorList) {
    spanName.textContent = inputElement.validationMessage;
    inputElement.classList.add(selectorList.inputErrorClass);
    spanName.classList.add(selectorList.errorClass);
  }

  //===========================================================================================
  //Скрыть сообщение об ошибки
  _hidenInputError(spanName, inputElement, selectorList) {
    spanName.textContent = '';
    spanName.classList.remove(selectorList.errorClass);
    inputElement.classList.remove(selectorList.inputErrorClass);
  }
}