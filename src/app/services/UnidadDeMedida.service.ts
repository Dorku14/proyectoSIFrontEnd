import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UnidadDeMedidaService {
    NOMBRE: string;
    ABREVIACION:string;

    incicializarVariables() {
        this.NOMBRE = '';
        this.ABREVIACION = ''

    }

    llenarCampos(datos){
        this.NOMBRE = datos.NOMBRE;
        this.ABREVIACION = datos.ABREVIACION;

    }
}
