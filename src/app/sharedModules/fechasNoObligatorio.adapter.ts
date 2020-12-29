import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
@Injectable({
  providedIn: 'root'
})
//Esta clase es para los campos en donde la fecha no es obligatoria
//Es decir se puede borrar y no pondra la fecha de hoy por defecto
export class FechasNoObligatorio extends NativeDateAdapter {

     /**
    *\brief     parse
    *\detail    Parsea la fecha ingresada, este evento se dispara cada vez que se hace una modificación en el input
    *\author    Sergio Antonio Chan Samos
    *\date      24/01/2020
    *\version	1.00.00
    */
   parse(value: any): Date | null
   {
       let fecha:Date
       value = value.replace(/_/gi, "");
       if(value === '//')//Se borro la fecha, no hacer nada
       return null;

       if ((typeof value === 'string') && (value.indexOf('/') > -1)) //Es cadena y tiene diagonales como fecha
       {
           const str = value.split('/'); //Despedaza la fecha
           const year = Number(str[2]);
           const month = Number(str[1]) - 1;
           const date = Number(str[0]);
           if(isNaN(year) || isNaN(month) || isNaN(date))//Es una cadena que no pertenece a una fecha
               return null;//fecha = this.today()//new Date()
           else
               fecha = new Date(year, Number(this._to2digit(month)), Number(this._to2digit(date)));//agrega el formato correcto
           return fecha
       }
       if (typeof value === 'string')//Es una cadena que no pertenece a una fecha, por defecto se devuelve la fecha de hoy
       {
           //return this.today()
           return null;
       }
       const timestamp = typeof value === 'number' ? value : Date.parse(value);// por si es valor timestamp
       return isNaN(timestamp) ? null : new Date(timestamp);
   }

   /**
   *\brief     format
   *\detail    Cuando el input pierde el foco, se dispara este evento para formatear la fecha parseada en el evente parse
   *\author    Sergio Antonio Chan Samos
   *\date      24/01/2020
   *\version	1.00.00
   */
  format(date: Date, displayFormat: string): string
  {
      if (displayFormat == "input") {
         let day = date.getDate();
         let month = date.getMonth() + 1;
         let year = date.getFullYear();
         return this._to2digit(day) + '/' + this._to2digit(month) + '/' + this._to4digit(year);
      } else if (displayFormat == "inputMonth") {
         let month = date.getMonth() + 1;
         let year = date.getFullYear();
         return  this._to2digit(month) + '/' + year;
      } else {
          return date.toDateString();
      }
  }

  private _to2digit(n: number) {
      return ('00' + n).slice(-2);
  }

  private _to4digit(n: number) {
   return ('0000' + n).slice(-4);
   }
}

export const APP_DATE_FORMATS =
{
   parse: {
       dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
   },
   display: {
       dateInput: 'input',
       monthYearLabel: 'inputMonth',
       dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
       monthYearA11yLabel: {year: 'numeric', month: 'long'},
   }
}
