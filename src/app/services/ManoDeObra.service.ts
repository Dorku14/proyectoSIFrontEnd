import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ManoDeObraService {
    CODIGO: string;
    ACTIVIDAD: string;
    UNIDAD_MEDIDA: string;
    COSTO:any;

    incicializarVariables() {
        this.CODIGO = '';
        this.UNIDAD_MEDIDA = '';
        this.ACTIVIDAD = '';
        this.COSTO = 0;
    }

    llenarCampos(datos){
        this.CODIGO = datos.CODIGO;
        this.UNIDAD_MEDIDA = datos.UNIDAD_MEDIDA;
        this.ACTIVIDAD = datos.ACTIVIDAD;
        this.COSTO = datos.COSTO;

    }
}
