/*
Autores: Leandro Rizzo (354610), Mateo Laporta (354622)
Grupo: m1d
Obligatorio Programación 1 - 1er semestre 2025
*/

window.addEventListener("load", inicio);
let sistema = new Sistema();

function inicio() {
    document.getElementById("idBtnAgregarCarrera").addEventListener("click", agregarCarrera);
    document.getElementById("idBtnAgregarPatrocinador").addEventListener("click", agregarPatrocinador);
    document.getElementById("idBtnAgregarCorredor").addEventListener("click", agregarCorredor);
    document.getElementById("idBtnInscribir").addEventListener("click", inscribir);

    document.getElementById("idSeccionDatos").classList.remove("oculto");
    document.getElementById("idSeccionEstadisticas").classList.add("oculto");

    document.getElementById("idBtnDatos").classList.add("botonActivo");

    document.getElementById("idBtnDatos").onclick = mostrarDatos;
    document.getElementById("idBtnEstadisticas").onclick = mostrarEstadisticas;
}

function agregarCarrera() {
    if (document.getElementById("idFormCarreras").reportValidity()) {
        let nombre = document.getElementById("idNombreCarrera").value;
        let departamento = document.getElementById("idDepartamentos").value;
        let fecha = document.getElementById("idFechaCarrera").value;
        let fechaObjeto = new Date(fecha);
        let cupoMax = document.getElementById("idCupoCarrera").value;

        if (sistema.carreraUnica(nombre)) {
            sistema.agregarCarrera(new Carrera(nombre, departamento, fechaObjeto, cupoMax));
            document.getElementById("idFormCarreras").reset();
        }
        else {
            alert("¡La carrera ya existe!")
        }

    }
}

function agregarPatrocinador() {
    if (document.getElementById("idFormPatrocinadores").reportValidity()) {
        let nombre = document.getElementById("idNombrePatrocinador").value;
        let rubro = document.getElementById("idRubroPatrocinador").value;
        let carreraApoyo = document.getElementById("idCarrerasPatrocinio").value;
        sistema.eliminarPatrocinador(nombre);
        sistema.agregarPatrocinador(new Patrocinador(nombre, rubro, carreraApoyo));
    }
}

function agregarCorredor() {
    if (document.getElementById("idFormCorredores").reportValidity()) {
        let nombre = document.getElementById("idNombreCorredor").value;
        let edad = document.getElementById("idEdadCorredor").value;
        let cedula = document.getElementById("idCedulaCorredor").value;
        let vencimientoFicha = document.getElementById("idFechaFicha").value;
        let vencimientoFichaObjeto = new Date(vencimientoFicha);
        let tipoDeportista = "";
        if (document.getElementById("idComun").checked) {
            tipoDeportista = "comun";
        } else if (document.getElementById("idElite").checked) {
            tipoDeportista = "elite";
        }

        if (sistema.corredorUnica(cedula)) {
            sistema.agregarCorredor(new Corredor(nombre, edad, cedula, vencimientoFichaObjeto, tipoDeportista));
            document.getElementById("idFormCorredores").reset();
        }
        else {
            alert("¡El corredor ya existe!")
        }

    }
}

function inscribir() {
    if (document.getElementById("idFormInscribir").reportValidity()) {
        let corredorIndex = document.getElementById("idCorredoresInscribir").value;
        let carreraIndex = document.getElementById("idCarrerasInscribir").value;
        let corredorObjeto = sistema.listaCorredores[corredorIndex];
        let carreraObjeto = sistema.listaCarreras[carreraIndex];
        let corredorCI = corredorObjeto.cedula;
        let carreraNombre = carreraObjeto.nombre;
        if (carreraObjeto.tieneCupo() && corredorObjeto.vencimientoFicha - carreraObjeto.fecha > 0) {
            if (sistema.inscripcionUnica(corredorCI, carreraNombre)) {
                let inscripcion = new Inscripcion(corredorObjeto, carreraObjeto);
                inscripcion.agregarInscriptoNumero();
                sistema.agregarInscriptos(inscripcion);
                carreraObjeto.agregarInscripto(inscripcion);
                alert("¡Inscripción exitosa!");
                document.getElementById("idFormInscribir").reset();
            } else {
                alert("¡El corredor ya está inscripto en la carrera seleccionada!");
            }
        } else if (!carreraObjeto.tieneCupo()) {
            alert("¡No hay cupo disponible en la carrera seleccionada!");
        } else {
            alert("¡La ficha del corredor está vencida!");
        }
    }
}

