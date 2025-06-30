/*
Autores: Leandro Rizzo (354610), Mateo Laporta (354622)
Grupo: m1d
Obligatorio Programación 1 - 1er semestre 2025
*/

window.addEventListener("load", inicio);
let sistema = new Sistema();
let codigosDepartamentos = [
    'UY-MO', 'UY-CA', 'UY-MA', 'UY-RO', 'UY-TT',
    'UY-CL', 'UY-RV', 'UY-AR', 'UY-SA', 'UY-PA',
    'UY-RN', 'UY-SO', 'UY-CO', 'UY-SJ', 'UY-FS',
    'UY-FD', 'UY-LA', 'UY-DU', 'UY-TA'
];

let nombresDepartamentos = [
    "Montevideo", "Canelones", "Maldonado", "Rocha", "Treinta y Tres",
    "Cerro Largo", "Rivera", "Artigas", "Salto", "Paysandú",
    "Río Negro", "Soriano", "Colonia", "San José", "Flores",
    "Florida", "Lavalleja", "Durazno", "Tacuarembó"
];

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

function agregarCarrera() { //podrian llamarse igual pero ser otro dia? o igual pero con distito departamento? preguntarle a anuar 
    if (document.getElementById("idFormCarreras").reportValidity()) {
        let nombre = document.getElementById("idNombreCarrera").value;
        nombre = nombre.trim();
        let departamento = document.getElementById("idDepartamentos").value;
        let fecha = document.getElementById("idFechaCarrera").value;
        let fechaObjeto = new Date(fecha);
        let cupoMax = document.getElementById("idCupoCarrera").value;

        if (sistema.carreraUnica(nombre)) {
            let carrera = new Carrera(nombre, departamento, fechaObjeto, cupoMax);
            sistema.agregarCarrera(carrera);
            alert("¡Carrera agregada exitosamente!");
            document.getElementById("idFormCarreras").reset();
            cargar();
        }
        else {
            alert("¡La carrera ya existe!")
        }
    }
}

function agregarPatrocinador() {
    if (document.getElementById("idFormPatrocinadores").reportValidity()) {
        let nombre = document.getElementById("idNombrePatrocinador").value;
        nombre = nombre.trim();
        let rubro = document.getElementById("idRubroPatrocinador").value;
        let comboCarreras = document.getElementById("idCarrerasPatrocinio");
        let carrerasApoyadas = [];
        for (let i = 0; i < comboCarreras.options.length; i++) {
            if (comboCarreras.options[i].selected) {
                carrerasApoyadas.push(sistema.listaCarreras[i]);
            }
        }

        if (carrerasApoyadas.length == 0) {
            alert("Debe seleccionar al menos una carrera para el patrocinador");
        } else {
            if (sistema.patrocinadorUnico(nombre)) {
                let patrocinador = new Patrocinador(nombre, rubro, carrerasApoyadas);
                sistema.agregarPatrocinador(patrocinador);
                alert("¡Patrocinador agregado exitosamente!");
                document.getElementById("idFormPatrocinadores").reset();

            } else if (rubro == sistema.buscarPatrocinador(nombre).rubro && sistema.compararArraysCarreras(carrerasApoyadas, sistema.buscarPatrocinador(nombre).carrerasApoyadas)) {
                alert("¡Debes cambiar algo para actualizarlo!");

            } else {
                sistema.eliminarPatrocinador(nombre);
                let patrocinador = new Patrocinador(nombre, rubro, carrerasApoyadas);
                sistema.agregarPatrocinador(patrocinador);
                alert("¡El patrocinador actualizado exitosamente!");
                document.getElementById("idFormPatrocinadores").reset();
            }
        }
    }
}
function agregarCorredor() {
    if (document.getElementById("idFormCorredores").reportValidity()) {
        let nombre = document.getElementById("idNombreCorredor").value;
        nombre = nombre.trim();
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

        if (sistema.corredorUnico(cedula)) {
            let corredor = new Corredor(nombre, edad, cedula, vencimientoFichaObjeto, tipoDeportista);
            sistema.agregarCorredor(corredor);
            document.getElementById("idFormCorredores").reset();
            alert("¡Corredor agregado exitosamente!");
            cargar();
        }
        else {
            alert("¡El corredor ya existe!")
        }

    }
}

