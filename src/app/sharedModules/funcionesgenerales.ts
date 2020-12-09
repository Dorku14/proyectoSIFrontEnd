
import { DecimalPipe } from '@angular/common';
import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionPopUpComponent } from './confirmacion-pop-up/confirmacion-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class FuncionesGenerales {
  constructor(public dialog: MatDialog) { }

  /**
*Devuelve true si el valor es -> undefined o null
*@param {string} valor La variable a verificar
*/
  EsNulo = valor => typeof (valor) == 'undefined' || valor == null || valor == undefined;

  /**
    *Devuelve true si el valor es vacio -> ''
    *@param {string} valor La variable a verificar
  */
  EsVacio = valor => /*valor == '' ||*/ typeof (valor) == 'string' && valor.match(/^ *$/);

  /**
    *Devuelve true si el valor es vacio, nulo o undefined
    *@param {string} valor La variable a verificar
  */
  EsVacioNulo = valor => this.EsNulo(valor) || this.EsVacio(valor);

  onCargando = () => {
    return true;
  }

  offCargando = () => {
    return false;
  }

  /**
    *\brief   aplica las propuedades del grid
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  aplicaConfigGrid(configGrid) {
    let columns = new Array();
    for (let i = 0; i < configGrid.columns; i++) {
      columns.push({
        header: configGrid.header[i],
        field: configGrid.field[i],
      });
    }

    return columns;
  }

  /**
  *\brief     muestra una ventana para confirmar
  *\detail    el componente cuenta con dos botones, en caso de darle a boton ok se retorna un true, en cancelar o NO se retorna un dalse
  *\author    Ing. Alexis Osvaldo Dorantes Ku
  *@param titulo -> titulo de la ventana
  @param mensaje -> mensaje de la ventana
  @param btnOk -> etiqueta del boton ok
  @param btnCancel -> etiqueta del boton cancelar
*/
  popUpAlerta(titulo: string, mensaje: string, btnOk: string, btnCancel: string) {
    var width = '25%';
    var height = '25%';
    const dialogRef = this.dialog.open(ConfirmacionPopUpComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        TituloVentana: titulo,
        Mensaje: mensaje,
        btnOK: btnOk,
        btnCancel: btnCancel
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    });
  }

  extraerCodigo(respuestaServidor) {
    let code = respuestaServidor.code;
    return code;
  }

  /**
  *\brief     ortorgaFoco.
  *\detail    Otorga el foco (focus) al elemento que tenga el nombre que es enviado como parametro, en la vista actual.
  *\author    Ing. Alexis Osvaldo Dorantes Ku
  *@param[in] campo -> Nombre (name) del elemento html.
*/
  otorgaFoco(campo: string) {
    let elmento = document.getElementsByName(campo);
    let child = elmento[0];
    child.focus();
  }

  /**
*\brief     retorna una cadena con ceros despues del punto decimal
*\author    Ing. Alexis Osvaldo Dorantes Ku
*@param valor -> Valor a convertir
*@param CantCeros -> cantidad de ceros
*/
  dameFormatoMoneda(valor, decimales) {


    valor += ''; // por si pasan un numero en vez de un string
    valor = parseFloat(valor.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimales = decimales || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(valor) || valor === 0)
      return "$" + parseFloat("0").toFixed(decimales);

    // si es mayor o menor que cero retorno el valor formateado como numero
    valor = '' + valor.toFixed(decimales);

    var amount_parts = valor.split('.'),
      regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return "$" + amount_parts.join('.');
  }

  /**
*\brief     retorna una cadena con ceros despues del punto decimal
*\author    Ing. Alexis Osvaldo Dorantes Ku
*@param valor -> Valor a convertir
*@param CantCeros -> cantidad de ceros
*/
  dameFormatoCantidad(valor, decimales) {

    valor += ''; // por si pasan un numero en vez de un string
    valor = parseFloat(valor.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimales = decimales || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(valor) || valor === 0)
      return parseFloat("0").toFixed(decimales);

    // si es mayor o menor que cero retorno el valor formateado como numero
    valor = '' + valor.toFixed(decimales);

    var amount_parts = valor.split('.'),
      regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
  }

  dameFormatoNumero=(valor)=> {
    // valor = valor.slice(1);
    valor = valor.match(/(\d)+.+/g);
    valor = valor[0];
    valor = valor.replace(/,/g, "");
    // valor = parseFloat(valor);
    return valor;
  }

  permiteNumerico(valor, valorEntrante) {
    let valida = isNaN(valorEntrante)
    if (valida) {
      if (valorEntrante === ".") {
        let buscar = valor.match(/\./g);
        if (!this.EsVacioNulo(buscar)) {
          if (buscar.length === 0) {
            return true;
          } else {
            if (buscar.length > 0) {
              return false;
            }

          }
        } else {
          return true;
        }
      } else {
        return false;
      }

    } else {
      return true;
    }
  }

  formatoTipoElemento(valor) {
    let valorFormateado: string;
    switch (valor) {
      case 'M':
        valorFormateado = 'Materia prima';
        break;
      case 'P':
        valorFormateado = 'Producto'
        break;
    }
    return valorFormateado;
  }

  formatoTipoDocto(valor) {
    let valorFormateado: string;
    switch (valor) {
      case 'RC':
        valorFormateado = 'Remisión';
        break;
      case 'FC':
        valorFormateado = 'Factura';
        break;
    }
    return valorFormateado;
  }

  formatoPago(valor) {
    let valorFormateado: string;
    switch (valor) {
      case 'B':
        valorFormateado = 'Banco';
        break;
      case 'C':
        valorFormateado = 'Crédito';
        break;
      case 'T':
        valorFormateado = 'Tarjeta';
        break;
      case 'E':
        valorFormateado = 'Efectivo';
        break;
    }
    return valorFormateado;
  }

  formatoTipoMov(valor) {
    let valorFormateado: string;
    switch (valor) {
      case 'C':
        valorFormateado = 'Compra';
        break;
      case 'V':
        valorFormateado = 'Venta';
        break;
    }
    return valorFormateado;
  }

  formatoPorcentaje(valor){
    return String(valor) + '%';
  }

  // mask = (valor)=> {
  //   // add logic to generate your mask array
  //   return [ /*your mask array*/ ]
  // }
}

