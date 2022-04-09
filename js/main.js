// Se crea una DB para simular prácticas para autorizar, se le pide al usuario el código de la práctica, si está en la DB busca el valor y le pide si tiene coseguro, en caso que sea positivo le resta este al valor y continúa con otro codigo.
// En caso que el usuario ingrese un código que no se encuentra en la DB se finaliza el programa con los valores calculados hasta el error.

let resultado = [];
let valorPractica;
let coseguro;
let cantidadPractica = confirm("Tiene prácticas para autorizar?")//parseInt(prompt("Ingrese el valor indicado debajo si quiere calcular prácticas. \n\n1. Si \n2.No"));
let parcial;

//agregar resta de coseguros
function restaCoseguro() {
    coseguro = confirm("La práctica tiene coseguro?")
    if (coseguro){
        coseguro = parseFloat(prompt("Ingrese el valor de coseguro correspondiente"));
        while ((isNaN(coseguro)) || (coseguro < 0)) {
            coseguro = parseFloat(prompt("Ingrese el valor de coseguro correspondiente"));
        }  
        valorPractica = resultado[0].valor;
        parcial = valorPractica - coseguro;
    } else {
        parcial = resultado[0].valor;
    }
    return parcial;
}

// array de codigos
const codigos = [];

// clase de codigos con metodos de cambio de datos
class Prestacion {
    constructor(codigo,descripcion,valor){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.valor = valor;
    }
    modificarValorManual(){
        this.valor = parseFloat(prompt("Ingrese el nuevo valor de la práctica"));
    }
    modificarValor(a){
        this.valor = a;
    }
}

function addPrestacion(){ //pido a usuario datos para agregar codigos
    let newPrestacion = new Prestacion(prompt("Ingrese código para agregar práctica"),prompt("Ingrese la descripción"), parseFloat(prompt("Ingrese el valor de la práctica")));
    codigos.push(newPrestacion);
}

//creo codigos por defecto armando database
const dbPrestacion = (codigo,descripcion,valor) => { 
    let newPrestacion = new Prestacion(codigo,descripcion,valor);
    codigos.push(newPrestacion);
}

dbPrestacion("180104","Ecografia Ginecológica",200);
dbPrestacion("180106","Ecografia Mamaria",200);
dbPrestacion("180112","Ecografia Abdominal",200);
dbPrestacion("180116","Ecografia Renal",200);
//fin de database

if (cantidadPractica){
    do {
        let codigoBuscado = prompt("Ingrese código de práctica");
        let encuentra = codigos.some(el => el.codigo == codigoBuscado);
        if (encuentra) {
            resultado.push(codigos.find(el => el.codigo == codigoBuscado));
            restaCoseguro()
            resultado[0].modificarValor(parcial);
            cantidadPractica = confirm("Tiene otra práctica para autorizar?")
        } else {
            alert("No se encontro la práctica");
            break
        }
    } while (cantidadPractica);
    resultado = resultado.reduce((acumulador, el) => acumulador + el.valor, 0);
}
if (resultado > 0){
    alert(`El paciente debe abonar un total de $${resultado}.`)
} else {
    alert("El paciente no debe abonar");
}