function inscribir() {
    if (document.getElementById("idFormInscribir").reportValidity()) {
        let comboCorredores = document.getElementById("idCorredoresInscribir");
        let comboCarreras = document.getElementById("idCarrerasInscribir");
        let corredorIndex = comboCorredores.selectedIndex;
        let corredor = sistema.listaCorredores[corredorIndex];
        let carreraIndex = comboCarreras.selectedIndex;
        let carrera = sistema.listaCarreras[carreraIndex];

        if (corredorIndex == -1 || carreraIndex == -1) {
            alert("Debe seleccionar un corredor y una carrera");
        } else {
            if (carrera.tieneCupo() && corredor.vencimientoFicha - carrera.fecha > 0) {
                let corredorCI = corredor.cedula;
                let carreraNombre = carrera.nombre;
                if (sistema.inscripcionUnica(corredorCI, carreraNombre)) {
                    let inscripcion = new Inscripcion(corredor, carrera);
                    inscripcion.agregarInscriptoNumero();
                    sistema.agregarInscriptos(inscripcion);
                    carrera.agregarInscripto(inscripcion);
                    cargar();
                    alert("¡Inscripción exitosa!");
                    let patrocinadoresTexto = sistema.patrocinadoresCarrera(carrera);

                    alert(
                        "Nro en la carrera: " + inscripcion.numero +
                        " | Carrera: " + carrera.nombre +
                        " | Departamento: " + obtenerNombreDepartamento(carrera.departamento) +
                        " | Fecha: " + carrera.fecha.toLocaleDateString() +
                        " | Patrocinadores de la carrera: " + patrocinadoresTexto +
                        " | Nombre del corredor: " + corredor.nombre +
                        " | Cédula del corredor: " + corredor.cedula +
                        " | Edad del corredor: " + corredor.edad +
                        " | Tipo de deportista: " + corredor.tipoDeportista +
                        " | Vencimiento de la ficha medica: " + corredor.vencimientoFicha.toLocaleDateString()
                    );

                    generarPDFInscriptos(inscripcion);

                    document.getElementById("idFormInscribir").reset();
                } else {
                    alert("¡El corredor ya está inscripto en la carrera seleccionada!");
                }
            } else if (!carrera.tieneCupo()) {
                alert("¡No hay cupo disponible en la carrera seleccionada!");
            } else {
                alert("¡La ficha del corredor está vencida!");
            }
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
    drawRegionsMap();
}

function cargar() {
    cargarCombosPatrocinadoresCarreras();
    cargarCombosInscripcionesCarreras();
    cargarCombosInscripcionesCorredores();
    cargarCombosConsultaInscriptosCarreras();
    cargarPorcentajeElite();
    cargarCarrerasConMasInscriptos();
    cargarPromedioInscriptosPorCarrera();
    cargarCarrerasSinInscriptosPorFecha();
}


function cargarCombosConsultaInscriptosCarreras() {
    let comboCarreras = document.getElementById("idConsultaCarrera");
    comboCarreras.innerHTML = "";
    for (let carrera of sistema.listaCarreras) {
        let nodo = document.createElement("option");
        let nodoTexto = document.createTextNode(carrera.nombre);
        nodo.appendChild(nodoTexto);
        comboCarreras.appendChild(nodo);
    }
}


function cargarCombosPatrocinadoresCarreras() {
    let comboCarreras = document.getElementById("idCarrerasPatrocinio");
    comboCarreras.innerHTML = "";
    for (let carrera of sistema.listaCarreras) {
        let nodo = document.createElement("option");
        let nodoTexto = document.createTextNode(carrera.nombre);
        nodo.appendChild(nodoTexto);
        comboCarreras.appendChild(nodo);
    }
}


function cargarCombosInscripcionesCorredores() {
    let comboCorredores = document.getElementById("idCorredoresInscribir");
    comboCorredores.innerHTML = "";
    for (let corredor of sistema.listaCorredores) {
        let nodo = document.createElement("option");
        let nodoTexto = document.createTextNode(corredor.nombre + " - " + corredor.cedula);
        nodo.appendChild(nodoTexto);
        comboCorredores.appendChild(nodo);
    }
}

function cargarCombosInscripcionesCarreras() {
    let comboCarreras = document.getElementById("idCarrerasInscribir");
    comboCarreras.innerHTML = "";
    for (let carrera of sistema.listaCarreras) {
        let nodo = document.createElement("option");
        let nodoTexto = document.createTextNode(carrera.nombre + " - " + carrera.fecha.toLocaleDateString());
        nodo.appendChild(nodoTexto);
        comboCarreras.appendChild(nodo);
    }
}


function cargarInscriptosEnTabla() {
    let combo = document.getElementById("idConsultaCarrera");
    let carreraIndex = combo.selectedIndex;
    let carrera = sistema.listaCarreras[carreraIndex];
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

function cargarCarrerasConMasInscriptos() {
    let lista = document.getElementById("idMasInscriptos");
    lista.innerHTML = "";
    let datos = sistema.carrerasMasInscriptos();
    for (let elemCMI of datos) {
        let nodo = document.createElement("LI");
        let nodoTexto = document.createTextNode(elemCMI);
        nodo.appendChild(nodoTexto);
        lista.appendChild(nodo);
    }

}



function cargarCarrerasSinInscriptosPorFecha() {
    let lista = document.getElementById("idCarrerasSinInscriptos");
    lista.innerHTML = "";
    let datos = sistema.carrerasVaciasPorFecha();
    for (let elemCVF of datos) {
        let nodo = document.createElement("LI");
        let nodoTexto = document.createTextNode(elemCVF);
        nodo.appendChild(nodoTexto);
        lista.appendChild(nodo);
    }
}


function cargarPorcentajeElite() {
    let porcentaje = sistema.porcentajeElite();
    document.getElementById("idPorcentajeElite").innerHTML = "Porcentaje de corredores élite: " + porcentaje;
}

function cargarPromedioInscriptosPorCarrera() { //preguntarle a anuar si incluir o no cuando hay 0 inscriptos
    let promedio = sistema.promedioInscriptosPorCarrera();
    document.getElementById("idPromedioInscriptos").innerHTML = "Promedio de inscriptos por carrera: " + promedio;
}

// empieza mapa
function obtenerNombreDepartamento(codigoDepto) {
    let indexDepto = parseInt(codigoDepto) - 1;
    return nombresDepartamentos[indexDepto];
}

google.charts.load('current', {
    packages: ['geochart']
});

google.charts.setOnLoadCallback(drawRegionsMap);

let modo = 'carreras';

function drawRegionsMap() {
    let data = google.visualization.arrayToDataTable(getData());

    let options = {
        region: 'UY',
        resolution: 'provinces',
        colorAxis: { colors: ['#dbeafe', '#1e3a8a'] }, // azul claro a oscuro
        datalessRegionColor: '#e0f2fe',
        tooltip: { isHtml: true }
    };

    let chart = new google.visualization.GeoChart(document.getElementById('mapa'));
    chart.draw(data, options);
}

function getData() {
    let conteo = {};
    for (let i = 0; i < codigosDepartamentos.length; i++) {
        let cod = codigosDepartamentos[i];
        conteo[cod] = 0;
    }

    if (modo == 'carreras') {
        for (let carrera of sistema.listaCarreras) {
            let depto = parseInt(carrera.departamento);
            let cod = codigosDepartamentos[depto - 1];
            if (cod) {
                conteo[cod]++;
            }
        }
    } else {
        for (let inscripto of sistema.listaInscriptos) {
            let carrera = inscripto.carrera;
            let depto = parseInt(carrera.departamento);
            let cod = codigosDepartamentos[depto - 1];
            if (cod) {
                conteo[cod]++;
            }
        }
    }

    let textoTipo = '';
    if (modo == 'carreras') {
        textoTipo = 'Carreras';
    } else {
        textoTipo = 'Inscriptos';
    }

    let resultado = [
        ['Region', textoTipo, { role: 'tooltip', type: 'string', p: { html: true } }]
    ];

    for (let i = 0; i < codigosDepartamentos.length; i++) {
        let cod = codigosDepartamentos[i];
        let nombre = nombresDepartamentos[i];
        let cantidad = conteo[cod];
        let textoTooltip = "<strong>" + nombre + "</strong><br>" + cantidad + " " + textoTipo;
        resultado.push([cod, cantidad, textoTooltip]);
    }

    return resultado;
}

function cambiarModo(nuevoModo) {
    modo = nuevoModo;
    drawRegionsMap();
}

// termina mapa, empieza pdf

function generarPDFInscriptos(inscripcion) {
    const doc = new window.jspdf.jsPDF();

    doc.setFontSize(16);
    doc.text("Comprobante de Inscripción", 20, 10);

    doc.setFontSize(12);
    doc.text("Número de inscripción: " + inscripcion.numero, 20, 20);
    doc.text("Carrera: " + inscripcion.carrera.nombre, 20, 30);
    doc.text("Patrocinadores de la carrera: " + sistema.patrocinadoresCarrera(inscripcion.carrera), 20, 40);
    doc.text("Fecha: " + inscripcion.carrera.fecha.toLocaleDateString(), 20, 50);
    doc.text("Departamento: " + obtenerNombreDepartamento(inscripcion.carrera.departamento), 20, 60);
    doc.text("Corredor: " + inscripcion.corredor.nombre, 20, 70);
    doc.text("Cédula: " + inscripcion.corredor.cedula, 20, 80);
    doc.text("Edad: " + inscripcion.corredor.edad, 20, 90);
    doc.text("Tipo de corredor: " + inscripcion.corredor.tipoDeportista, 20, 100);

    doc.save("inscripcion_" + inscripcion.corredor.cedula + "_" + inscripcion.carrera.nombre + ".pdf");
}

