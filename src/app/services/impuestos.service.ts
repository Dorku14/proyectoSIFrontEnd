import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ImpuestosService {
    NOMBRE: string;
    PORCENTAJE: any;
    incicializarVariables() {
        this.NOMBRE = '';
        this.PORCENTAJE = '';
    }

    llenarCampos(datos){
        this.NOMBRE = datos.NOMBRE;
        this.PORCENTAJE = datos.PORCENTAJE;


    }
}
