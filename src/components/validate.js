//===========================================================================================
//Валидация инпутов, проверка на корректность ввода
//===========================================================================================
export { enableValidation, hidenInputError, findInput, toggleButtonState, isValid}

function enableValidation({ ...selectorList }) {                               //основаня функция проверки

  const getFormList = Array.from(document.querySelectorAll(selectorList.formSelector));//найдет все формы в доме, преобразуем в массив

  getFormList.forEach(function (formElement) {                               //обходим все формы из массива
    findInput(formElement, selectorList);                                    //функция поиска инпутов в форме
  });                                                                        //Передаем аргументы форму и список селекторов
}


//Ищет инпуты в форме, как аргумент принимает одну форму
//===========================================================================================
function findInput(form, selectorList) {
  const inputList = Array.from(form.querySelectorAll(selectorList.inputSelector));//ищем все инпуты в форме

  inputList.forEach(function (inputElement) {                                 //обойдет все инпуты из массива

      isValid(inputElement, selectorList);                                    //Проверяет введенные данные на валидность

      toggleButtonState(inputList, form, selectorList);                       //При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit

    });

  inputList.forEach(function (inputElement) {                                 //обойдет все инпуты из массива
    inputElement.addEventListener('input', function () {                      //Событие по вводу

      isValid(inputElement, selectorList);                                    //Проверяет введенные данные на валидность

      toggleButtonState(inputList, form, selectorList);                       //При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit

    });
  });
}


//Отвечает за проверку введенных данных и выдачу сообщенией об ошибках, принимает аргумент один инпут
//===========================================================================================
function isValid(inputElement, selectorList) {

  const fieldErrorMessange = inputElement                                       //Находит поле для вывода ошибки
    .closest(selectorList.formSelector)                                         //находит родителя инпута по классу
    .querySelector(`#${inputElement.id}-error`);                                //ищет в форме "поле для ошибки" по id используя шаблонные строки

  if (!inputElement.validity.valid) {                                           //если состонияние инпута.valid false тогда будет выдавать сообщение об ошибке из validationMessage

    if (inputElement.validity.patternMismatch) {                                //Если регулярные выражения не прошли провеку
      inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");//создадть кастомное сообащение об ошибке
      //inputElement.classList.add(selectorList.inputErrorClass);
    } else {
      inputElement.setCustomValidity("");                                       //убрать кастомное сообащение об ошибке
      //inputElement.classList.remove(selectorList.inputErrorClass);
    }

    showInputError(fieldErrorMessange, inputElement.validationMessage, selectorList);         //Показать ошибку, передаем функции аргументы поле для ошибки и ошибку текущего инпута
  } else {
    hidenInputError(fieldErrorMessange, selectorList);
  }
}

//Дейстиве с кнопкой SUBMIT если формы не валидны
//===========================================================================================
function toggleButtonState(inputList, formParent, selectorList) {

  const buttonElement = formParent.querySelector(selectorList.submitButtonSelector);//находим кнопку в форме

  if (hasInvalidInput(inputList)) {                                               //если финкция вернет true занчит в полях ввода есть ошибки нужно заблокировать кнопку
    buttonElement.disabled = true;
    buttonElement.classList.add(selectorList.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;                                               // иначе сделай кнопку активной
    buttonElement.classList.remove(selectorList.inactiveButtonClass);
  }
}


//Проверит инпуты в форме на валидность, функция принимает аргумент список инпутов ввиде массива
//===========================================================================================
function hasInvalidInput(inputList) {

  return inputList.some((elm) => {                                                 //если все инпунты валидны, вернется true

    return !elm.validity.valid;                                                    //возвращает свойство элемента valid

  });
}


//Показать сообщение об ошибке, принимает аргументы:
//Имя класса элемента спан, системную ошибку
//===========================================================================================
function showInputError(spanName, textErrorMessange, selectorList) {
  spanName.textContent = textErrorMessange;
  spanName.classList.add(selectorList.errorClass);
}


//Скрыть сообщение об ошибки
//===========================================================================================
function hidenInputError(spanName, selectorList) {
  spanName.textContent = '';
  spanName.classList.remove(selectorList.errorClass);
}