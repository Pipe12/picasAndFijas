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

  // Muestra los errores que presenta el numero ingresado.
  function showErrors(errors){

    if (errors.hasDuplicateDigits || errors.hasLessThanFourDigits) {
      let element = document.getElementById('fourDigits');
      $(element).addClass('error');
      element= document.getElementById('shoot');
      $(element).addClass('error');
    } else {
      let element = document.getElementById('fourDigits');
      $(element).removeClass('error');
      element= document.getElementById('shoot');
      $(element).removeClass('error');
    }
    return (errors.hasDuplicateDigits || errors.hasLessThanFourDigits);
  }

  function getPlay(play, aleatorio, number_array){
    if (play) {
      return picasAndFijas(aleatorio, number_array);
    }
  }

  //Determina cuantas picas y fijas se tiene.
  function picasAndFijas(aleatorio_array, number_array){

    let results = { cantidad_picas: 0, cantidad_fijas: 0 }
    let comparacion_valores;
    let comparacion_index;

    // Determina cuantas picas y fijas tiene el numero ingresado.
    for (var j = 0; j < aleatorio_array.length; j++) {
      for (var i = 0; i < aleatorio_array.length; i++) {
        comparacion_valores = (number_array[j] == aleatorio_array[i]);
        comparacion_index = (i == j);
        if (comparacion_valores && comparacion_index) {
          results.cantidad_fijas++;
        } else if (comparacion_valores) {
          results.cantidad_picas++;
        }
      }
    }

    //Muestros los resultados del juego
    if (results.cantidad_fijas == 4) {
      console.log('Muestro el modal');
    }else {
      console.log('Imprimo en la tabla');
    }
    $('#shoot').val('');
    return results;
  }

  //Programa principal. activado por evento cuano se presiona la tecla enter.
  $('#shoot').on('keyup', function(event){
    if (event.keyCode == 13){
      let number = $(this).val();
      let number_array = becomeArray(number);
      let errors = errorsValidation(number, number_array);
      let play = !showErrors(errors);
      let results = getPlay(play, aleatorio, number_array);
      console.log(results);
    }
  });
  
  aleatorio = getRandomNumber();
  console.log(aleatorio.join(''));
})