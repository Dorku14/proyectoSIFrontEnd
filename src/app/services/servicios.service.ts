import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ServiciosService {
    CODIGO: string;
    ACTIVIDAD: string;
    PRECIO_VENT: any;
    PRECIO_VENT_ACT: any;
    PAGO_EMPLEADO: any;
    ESTATUS: string;

    incicializarVariables() {
        this.CODIGO = '';
        this.ACTIVIDAD = '';
        this.PRECIO_VENT = 0;
        this.PRECIO_VENT_ACT = 0;
        this.PAGO_EMPLEADO = 0;
        this.ESTATUS = '';
    }

    llenarCampos(datos){
        this.CODIGO = datos.CODIGO;
        this.ACTIVIDAD = datos.ACTIVIDAD;
        this.PRECIO_VENT = datos.PRECIO_VENT;
        this.PRECIO_VENT_ACT = datos.PRECIO_VENT_ACT;
        this.PAGO_EMPLEADO = datos.PAGO_EMPLEADO;
    }
}
