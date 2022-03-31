//alert("probando!");

//de momento solo tendra un ingreso de valor y se calculará el monto a abonar por pacientes.

let resultado = 0;
let valorPractica;
let coseguro;
let cantidadPractica = parseInt(prompt("Ingrese la cantidad de prácticas a calcular"));
let parcial = valorPractica;

//agregar resta de coseguros
function restaCoseguro() {
    coseguro = parseInt(prompt("Ingrese el valor de coseguro correspondiente"));
    console.log(`Usuario restará ${coseguro} como coseguro.`);
    parcial = valorPractica - coseguro;
    return parcial;
}


// agregar filtro de valores positivos
while (isNaN(cantidadPractica)) {
    cantidadPractica = parseInt(prompt("Ingrese la cantidad de prácticas a calcular"));
}
while (cantidadPractica <= 1) {
    cantidadPractica = parseInt(prompt("Ingrese la cantidad de prácticas a calcular"));
}


if (cantidadPractica > 0){
    for (let i = 1; i <= cantidadPractica; i++) {
        valorPractica = parseFloat(prompt(`Ingrese el valor de la práctica ${i}`));
        console.log(`Usuario agregará ${valorPractica} correspondiente a la práctica ${i}.`);
        
        restaCoseguro();
        resultado = resultado + parcial;
    }
} 
// else {
//     alert("Por favor ingrese una cantidad de practicas mayor o igual a 1")
// }



console.log(`El valor a abonar por el paciente es ${resultado}.`);



