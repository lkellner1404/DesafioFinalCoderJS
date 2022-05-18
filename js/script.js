let codigos = [];
let arrayBuscar = [];
let parcial = [];
let final = [];
let valorFinal;
let obraSocialSelect;
let obraSocial;
let particular;
let servicio;
let practicas = document.getElementById("practicas");
let continuar1 = document.getElementById("continuar1");
let carrito;
const selectorObraSocial__obraSocial = document.getElementById("selectorObraSocial__obraSocial");

class Prestacion {
    constructor(codigo,descripcion,valor,valorCoseguro,coseguro,servicio){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.valor = valor;
        this.valorCoseguro = valorCoseguro;
        this.coseguro = coseguro;
        this.servicio = servicio;
    }
    esPAMI(){
        this.valor = this.valor * 0.5;
    }
    sumarIVA(){
        this.valor = this.valor * 1.21;
    }
}

// ------ DESCARGO DATOS DE JSON ------

const obtenerCodigos = async () => {
    try {
        let respuesta = await fetch("js/codigos.json");
        let resultado = await respuesta.json();
        //spread y new prestacion en for each resultado
        for (const cod of resultado) {
            const { codigo,descripcion,valor,valorCoseguro,coseguro,servicio } = cod;
            codigos.push( new Prestacion(codigo,descripcion,valor,valorCoseguro,coseguro,servicio));
        }
        // codigos = resultado;
    } catch (error) {
        console.log(error);
    }
}

// ------ SETEO DE PROPIEDADES DEL PACIENTE ------

continuar1.addEventListener("click",()=>{
    if (document.getElementById("pteConObraSocial").checked){
        console.log("Tiene OS")
        particular = false;
        cambioSi();
    }
    if (document.getElementById("pteSinObraSocial").checked){
        console.log("No Tiene OS")
        particular = true;
        cambioNo();
    }
});

const cambioSi = async () => {
    try {
        selectorObraSocial__obraSocial.innerHTML += 
        `
        <label for="obraSocial">Elija la opcion correcta:</label>
        <select name="obraSocial" id="obraSocial">
        <option value="0">Obra Social sin cobro de coseguro</option>
        <option value="1">Obra Social con cobro de coseguro</option>
        <option value="2">PAMI</option>
        </select>
        <button onclick="programa()" id="continuar2">continuar</button>
        <button onclick="reload()" id="volver1">volver atras</button>
        `;
        desvanecerBtn(continuar1);
        deshabilitar("pteConObraSocial")
        deshabilitar("pteSinObraSocial")
        selectorObraSocial();
        obtenerCodigos();
    } catch(error) {
        console.log(error);
    }
}

const cambioNo = async () => {
    try {
        selectorObraSocial__obraSocial.innerHTML += 
        `
        <label for="obraSocial">Elija la opcion correcta:</label>
        <select name="obraSocial" id="obraSocial" disabled>
            <option value="-1">Paciente Particular</option>
        </select>
        <button onclick="programa()" id="continuar2">continuar</button>
        <button onclick="reload()" id="volver1">volver atras</button>
        `;
        desvanecerBtn(continuar1);
        deshabilitar("pteConObraSocial");
        deshabilitar("pteSinObraSocial");
        obtenerCodigos();
    } catch (error) {
        console.log(error);
    }
}

const desvanecerBtn = (e) =>{
    e.style.opacity = "0";
    e.style.transition = "none";
    e.style.pointerEvents = "none";
}

const reload = () => {
    location.reload();
}

const deshabilitar = (e) => {
    document.getElementById(e).setAttribute("disabled","");
}

const selectorObraSocial = async () => {
    try {
        let respuesta = document.getElementById("obraSocial");
        obraSocialSelect = respuesta;
    } catch(error) {
        console.log(error);
    }
}

// ------ POPULA TABLA PARA SELECCIONAR CODIGOS ------

const programa = () => {
    obraSocial = document.getElementById("obraSocial").value;
    deshabilitar("obraSocial");
    let servicioSelect = document.createElement("select");
    servicioSelect.setAttribute("id","servicioSelect");
    servicioSelect.style.width = "70ch";
    servicioSelect.innerHTML = 
    `
    <option disabled selected>-</option>
    <option value="18">Ecografia Simple</option>
    <option value="19">Ecodoppler</option>
    `
    servicioSelect.onchange = () =>{
        servicio = servicioSelect.value;
        let tablaPracticas = document.getElementById("tabla__practicas--tabla");
        tablaPracticas.innerHTML = 
        `
        <tr>
            <th></th>
            <th>Codigo</th>
            <th>Descripcion</th>
        </tr>
        `;
        codigos.forEach(el => {
            if (el.servicio == servicio){
                let linea = document.createElement("tr")
                linea.innerHTML = 
                `
                <td><input type="checkbox" value="${el.codigo}" class="checkbox"></td>
                <td>${el.codigo}</td>
                <td>${el.descripcion}</td>
                `
                document.getElementById("tabla__practicas--tabla").appendChild(linea);
            }
        });
    }
    practicas.appendChild(servicioSelect);
    desvanecerBtn(document.getElementById("continuar2"));
    desvanecerBtn(document.getElementById("volver1"));
    displayPrograma();
}

