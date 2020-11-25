import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {
    NOMBRE: string;


    incicializarVariables() {
        this.NOMBRE = '';

    }

    llenarCampos(datos){
        this.NOMBRE = datos.NOMBRE;
       
    }
}