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
    constructor(nombre, rubro, carrerasApoyadas) {
        this.nombre = nombre;
        this.rubro = rubro;
        this.carrerasApoyadas = carrerasApoyadas;
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

    compararPorNombre(otro) {
        return this.corredor.nombre.localeCompare(otro.corredor.nombre);
    }


    compararPorNumero(otro) {
        return this.numero - otro.numero;
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
                break;
            }
        }
        return esUnico;
    }

    carreraUnica(carreraNombre) {
        let esUnica = true;
        for (let elemCN of this.listaCarreras) {
            if (carreraNombre == elemCN.nombre) {
                esUnica = false;
                break;
            }
        }
        return esUnica;
    }

    inscripcionUnica(corredorCI, carreraNombre) {
        let esUnica = true;
        for (let elemIns of this.listaInscriptos) {
            if (elemIns.corredor.cedula == corredorCI && elemIns.carrera.nombre == carreraNombre) {
                esUnica = false;
                break;
            }
        }
        return esUnica;
    }

    patrocinadorUnico(nombrePatrocinador) {
        let esUnico = true;
        for (let elemPN of this.listaPatrocinadores) {
            if (nombrePatrocinador == elemPN.nombre) {
                esUnico = false;
                break;
            }
        }
        return esUnico;
    }

    eliminarPatrocinador(nombrePatrocinador) {
        for (let i = 0; i < this.listaPatrocinadores.length; i++) {
            if (nombrePatrocinador == this.listaPatrocinadores[i].nombre) {
                this.listaPatrocinadores.splice(i, 1);
                break;
            }
        }
    }

    buscarPatrocinador(nombre) {
        let patrocinador = null;
        for (let elemPC of this.listaPatrocinadores) {
            if (elemPC.nombre == nombre) {
                patrocinador = elemPC;
                break;
            }
        }
        return patrocinador;
    }

    carrerasMasInscriptos() {
        let carreraMax = ["Sin datos"];
        let maxInscriptos = 0;
        for (let elemCMI of this.listaCarreras) {
            if (elemCMI.inscriptos.length > maxInscriptos) {
                maxInscriptos = elemCMI.inscriptos.length;
                carreraMax = [];
                carreraMax.push(elemCMI.nombre + " - " + elemCMI.inscriptos.length + " inscriptos");
            } else if (elemCMI.inscriptos.length == maxInscriptos && maxInscriptos != 0) {
                carreraMax.push(elemCMI.nombre + " - " + elemCMI.inscriptos.length + " inscriptos");
            }
        }
        return carreraMax;
    }

    promedioInscriptosPorCarrera() {
        let totalInscriptos = 0;
        let respuesta = "Sin datos";
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
        let nombreYFechaVacias = [];
        for (let carrera of this.listaCarreras) {
            if (carrera.inscriptos.length == 0) {
                carrerasVaciasOrdenadas.push(carrera);
            }
        }
        carrerasVaciasOrdenadas.sort(function (a, b) {
            return a.compararPorFecha(b);
        });

        for (let elemCVO of carrerasVaciasOrdenadas) {
            nombreYFechaVacias.push(elemCVO.nombre + " - " + elemCVO.fecha.toLocaleDateString());
        }

        if (carrerasVaciasOrdenadas.length == 0) {
            nombreYFechaVacias.push("Sin datos");
        }
        
        return nombreYFechaVacias;
    }

    porcentajeElite() {
        let elite = 0;
        let total = this.listaCorredores.length;
        let respuesta = "Sin datos";
        for (let elemEl of this.listaCorredores) {
            if (elemEl.tipoDeportista == "elite") {
                elite++;
            }
        }

        if (total != 0) {
            respuesta = ((elite * 100) / total).toFixed(2);
            respuesta += "%"
        }

        return respuesta;
    }

    ordenarInscriptosPorNombre(carrera) {

        let inscriptos = carrera.inscriptos.slice();
        inscriptos.sort(function (a, b) {
            return a.compararPorNombre(b);
        });

        return inscriptos;
    }

    ordenarInscriptosPorNumero(carrera) {

        let inscriptos = carrera.inscriptos.slice();
        inscriptos.sort(function (a, b) {
            return a.compararPorNumero(b);
        });

        return inscriptos;
    }

    compararArraysCarreras(arrayCarreraActual, arrayCarreraViejo) {
        let carreraActual = arrayCarreraActual.length;
        let carreraVieja = arrayCarreraViejo.length;
        let iguales = 0;
        if (carreraActual == carreraVieja) {
            for (let elemCA of arrayCarreraActual) {
                if (arrayCarreraViejo.includes(elemCA)) {
                    iguales++;
                } else {
                    break;
                }
            }
        }
        return iguales == carreraActual;
    }

}


