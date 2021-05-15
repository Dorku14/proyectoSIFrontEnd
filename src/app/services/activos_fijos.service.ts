import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class activosfijosService {
    ID: Number;
    ID_CAT_AF: Number;
    NOMBRE_AF: String;
    UNIDADES: Number;
    COSTO_UNIDAD: Number;
    ESTATUS: String;

    incicializarVariables() {
        this.ID = 0;
        this.ID_CAT_AF = 0;
        this.NOMBRE_AF = '';
        this.UNIDADES = 0;
        this.COSTO_UNIDAD = 0;
        this.ESTATUS = '';
    }

    llenarCampos(datos: activosfijosService) {
        this.ID = datos.ID;
        this.ID_CAT_AF = datos.ID_CAT_AF;
        this.NOMBRE_AF = datos.NOMBRE_AF;
        this.UNIDADES = datos.UNIDADES;
        this.COSTO_UNIDAD = datos.COSTO_UNIDAD;
        this.ESTATUS = datos.ESTATUS;
    }

}