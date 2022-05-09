let obraSocialSelect;
let continuar = document.getElementById("continuar");
const selectorObraSocial__obraSocial = document.getElementById("selectorObraSocial__obraSocial");

function cont(){
    if (document.getElementById("pteParticularSi").checked){
        console.log("Tiene OS")
        cambioSi();
    }
    if (document.getElementById("pteParticularNo").checked){
        console.log("No Tiene OS")
        cambioNo();
    }
}

continuar.addEventListener("click",cont);

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
        <button onclick="reload()">volver atras</button>
        `;
        desvanecerBtn(continuar);
        document.getElementById("pteParticularSi").setAttribute("disabled","");
        document.getElementById("pteParticularNo").setAttribute("disabled","");
        selectorObraSocial();
    } catch(error) {
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

const selectorObraSocial = async () => {
    try {
        let respuesta = document.getElementById("obraSocial");
        obraSocialSelect = respuesta;
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
        <button onclick="reload()">volver atras</button>
        `;
        desvanecerBtn(continuar);
        document.getElementById("pteParticularSi").setAttribute("disabled","");
        document.getElementById("pteParticularNo").setAttribute("disabled","");
    } catch (error) {
        console.log(error);
    }
}
