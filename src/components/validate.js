//===========================================================================================
//Валидация инпутов, проверка на корректность ввода
//===========================================================================================
export { enableValidation, hidenInputError , findInput}

function enableValidation() {                                                //основаня функция проверки
  const findAllForm = Array.from(document.querySelectorAll('.popup__form')); //найдет все формы в доме, преобразуем в массив
  findAllForm.forEach(function (formElement) {                               //обходим все формы из массива
    findInput(formElement);                                                  //Функция поиска инпутов в форме
  });
}


//Ищет инпуты в форме, как аргумент принимает одну форму
//===========================================================================================
function findInput(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));       //ищем все инпуты в форме
  toggleButtonState(inputList, form);                                         //Проверит при рендере страницы все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit

  inputList.forEach(function (inputElement) {                                 //обойдет все инпуты из массива
    inputElement.addEventListener('input', function () {                      //добавит инпуту событие по вводу

      isValid(inputElement);                                                  //Проверяет введенные данные на валидность

      toggleButtonState(inputList, form);                                     //При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit

    });
  });
}


//Отвечает за проверку введенных данных и выдачу сообщенией об ошибках, принимает аргумент один инпут
//===========================================================================================
function isValid(inputElement) {
  const fieldErrorMessange = inputElement.closest('.popup__form').querySelector(`#${inputElement.id}-error`);//Находит поле для вывода ошибки находит родителя инпута по классу, ищет в форме "поле для ошибки" по id используя шаблонные строки

  if (!inputElement.validity.valid) {                                           //если состонияние инпута.valid false тогда будет выдавать сообщение об ошибке из validationMessage

    if (inputElement.validity.patternMismatch) {                                //Если регулярные выражения не прошли провеку
      inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");//создадть кастомное сообащение об ошибке
    } else {
      inputElement.setCustomValidity("");                                       //убрать кастомное сообащение об ошибке
    }

    showInputError(fieldErrorMessange, inputElement.validationMessage);         //Показать ошибку, передаем функции аргументы поле для ошибки и ошибку текущего инпута
  } else {
    hidenInputError(fieldErrorMessange);
  }
}

//Дейстиве с кнопкой SUBMIT если формы не валидны
//===========================================================================================
function toggleButtonState(inputList, formParent) {

  const buttonElement = formParent.querySelector('.popup__button');               //находим кнопку в форме

  if (hasInvalidInput(inputList)) {                                               //если финкция вернет true занчит в полях ввода есть ошибки нужно заблокировать кнопку
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_active');
  } else {
    buttonElement.disabled = false;                                               // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button_active');
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
function showInputError(spanName, textErrorMessange) {
  spanName.textContent = textErrorMessange;
  spanName.classList.add('popup__errorMessange_active');
}


//Скрыть сообщение об ошибки
//===========================================================================================
function hidenInputError(spanName) {
  spanName.textContent = '';
  spanName.classList.remove('popup__errorMessange_active');
}