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
  
  aleatorio = getRandomNumber();
  console.log(aleatorio.join(''));
})