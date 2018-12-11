$(document).ready(function() {
  // Rangos para la funcion que genera el numero aleatorio. 
  var max = 9;
  var min = 0;

  var aleatorio = new Array; //Numero aleatorio de 4 digitos y sin digitos repetidos.
  const quantityDigits = 4; // Cantidad de digitos del numero aleatorio.

  // Genera un numero aleatorio entre el 0 y el 9.
  function getRandom(){
    let digito_aleatorio = Math.round((max - min) * Math.random()) + min;
    return digito_aleatorio;
  }

  // Generar el numero aleatorio de 4 digitos diferentes
  function getRandomNumber(){
    let randomNumber = new Array;
    let digit;
    let isDuplicate = false;

    let j = 0;
    while (j < quantityDigits){
      digit = getRandom();
      for (var i = 0; i < randomNumber.length; i++) {
        if (digit == randomNumber[i]) {
          isDuplicate = true;
        }
      }
      if (!isDuplicate) {
        randomNumber.push(digit);
        j++;
      }
      isDuplicate = false;
    }
    return randomNumber;
  }

  //Convierte el numero ingresado por el usuario en un arreglo de 4 posiciones.
  function becomeArray(number){

    let digits = new Array 

    let digito4 = Math.floor(number/1000);
    let modulo = number%1000;
    let digito3 = Math.floor(modulo/100);
    modulo = number%100;
    let digito2 = Math.floor(modulo/10);
    let digito1 = Math.floor(number%10);

    digits = [ digito4,
               digito3,
               digito2,
               digito1];

    return digits;
  }

  // Realiza la validacion de errores del numero ingresado por el usuario.
  function errorsValidation(number, number_array){
    let errors = { hasLessThanFourDigits: false, hasDuplicateDigits: false };

    //  Validad el numero ingresado tenga 4 digitos
    if (number.length < quantityDigits) { 
      errors.hasLessThanFourDigits = true; 
    } 

    // Validad el numero ingresado no tenga digitos duplicados.
    for (var j = (quantityDigits - 1); j >= (quantityDigits - number.length); j--) {
      for (var i = (quantityDigits - 1); i >= (quantityDigits - number.length); i--) {
        if((j != i) && (number_array[j] == number_array[i])){
          errors.hasDuplicateDigits = true;
        }
      }
    }
    return errors
  }

  //Programa principal. activado por evento cuano se presiona la tecla enter.
  $('#shoot').on('keyup', function(event){
    if (event.keyCode == 13){
      let number = $(this).val();
      let number_array = becomeArray(number);
      let errors = errorsValidation(number, number_array);
      console.log(errors);
    }
  });
  
  aleatorio = getRandomNumber();
  console.log(aleatorio.join(''));
})