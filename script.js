postnummer = document.getElementById("postnummer");
generateButton = document.getElementById("convert");
newCodeSpan = document.getElementById("newCode");
generateButton.addEventListener("click", generateNewCode);

/*
Die eigegebene, vorhandene 7 bis 9-stellige Zahl wir mit "631" multipliziert. Daraus sollte eine 10 bis 12-stellige Zahln entstehen, über die mit dem "Luhn-Algorithmus" eine Prüfziffer erstellt und angehängt wird. Vorangestellt wird dann die Zahl 3, gefolgt von so vielen Nullen, dass man auf 16 Stellen insgesamt kommt. Diese Rechenoperationen sind nicht geheim und können von einem Grundschüler auf einem Blatt Papier durchgeführt werden.

Kurz:
“3”+”[so viele ‘0’, dass die Zahl insgesamt 16 Stellen hat]”+”[alte Nummer*631]”+”[Prüfziffer nach Luhn über 'alte Nummer*631’]” , ergibt eine 16 stellige Zahl.
 */
function generateNewCode() {
  let newBase = postnummer.value * 631
  let payload = "" + newBase + luhn_calculate(newBase.toString())

  while (payload.length < 15) payload = "0" + payload ;

  let newCode = "3" + payload
  generateBarCode(newCode)
}

/* luhn_checksum
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit.
 */
function luhn_checksum(code) {
  let len = code.length
  let parity = len % 2
  let sum = 0
  for (let i = len-1; i >= 0; i--) {
      let d = parseInt(code.charAt(i))
      if (i % 2 == parity) { d *= 2 }
      if (d > 9) { d -= 9 }
      sum += d
  }
  return sum % 10
}

/* luhn_caclulate
* Return a full code (including check digit), from the specified partial code (without check digit).
*/
function luhn_calculate(partcode) {
  let checksum = luhn_checksum(partcode + "0")
  return checksum == 0 ? 0 : 10 - checksum
}

/* luhn_validate
 * Return true if specified code (with check digit) is valid.
 */
function luhn_validate(fullcode) {
  return luhn_checksum(fullcode) == 0
}

function generateBarCode(number) {
  JsBarcode("#barcode", number, {format: "ITF", displayValue:false, width:2, height:100});

  let dataURL = document.getElementById('barcode').toDataURL();
  document.getElementById('image').src = dataURL;
  document.getElementById('imageLink').href= dataURL;  
  document.getElementById('imageLink').download = "goldcard_barcode_itf_" + number +	".png" ;
  newCodeSpan.innerHTML = number
}