const displayPrograma = () => {
    let masterDiv = document.createElement("div");
    masterDiv.setAttribute("id","masterDiv");
    masterDiv.style.display = "flex";
    masterDiv.style.flexDirection = "direction;"
    masterDiv.style.width = "95vw";
    masterDiv.style.paddingInline = "2.5vw";

    let divPrimario = document.createElement("div");
    divPrimario.setAttribute("id","tabla__practicas");
    divPrimario.style.flexGrow = "10";
    divPrimario.innerHTML = 
    `
    <table id="tabla__practicas--tabla">
        <tr>
            <th></th>
            <th>Codigo</th>
            <th>Descripcion</th>
        </tr>
    </table>
    <button onclick="alCarrito()">agregar</button>
    `;
    let divSecundario = document.createElement("div");
    divSecundario.setAttribute("id","carrito__practicas");
    divSecundario.style.flexGrow = "1";
    divSecundario.innerHTML = 
    `
    <div id="carrito"></div>
    <button id="autorizar" onclick="autorizar()">Autorizar Prácticas</button>
    <button onclick="limpiarCarrito()">limpiar</button>
    `;
    practicas.appendChild(masterDiv)
    masterDiv.appendChild(divPrimario);
    masterDiv.appendChild(divSecundario);
    carrito = document.getElementById("carrito");
    carrito.innerHTML = 
    `
    <table id="carrito__tabla">
        <tr>
            <th>Codigo</th>
            <th>Descripcion</th>
        </tr>
    </table>
    `;
}


// ------ CARGA PRESTACIONES EN CARRITO ------

const alCarrito = () =>{
    let codigoBuscado = document.getElementsByClassName("checkbox");
    arrayBuscar = [...codigoBuscado];
    for (const codigo of arrayBuscar) {
        if(codigo.checked){
            parcial.push(codigos.find(el => el.codigo == codigo.value));
            codigo.click();
        }
    }
    carrito = document.getElementById("carrito");
    carrito.innerHTML = 
    `
    <table id="carrito__tabla">
        <tr>
            <th>Codigo</th>
            <th>Descripcion</th>
        </tr>
    </table>
    `;
    parcial.forEach(el => {
        let linea = document.createElement("tr")
        linea.innerHTML = 
        `
        <td class="practicasFinal">${el.codigo}</td>
        <td>${el.descripcion}</td>
        `
        document.getElementById("carrito__tabla").appendChild(linea)
    })
}

const limpiarCarrito = () =>{
    parcial = [];
    final = [];
    carrito.innerHTML = 
    `
    <table id="carrito__tabla">
        <tr>
            <th>Codigo</th>
            <th>Descripcion</th>
        </tr>
    </table>
    `;
}

// ------ FINALIZA PROCESO ------

const autorizar = () => {
    const tablita = document.querySelectorAll(".practicasFinal")
    tablita.forEach( el => {
        const codigosMapeados = codigos.map(cod => cod).filter(prestacion => prestacion.codigo == `${el.textContent}`);
        // const codigoBuscado = codigosMapeados.filter(prestacion => prestacion.codigo == `${el.textContent}`);
        final.push(...codigosMapeados);
    })
    valorFinal = final;
    if (particular) {
        for (const cod of valorFinal) {
            cod.valor = cod.valor * 1.21;
        }
    }
    switch (obraSocial) {
        case "2":
            for (const cod of valorFinal) {
                cod.valor = cod.valor * 0.50;
            }
            valorFinal = valorFinal.reduce((acumulador, el) => acumulador + el.valor, 0);
            break;
        case "1":
            valorFinal = valorFinal.reduce((acumulador, el) => acumulador + el.valorCoseguro, 0);
            break;
        case "0":
            valorFinal = 0;
            break;
        default:
            valorFinal = valorFinal.reduce((acumulador, el) => acumulador + el.valor, 0);
            break;
    }
    valorFinal = valorFinal.toFixed(2);
    console.table(final);
    console.log(`El valor a abonar por el paciente es de ${valorFinal}`)
    swal({title:`El valor a abonar por el paciente es de ${valorFinal}`});
}