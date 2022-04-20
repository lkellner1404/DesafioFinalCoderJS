// Se crea una DB para simular prácticas para autorizar, se "loguea" y permite el ingreso de práctias para calcular el monto a abonar por el paciente usando selects.

let resultado = [];
let autorizar = false
let btnAutorizar = document.getElementById("autorizar");
let parcial = 0;
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
    constructor(codigo,descripcion,valor,valorCoseguro,coseguro){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.valor = valor;
        this.valorCoseguro = valorCoseguro;
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
    let newPrestacion = new Prestacion(prompt("Ingrese código para agregar práctica"),prompt("Ingrese la descripción"), parseFloat(prompt("Ingrese el valor de la práctica")), parseInt(prompt("Ingrese el valor del coseguro según convenio")),confirm("Debe abonar coseguro?"));
    codigos.push(newPrestacion);
}

//creo codigos por defecto armando database
const dbPrestacion = (codigo,descripcion,valor,valorCoseguro,coseguro) => { 
    let newPrestacion = new Prestacion(codigo,descripcion,valor,valorCoseguro,coseguro);
    codigos.push(newPrestacion);
}

dbPrestacion("180104","Ecografia Ginecológica",300,50,true);
dbPrestacion("180106","Ecografia Mamaria",400,50,true);
dbPrestacion("180112","Ecografia Abdominal",400,100,true);
dbPrestacion("180116","Ecografia Renal",300,150,true);
//fin de database

// btnAutorizar.addEventListener("click",() => {
//     autorizar = true;
//     if (autorizar){
//         do {
//             codigoBuscado = prompt("Ingrese código de práctica");
//             let encuentra = codigos.some(el => el.codigo == codigoBuscado);
//             if (encuentra) {
//                 resultado.push(codigos.find(el => el.codigo == codigoBuscado));
//                 restaCoseguro()
//                 resultado[indice].modificarValor(parcial);
//                 autorizar = confirm("Tiene otra práctica para autorizar?")
//             } else {
//                 alert("No se encontro la práctica");
//                 break
//             }
//         } while (autorizar);
//         imprimir = resultado;
//         resultado = resultado.reduce((acumulador, el) => acumulador + el.valor, 0);
//     }
//     if (resultado > 0){
//         console.log(`El paciente debe abonar un total de $${resultado}.`)
//     } else {
//         console.log("El paciente no debe abonar");
//     }
// })

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

let arrayAutorizar = [];
btnAutorizar.addEventListener("click", (e) => {
    e.preventDefault();
    resultado = [];
    parcial = 0;
    arrayAutorizar = document.querySelectorAll(".practicas");
    arrayAutorizar.forEach(element => {
        if (element.value != ""){
            resultado.push(codigos.find(el => el.codigo == element.value));
        }
    });
    resultado.forEach(element => {
        if (element.coseguro) {
            parcial = parcial + element.valorCoseguro;
        } else {
            parcial = parcial;
        }
    })
    parcial = parcial.toFixed(2);
    if (parcial > 0) {
        let p = document.getElementById("resultado");
        p.innerText = `El paciente debe abonar $${parcial}`;
    }
})


