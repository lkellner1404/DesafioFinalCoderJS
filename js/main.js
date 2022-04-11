// Se crea una DB para simular prácticas para autorizar, se le pide al usuario el código de la práctica, si está en la DB busca el valor y le pide si tiene coseguro, en caso que sea positivo le resta este al valor y continúa con otro codigo.
// En caso que el usuario ingrese un código que no se encuentra en la DB se finaliza el programa con los valores calculados hasta el error.

let resultado = [];
let valorPractica;
let coseguro;
let valorCoseguro = 0;
let cantidadPractica = confirm("Tiene prácticas para autorizar?");
let parcial;
let imprimir = [];
let codigoBuscado;
let indice;

// array de codigos
const codigos = [];

//agregar resta de coseguros
function restaCoseguro() {
    coseguro = confirm("Le corresponde coseguro según convenio?")
    indice = resultado.findIndex(el => el.codigo == codigoBuscado);
    if (coseguro){

        valorCoseguro = resultado[indice].coseguro ;//parseFloat(prompt("Ingrese el valor de coseguro correspondiente"));
        while ((isNaN(valorCoseguro)) || (valorCoseguro < 0)) {
            valorCoseguro = parseFloat(prompt("Ingrese el valor de coseguro correspondiente"));
        }  
        valorPractica = resultado[indice].valor;
        parcial = valorPractica - valorCoseguro;
    } else {
        parcial = resultado[indice].valor;
    }
    return parcial;
}

// clase de codigos con metodos de cambio de datos
class Prestacion {
    constructor(codigo,descripcion,valor,coseguro){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.valor = valor;
        this.coseguro = coseguro;
    }
    modificarValorManual(){
        this.valor = parseFloat(prompt("Ingrese el nuevo valor de la práctica"));
    }
    modificarValor(a){
        this.valor = a;
    }
}

function addPrestacion(){ //pido a usuario datos para agregar codigos
    let newPrestacion = new Prestacion(prompt("Ingrese código para agregar práctica"),prompt("Ingrese la descripción"), parseFloat(prompt("Ingrese el valor de la práctica")), parseInt(prompt("Ingrese el valor del coseguro según convenio")));
    codigos.push(newPrestacion);
}

//creo codigos por defecto armando database
const dbPrestacion = (codigo,descripcion,valor,coseguro) => { 
    let newPrestacion = new Prestacion(codigo,descripcion,valor,coseguro);
    codigos.push(newPrestacion);
}

dbPrestacion("180104","Ecografia Ginecológica",300,50);
dbPrestacion("180106","Ecografia Mamaria",400,50);
dbPrestacion("180112","Ecografia Abdominal",400,100);
dbPrestacion("180116","Ecografia Renal",300,50);
//fin de database

if (cantidadPractica){
    do {
        codigoBuscado = prompt("Ingrese código de práctica");
        let encuentra = codigos.some(el => el.codigo == codigoBuscado);
        if (encuentra) {
            resultado.push(codigos.find(el => el.codigo == codigoBuscado));
            restaCoseguro()
            resultado[indice].modificarValor(parcial);
            cantidadPractica = confirm("Tiene otra práctica para autorizar?")
        } else {
            alert("No se encontro la práctica");
            break
        }
    } while (cantidadPractica);
    imprimir = resultado;
    resultado = resultado.reduce((acumulador, el) => acumulador + el.valor, 0);
}
if (resultado > 0){
    alert(`El paciente debe abonar un total de $${resultado}.`)
} else {
    alert("El paciente no debe abonar");
}

