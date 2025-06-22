class Carrera {
    constructor(nombre, departamento, fecha, cupoMax) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.fecha = fecha;
        this.cupoMax = cupoMax;
        this.inscriptos = [];
    }

    cupoDisponible() {
        return cupoDispoinible = this.cupoMax - this.inscriptos.length;
    }

    tieneCupo() {
        return this.cupoDisponible() > 0;
    }

    agregarInscripto(inscripto) {
        this.inscriptos.push(inscripto);
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
    }
}

class Sistema {
    constructor() {
        this.listaCarreras = [];
        this.listaCorredores = [];
        this.listaPatrocinadores = [];
        this.listaInscriptos = [];
    }

    agrergarCarrera(carrera) {
        this.listaCarreras.push(carrera);
    }

    agrergarCorredor(corredor) {
        this.listaCorredores.push(corredor);
    }

    agrergarPatrocinador(patrocinador) {
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
            if (nombrePatrocinador == this.listaPatrocinadores[i]) {
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
}
