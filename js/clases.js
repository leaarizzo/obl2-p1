/*
Autores: Leandro Rizzo (354610), Mateo Laporta (354622)
Grupo: m1d
Obligatorio Programación 1 - 1er semestre 2025
*/

class Carrera {
    constructor(nombre, departamento, fecha, cupoMax) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupoMax = cupoMax;
        this.inscriptos = [];
    }

    cupoDisponible() {
        return this.cupoMax - this.inscriptos.length;
    }

    tieneCupo() {
        return this.cupoDisponible() > 0;
    }

    agregarInscripto(inscripto) {
        this.inscriptos.push(inscripto);
    }

    compararPorFecha(otra) {
        return this.fecha - otra.fecha;
    }

}

class Corredor {
    constructor(nombre, edad, cedula, vencimientoFicha, tipoDeportista) {
        this.nombre = nombre;
        this.edad = edad;
        this.cedula = cedula;
        this.vencimientoFicha = vencimientoFicha;
        this.tipoDeportista = tipoDeportista;
    }
}

class Patrocinador {
    constructor(nombre, rubro, carreraApoyo) {
        this.nombre = nombre;
        this.rubro = rubro;
        this.carreraApoyo = carreraApoyo;
    }
}

class Inscripcion {
    constructor(corredor, carrera) {
        this.corredor = corredor;
        this.carrera = carrera;
        this.numero = 0;
    }

    agregarInscriptoNumero() {
        this.numero = this.carrera.inscriptos.length + 1;
    }
}

class Sistema {
    constructor() {
        this.listaCarreras = [];
        this.listaCorredores = [];
        this.listaPatrocinadores = [];
        this.listaInscriptos = [];
    }

    agregarCarrera(carrera) {
        this.listaCarreras.push(carrera);
    }

    agregarCorredor(corredor) {
        this.listaCorredores.push(corredor);
    }

    agregarPatrocinador(patrocinador) {
        this.listaPatrocinadores.push(patrocinador);
    }

    agregarInscriptos(inscripto) {
        this.listaInscriptos.push(inscripto);
    }

    corredorUnico(cedula) {
        let esUnico = true;
        for (let elemCI of this.listaCorredores) {
            if (cedula == elemCI.cedula) {
                esUnico = false;
            }
        }
        return esUnico;
    }

    carreraUnica(carreraNombre) {
        let esUnica = true;
        for (let elemCN of this.listaCarreras) {
            if (carreraNombre == elemCN.nombre) {
                esUnica = false;
            }
        }
        return esUnica;
    }

    inscripcionUnica(corredorCI, carreraNombre) {
        let esUnica = true;
        for (let elemIns of this.listaInscriptos) {
            if (elemIns.corredor.cedula == corredorCI && elemIns.carrera.nombre == carreraNombre) {
                esUnica = false;
            }
        }
        return esUnica;
    }

    eliminarPatrocinador(nombrePatrocinador) {
        for (let i = 0; i < this.listaPatrocinadores.length; i++) {
            if (nombrePatrocinador == this.listaPatrocinadores[i].nombre) {
                this.listaPatrocinadores.splice(i, 1);
                break;
            }
        }
    }

    buscarCorredor(corredorCI) {
        let corredorObjeto = null;
        for (let elemCI of this.listaCorredores) {
            if (elemCI.cedula == corredorCI) {
                corredorObjeto = elemCI;
            }
        }
        return corredorObjeto;
    }

    buscarCarrera(carreraNombre) {
        let carreraObjeto = null;
        for (let elemC of this.listaCarreras) {
            if (elemC.nombre == carreraNombre) {
                carreraObjeto = elemC;
            }
        }
        return carreraObjeto;
    }

    carrerasMasInscriptos() {
        let carreraMax = ["sin datos"];
        let maxInscriptos = 0;
        for (let elemCMI of this.listaCarreras) {
            if (elemCMI.inscriptos.length > maxInscriptos) {
                4
                maxInscriptos = elemCMI.inscriptos.length;
                carreraMax = [];
                carreraMax.push(elemCMI.nombre);
            } else if (elemCMI.inscriptos.length == maxInscriptos && maxInscriptos != 0) {
                carreraMax.push(elemCMI.nombre);
            }
        }
        return carreraMax;
    }

    promedioInscriptosPorCarrera() {
        let totalInscriptos = 0;
        let respuesta = "No hay carreras registradas";
        if (this.listaCarreras.length > 0) {
            for (let carrera of this.listaCarreras) {
                totalInscriptos += carrera.inscriptos.length;
            }
            respuesta = (totalInscriptos / this.listaCarreras.length).toFixed(2);
        }
        return respuesta;
    }


    carrerasVaciasPorFecha() {
        let carrerasVaciasOrdenadas = [];
        for (let carrera of this.listaCarreras) {
            if (carrera.inscriptos.length == 0) {
                carrerasVaciasOrdenadas.push(carrera);
            }
        }
        carrerasVaciasOrdenadas.sort(function (a, b) {
            return a.compararPorFecha(b);
        });
        return carrerasVaciasOrdenadas;
    }

    porcentajeElite() {
        let elite = 0;
        let total = this.listaCorredores.length;
        let respuesta = "No hay corredores registrados";
        for (let elemEl of this.listaCorredores) {
            if (elemEl.tipoDeportista == "elite") {
                elite++;
            }
        }

        if (total != 0) {
            respuesta = ((elite * 100) / total).toFixed(2);
        }

        return respuesta;
    }

}   
