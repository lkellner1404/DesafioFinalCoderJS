// Se crea una DB para simular prácticas para autorizar, se le pide al usuario el código de la práctica, si está en la DB busca el valor y le pide si tiene coseguro, en caso que sea positivo le resta este al valor y continúa con otro codigo.
// En caso que el usuario ingrese un código que no se encuentra en la DB se finaliza el programa con los valores calculados hasta el error.

let resultado = [];
let autorizar = false
let btnAutorizar = document.getElementById("autorizar");
let parcial;
let imprimir = [];
let codigoBuscado;
let indice;

// array de codigos
const codigos = [];

//agregar resta de coseguros
function restaCoseguro() {
    let valorPractica = 0;
    let valorCoseguro = 0;
    let coseguro = confirm("Le corresponde coseguro según convenio?")
    indice = resultado.findIndex(el => el.codigo == codigoBuscado);
    if (coseguro){
        valorCoseguro = resultado[indice].coseguro ;
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

btnAutorizar.addEventListener("click",() => {
    autorizar = true;
    if (autorizar){
        do {
            codigoBuscado = prompt("Ingrese código de práctica");
            let encuentra = codigos.some(el => el.codigo == codigoBuscado);
            if (encuentra) {
                resultado.push(codigos.find(el => el.codigo == codigoBuscado));
                restaCoseguro()
                resultado[indice].modificarValor(parcial);
                autorizar = confirm("Tiene otra práctica para autorizar?")
            } else {
                alert("No se encontro la práctica");
                break
            }
        } while (autorizar);
        imprimir = resultado;
        resultado = resultado.reduce((acumulador, el) => acumulador + el.valor, 0);
    }
    if (resultado > 0){
        console.log(`El paciente debe abonar un total de $${resultado}.`)
    } else {
        console.log("El paciente no debe abonar");
    }
})

let usuario = "";
let username = document.querySelector("#username");
username.onchange = () =>{usuario = username.value;}
let loginBtn = document.getElementById("loginBtn");
loginBtn.onclick = (e) => {
    e.preventDefault();
    let form = document.querySelector(".login");
    let originalForm = document.getElementById("loginInicial")
    let newForm = document.createElement("section");
    newForm.setAttribute("id","loginNuevo");
    newForm.innerHTML = `<span class="welcome">Bienvenido ${usuario}</span><a href="#">logout</a>`;
    form.appendChild(newForm);
    originalForm.style.display ="none";
    cambioMain();
}
function cambioMain(){
    let originalMain = document.getElementById("originalMain");
    originalMain.style.display = "none";
    let newMain = document.getElementById("newMain");
    newMain.style.display = "block";
    btnAutorizar.style.display = "inline-block";
}