function mostrarDatos() {
    document.getElementById("idSeccionDatos").classList.remove("oculto");
    document.getElementById("idSeccionEstadisticas").classList.add("oculto");
    document.getElementById("idBtnDatos").classList.add("botonActivo");
    document.getElementById("idBtnEstadisticas").classList.remove("botonActivo");
}

function mostrarEstadisticas() {
    document.getElementById("idSeccionDatos").classList.add("oculto");
    document.getElementById("idSeccionEstadisticas").classList.remove("oculto");
    document.getElementById("idBtnDatos").classList.remove("botonActivo");
    document.getElementById("idBtnEstadisticas").classList.add("botonActivo");
}
/*
function actualizar() {
}


function cargarCombosCarrera() {

}

function cargarCombosCorredores() {

}

function cargarTablaPorNumero() {

}
*/

function agregarInscriptosEnTabla(carrera) {
    let tabla = document.getElementById("idTablaInscriptos");
    tabla.innerHTML = "";
    let inscripciones = [];
    if (document.getElementById("idNombreOrden").checked) {
        inscripciones = sistema.ordenarInscriptosPorNombre(carrera);
    } else if (document.getElementById("idNumeroOrden").checked) {
        inscripciones = sistema.ordenarInscriptosPorNumero(carrera);
    }
    for (let inscripcion of inscripciones) {
        let fila = tabla.insertRow();
        let celda1 = fila.insertCell();
        let celda2 = fila.insertCell();
        let celda3 = fila.insertCell();
        let celda4 = fila.insertCell();
        let celda5 = fila.insertCell();
        celda1.innerHTML = inscripcion.corredor.nombre;
        celda2.innerHTML = inscripcion.corredor.edad;
        celda3.innerHTML = inscripcion.corredor.cedula;
        celda4.innerHTML = inscripcion.corredor.vencimientoFicha;
        celda5.innerHTML = inscripcion.numero;
    }

}

function cargarCarrerasConMasInscriptos(){
    let lista = document.getElementById("idCarrerasMasInscriptos");
    lista.innerHTML = "";
    let datos = sistema.carrerasMasInscriptos();
    for (let elem of datos) {
        let nodo = document.createElement("LI");
        let nodoTexto = document.createTextNode(elem);
        nodo.appendChild(nodoTexto);
        lista.appendChild(nodo);
    }
}



function cargarCarrerasSinInscriptosPorFecha() {
    let lista = document.getElementById("idCarrerasSinInscriptos");
    lista.innerHTML = "";
    let datos = sistema.carrerasSinInscriptosPorFecha();
    for (let elem of datos) {
        let nodo = document.createElement("LI");
        let nodoTexto = document.createTextNode(elem);
        nodo.appendChild(nodoTexto);
        lista.appendChild(nodo);
    }
}


function cargarPorcentajeElite() {
    let porcentaje = sistema.porcentajeElite();
    document.getElementById("idPorcentajeElite").innerHTML = "Porcentaje de corredores élite: " + porcentaje + "%";

}

function cargarPromedioInscriptosPorCarrera() {
    let promedio = sistema.promedioInscriptosPorCarrera();
    document.getElementById("idPromedioInscriptos").innerHTML = "Promedio de inscriptos por carrera: " + promedio;
}


function cargarMapaPorCarreras() {

}

function cargarMapaPorInscripciones() {

}

function cargarMapa() {
    if (document.getElementById("idComboMapa").value == "carreras") {
        cargarMapaPorCarreras();
    } else if (document.getElementById("idComboMapa").value == "inscripciones") {
        cargarMapaPorInscripciones();
    }
}


