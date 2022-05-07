// Se crea una DB para simular prácticas para autorizar, se "loguea" y permite el ingreso de práctias para calcular el monto a abonar por el paciente usando selects.
let DateTime = luxon.DateTime;

let resultado = [];
let autorizar = false
let btnAutorizar = document.getElementById("autorizar");
let parcial = 0;
let imprimir = [];
let codigoBuscado;
let indice;
let autorizaTiempo;

// array de codigos
let codigos = [];

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
    constructor(codigo,descripcion,valor,valorCoseguro,coseguro,servicio){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.valor = valor;
        this.valorCoseguro = valorCoseguro;
        this.coseguro = coseguro;
        this.servicio = servicio;
    }
    modificarValorManual(){
        this.valor = parseFloat(prompt("Ingrese el nuevo valor de la práctica"));
    }
    sumarIVA(){
        this.valor = this.valor * 1.21;
    }
}

function addPrestacion(){ //pido a usuario datos para agregar codigos
    let newPrestacion = new Prestacion(prompt("Ingrese código para agregar práctica"),prompt("Ingrese la descripción"), parseFloat(prompt("Ingrese el valor de la práctica")), parseInt(prompt("Ingrese el valor del coseguro según convenio")),confirm("Debe abonar coseguro?"));
    codigos.push(newPrestacion);
}

/* ========= MUEVO BASE DE DATOS A CODIGOS.JSON =========

//creo codigos por defecto armando database
const dbPrestacion = (codigo,descripcion,valor,valorCoseguro,coseguro,servicio) => { 
    let newPrestacion = new Prestacion(codigo,descripcion,valor,valorCoseguro,coseguro,servicio);
    codigos.push(newPrestacion);
}

dbPrestacion("180104","Ecografia Ginecológica",300,50,true,18);
dbPrestacion("180106","Ecografia Mamaria",400,50,true,18);
dbPrestacion("180107","Ecografia Cerebral",400,50,true,18);
dbPrestacion("180108","Ecografia Oftalmica",350,50,true,18);
dbPrestacion("180110","Ecografia Tiroidea",300,50,true,18);
dbPrestacion("180111","Ecografia Testicular",500,50,true,18);
dbPrestacion("180112","Ecografia Abdominal",450,100,true,18);
dbPrestacion("180113","Ecografia Hepatica, Biliar, Esplenica o Toracica",400,100,true,18);
dbPrestacion("180114","Ecografia Vesicoprostatica",350,100,true,18);
dbPrestacion("180116","Ecografia Renal",350,150,true,18);
dbPrestacion("180117","Ecografia de Aorta Abdominal",300,150,true,18);
dbPrestacion("180118","Ecografia Pancreatica o Suprarrenal",300,150,true,18);

dbPrestacion("180202","Eco Doppler Mamario Bilateral",300,150,true,19);
dbPrestacion("180204","Eco Doppler Cardiaco",500,50,true,19);
dbPrestacion("180206","Eco Doppler Vascular Periferico",400,50,true,19);
dbPrestacion("180208","Eco Doppler Abdominal",300,50,true,19);
dbPrestacion("180210","Eco Doppler Arterial Bilateral",400,50,true,19);
dbPrestacion("180214","Eco Doppler Venoso Bilateral",400,50,true,19);
dbPrestacion("180218","Eco Doppler Vasos de Cuello",400,50,true,19);
dbPrestacion("180224","Eco Doppler Testicular",300,50,true,19);
dbPrestacion("180226","Eco Doppler Obstetrico",300,50,true,19);
dbPrestacion("180228","Eco Doppler Cardiaco Fetal",500,50,true,19);
dbPrestacion("180239","Eco Doppler Cardiaco Transesofagico",500,50,true,19);
dbPrestacion("180230","Eco Doppler Transcraneano",500,50,true,19);
dbPrestacion("180240","Eco Doppler Aorta Renal",300,50,true,19);
dbPrestacion("180248","Eco Doppler Tiroideo",300,50,true,19);

//fin de database
*/

const cambioLogin = (element) =>{
    let form = document.querySelector(".login");
    let originalForm = document.getElementById("loginInicial")
    let newForm = document.createElement("section");
    newForm.setAttribute("id","loginNuevo");
    newForm.innerHTML = `<span class="welcome">Bienvenido ${element}</span><a href="#" onclick="logout()">logout</a>`;
    form.appendChild(newForm);
    originalForm.style.display ="none";
}

let usuario = document.getElementById("username");
let loginBtn = document.getElementById("loginBtn");
let ctaAutorizar = document.getElementById("ctaAutorizar");

//login en storage
let loginStorage = localStorage.getItem("user");
if (loginStorage){
    cambioLogin(loginStorage);
    ctaAutorizar.style.opacity = 1;
    ctaAutorizar.style.pointerEvents = "initial";
} 

loginBtn.onclick = (e) => {
    e.preventDefault();
    cambioLogin(usuario.value);
    localStorage.setItem("user",usuario.value);
    cambioMain();
    obtenerCodigos();
}

const logout = () =>{
    localStorage.removeItem("user");
    location.reload();
}

ctaAutorizar.onclick = (e) => {
    e.preventDefault();
    cambioMain();
    obtenerCodigos();
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
        const { valorCoseguro, coseguro } = element
        coseguro ? parcial += valorCoseguro : parcial = parcial;
    })
    parcial = parcial.toFixed(2);
    if (parcial > 0) {
        let p = document.getElementById("resultado");
        p.innerText = `El paciente debe abonar $${parcial}`;
    }
    autorizaTiempo = DateTime.now();
    console.log(`Se autorizó en este momento ${autorizaTiempo.toLocaleString(DateTime.DATETIME_FULL)}`);
    console.table(resultado);
    console.log(`Se indicó abonar $${parcial}`);
    storeAutorizacion();
    mostrarToast();
})

function storeAutorizacion(){
    let storageAutorizacion = JSON.parse(localStorage.getItem("autorizacion"));
    let guardar = {
        tiempo: autorizaTiempo.toLocaleString(DateTime.DATETIME_FULL),
        practicas: resultado,
        valorFinal: parcial
    };
    let arrayStore = [];
    if (!storageAutorizacion){
        arrayStore.push(guardar);
        localStorage.setItem("autorizacion",JSON.stringify(arrayStore));
    } else {
        arrayStore = storageAutorizacion;
        arrayStore.push(guardar);
        localStorage.setItem("autorizacion",JSON.stringify(arrayStore));
    }
}
    
const clearStorage = (key) =>{
    localStorage.removeItem(key);
};


const mostrarToast = () => {
    setTimeout( ()=>{
        Toastify({
            text: "Calculo realizado correctamente",
            duration: 4000,
            style: {
                background: "linear-gradient(to top, #00ff76, #84ecb4)"
            }
        }).showToast()
    },1000)
}

const obtenerCodigos = async () => {
    try {
        let respuesta = await fetch("js/codigos.json");
        let resultado = await respuesta.json();
        codigos = resultado;
    } catch (error) {
        console.log(error);
    }
}