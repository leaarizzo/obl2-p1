window.addEventListener("load", inicio);
let sistema = new sistema();

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
        /*
        sistema.eliminarPatrocinador(nombre);
        sistema.agregarPatrocinador(new Patrocinador(nombre, rubro, carreraApoyo));
        */
    }
}

function agregarCorredor() {
    if (document.getElementById("idFormCorredores").reportValidity()) {
        let nombre = document.getElementById("idNombreCorredor").value;
        let edad = document.getElementById("idEdadCorredor").value;
        let cedula = document.getElementById("idCedulaCorredor").value;
        let vencimientoFicha = document.getElementById("idFechaFicha").value;
        let vencimientoFichaObjeto = new Date(vencimientoFicha);
        let tipoDeportista = document.getElementsByName("tipoCorredor");

        if (sistema.corredorUnica(cedula)) {
            sistema.agregarCorredor(new Corredor(nombre, edad, cedula, vencimientoFichaObjeto, tipoDeportista));
            document.getElementById("idFormCorredor").reset();
        }
        else {
            alert("¡El corredor ya existe!")
        }

    }
}

function inscribir(){
    if (document.getElementById("idFormInscribir").reportValidity()){
        let corredorCI = document.getElementById("idCorredoresInscribir").value;
        let carreraNombre = document.getElementById("idCarrerasInscribir").value;
        let corredorObjeto = sistema.buscarCorredor(corredorCI);
        let carreraObjeto = sistema.buscarCarrera(carreraNombre);
        if (carreraObjeto.tieneCupo() && corredorObjeto.vencimientoFicha - carreraObjeto.fecha > 0){
            if (sistema.inscripcionUnica(corredorCI, carreraNombre)) {
                sistema.agregarInscripcion(new Inscripcion(corredorObjeto, carreraObjeto));
                carreraObjeto.agregarInscripto(corredorObjeto);
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