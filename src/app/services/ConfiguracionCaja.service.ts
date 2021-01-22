import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracionCajaService {
    MONTO_MINIMO: number;
    CANTIDAD_RECOLECCION: number;
    POSICION_VIDEOS: string;
    RUTA_AYUDA: string;
    TIEMPO_ESPERA: number;
  
    incicializarVariables() {
      this.MONTO_MINIMO = 0;
      this.CANTIDAD_RECOLECCION = 0;
      this.POSICION_VIDEOS = '';
      this.RUTA_AYUDA = '';
      this.TIEMPO_ESPERA = 0;
    }
  
    llenarCampos(datos: ConfiguracionCajaService) {
      this.MONTO_MINIMO = datos.MONTO_MINIMO;
      this.CANTIDAD_RECOLECCION = datos.CANTIDAD_RECOLECCION;
      this.POSICION_VIDEOS = datos.POSICION_VIDEOS;
      this.RUTA_AYUDA = datos.RUTA_AYUDA;
      this.TIEMPO_ESPERA = datos.TIEMPO_ESPERA;
    }
  
    dameJsonEntrada() {
      let json = {
        MONTO_MINIMO: this.MONTO_MINIMO,
        CANTIDAD_RECOLECCION: this.CANTIDAD_RECOLECCION,
        POSICION_VIDEOS: this.POSICION_VIDEOS,
        RUTA_AYUDA: this.RUTA_AYUDA,
        TIEMPO_ESPERA: this.TIEMPO_ESPERA,
      }
  
      return json;
    };
  }