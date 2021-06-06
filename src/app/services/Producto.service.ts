import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
    CODIGO: String;
    NOMBRE: String;

    incicializarVariables() {
        this.CODIGO = '';
        this.NOMBRE = '';
    }

    llenarCampos(datos: ProductoService) {
        this.CODIGO = datos.CODIGO;
        this.NOMBRE = datos.NOMBRE;
    }

}
