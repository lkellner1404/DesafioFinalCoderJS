let codigos = [];
let obraSocialSelect;
let servicio;
let practicas = document.getElementById("practicas");
let continuar1 = document.getElementById("continuar1");
const selectorObraSocial__obraSocial = document.getElementById("selectorObraSocial__obraSocial");

continuar1.addEventListener("click",()=>{
    if (document.getElementById("pteParticularSi").checked){
        console.log("Tiene OS")
        cambioSi();
    }
    if (document.getElementById("pteParticularNo").checked){
        console.log("No Tiene OS")
        cambioNo();
    }
});

const obtenerCodigos = async () => {
    try {
        let respuesta = await fetch("js/codigos.json");
        let resultado = await respuesta.json();
        codigos = resultado;
    } catch (error) {
        console.log(error);
    }
}

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
        deshabilitar("pteParticularSi")
        deshabilitar("pteParticularNo")
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
        deshabilitar("pteParticularSi");
        deshabilitar("pteParticularNo");
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

const programa = () => {
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
                <td><input type="checkbox" value="${el.codigo}"></td>
                <td>${el.codigo}</td>
                <td>${el.descripcion}</td>
                `
                document.getElementById("tabla__practicas--tabla").appendChild(linea);
            }
        });
    }
    practicas.appendChild(servicioSelect);
    displayPrograma();
    console.log("aca armaria la pantalla de la tabla y el menu a la derecha con el boton autorizar")
}

const displayPrograma = () => {
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
    `;
    let divSecundario = document.createElement("div");
    divSecundario.setAttribute("id","carrito__practicas");
    divSecundario.style.flexGrow = "1";
    divSecundario.innerHTML = 
    `
    <div id="carrito"></div>
    <button id="autorizar">Autorizar Prácticas</button>
    <button>volver atras</button>
    `;
    practicas.appendChild(divPrimario);
    practicas.appendChild(divSecundario);
}

