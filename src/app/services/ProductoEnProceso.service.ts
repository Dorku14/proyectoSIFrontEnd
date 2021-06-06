import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductoEnProcesoService {
    ID_P: Number;
    FOLIO: String;
    UNIDADES: Number;
    VALOR_PRODUCCION: Number;

    incicializarVariables() {
        this.ID_P = 0;
        this.FOLIO = '';
        this.UNIDADES = 0;
        this.VALOR_PRODUCCION = 0;
    }

    llenarCampos(datos: ProductoEnProcesoService) {
        this.ID_P = datos.ID_P;
        this.FOLIO = datos.FOLIO;
        this.UNIDADES = datos.UNIDADES;
        this.VALOR_PRODUCCION = datos.VALOR_PRODUCCION;
    }

}
