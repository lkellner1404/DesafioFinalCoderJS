//alert("probando!");

//de momento solo tendra un ingreso de valor y se calculará el monto a abonar por los pacientes.

let resultado = 0;
let valorPractica;
let coseguro;
let cantidadPractica = parseInt(prompt("Ingrese la cantidad de prácticas a calcular"));
let parcial;

// agregar filtro de valores positivos
while ((isNaN(cantidadPractica)) || (cantidadPractica <= 1)) {
    cantidadPractica = parseInt(prompt("Ingrese la cantidad de prácticas a calcular"));
}


//agregar resta de coseguros
function restaCoseguro() {
    coseguro = parseFloat(prompt("Ingrese el valor de coseguro correspondiente"));
    while ((isNaN(coseguro)) || (coseguro < 0)) {
        coseguro = parseFloat(prompt("Ingrese el valor de coseguro correspondiente"));
    }  
    console.log(`Usuario restará ${coseguro} como coseguro.`);
    parcial = valorPractica - coseguro;
    return parcial;
}


if (cantidadPractica > 0){
    for (let i = 1; i <= cantidadPractica; i++) {
        valorPractica = parseFloat(prompt(`Ingrese el valor de la práctica ${i}`));
        while ((isNaN(valorPractica)) || (valorPractica < 0)) {
            valorPractica = parseFloat(prompt("Ingrese el valor de coseguro correspondiente"));
        }
        console.log(`Usuario agregará ${valorPractica} correspondiente a la práctica ${i}.`);
        restaCoseguro();
        resultado = resultado + parcial;
    }
} 


console.log(`El valor a abonar por el paciente es ${resultado}.`);
alert(`El valor a abonar por el paciente es ${resultado}.`);



