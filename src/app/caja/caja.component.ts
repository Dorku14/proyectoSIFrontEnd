import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionado: any;
  columns: any;
  columns2: any;
  columns3: any;
  columns4: any;
  Caja: Array<{DIA, CONCEPTO, FOLIO, ASIGNACION, DESCRIPCION, IMPORTE, CREDITO}>;
  Saldo: Array<{ENTRADA, SALIDA, SALDO}>;
  Entradas: Array<{CONCEPTO, TOTAL}>;
  Salidas: Array<{CONCEPTO, TOTAL}>;
  Detalle = true
  Valor = ''

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.configuraDataGrid3();
    this.configuraDataGrid4();
    this.caja();
    this.saldo();
    this.entradas();
    this.salidas();
  }

  formatoDatosTabla(columna){
    if(columna == "NUM"){
      return "columnaNum";
    }else{
      return "";
    }
  }

  configuraDataGrid(): void {
    let configGrid = {
      columns: 7,
      header: ['DÍA', 'CONCEPTO GENERAL','FOLIO', 'ASIGNACIÓN', 'DESCRIPCIÓN', 'IMPORTE ORIGEN', 'CRÉDITO'],
      field: ['DIA', 'CONCEPTO', 'FOLIO', 'ASIGNACION', 'DESCRIPCION', 'IMPORTE', 'CREDITO'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 3,
      header: ['ENTRADA DE EFECTIVO', 'SALIDA DE EFECTIVO', 'SALDO DE EFECTIVO'],
      field: ['ENTRADA', 'SALIDA', 'SALDO'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  configuraDataGrid3(): void {
    let configGrid3 = {
      columns: 2,
      header: ['CONCEPTO', 'IMPORTE TOTAL'],
      field: ['CONCEPTO', 'TOTAL'],

    };

    this.columns3 = this.funcGenerales.aplicaConfigGrid3(configGrid3);
  }

  configuraDataGrid4(): void {
    let configGrid4 = {
      columns: 2,
      header: ['CONCEPTO', 'IMPORTE TOTAL'],
      field: ['CONCEPTO', 'TOTAL'],

    };

    this.columns4 = this.funcGenerales.aplicaConfigGrid4(configGrid4);
  }

  entradas(){
    this.Entradas = [
      {CONCEPTO: 'IVA ACREDITABLE', TOTAL: 1417.60},
      {CONCEPTO: 'VENTAS', TOTAL: 1908.00}
    ]
  }

  salidas(){
    this.Salidas = [
      {CONCEPTO: 'COMPRAS', TOTAL: 8860.00},
      {CONCEPTO: 'IVA POR PAGAR', TOTAL: 305.28},
      {CONCEPTO: 'DEVOLUCIONES', TOTAL: 297.42}
    ]
  }

  caja(){
    this.Caja = [
      {DIA: 11, CONCEPTO: 'COMPRAS', FOLIO: 'F-25', ASIGNACION: 'MAYORISTA', DESCRIPCION: '', IMPORTE: 8860.00, CREDITO: '-'},
      {DIA: 11, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'F-25', ASIGNACION: 'MAYORISTA', DESCRIPCION: '', IMPORTE: 1417.60, CREDITO: '-'},
      {DIA: 11, CONCEPTO: 'VENTAS', FOLIO: 'F-11', ASIGNACION: 'JORGE', DESCRIPCION: '', IMPORTE: 1908.00, CREDITO: '-'},
      {DIA: 11, CONCEPTO: 'IVA POR PAGAR', FOLIO: 'F-11', ASIGNACION: 'JORGE', DESCRIPCION: '', IMPORTE: 305.28, CREDITO: '-'},
      {DIA: 19, CONCEPTO: 'DEVOLUCIONES', FOLIO: 'f-25', ASIGNACION: 'MAYORISTA', DESCRIPCION: '', IMPORTE: 297.42, CREDITO: '-'},
      {DIA: 19, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'f-25', ASIGNACION: 'MAYORISTA', DESCRIPCION: 'Devoluciones', IMPORTE: 47.59, CREDITO: '-'},
      {DIA: 20, CONCEPTO: 'DEVOLUCIONES', FOLIO: 'f-25', ASIGNACION: 'MAYORISTA', DESCRIPCION: '', IMPORTE: 148.71, CREDITO: '-'},
      {DIA: 20, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'f-25', ASIGNACION: 'MAYORISTA', DESCRIPCION: 'Devoluciones', IMPORTE: 23.79, CREDITO: '-'},
      {DIA: 20, CONCEPTO: 'VENTAS', FOLIO: 'FV-020', ASIGNACION: 'CYNTHIA', DESCRIPCION: '', IMPORTE: 1000.00, CREDITO: '-'},
      {DIA: 20, CONCEPTO: 'IVA POR PAGAR', FOLIO: 'FV-020', ASIGNACION: 'CYNTHIA', DESCRIPCION: '', IMPORTE: 160, CREDITO: '-'}
    ]
  }
  
  saldo(){
    this.Saldo = [
      {ENTRADA: '', SALIDA: 8860.00, SALDO: 1140.00},
      {ENTRADA: '', SALIDA: 1417.60, SALDO: -277.60},
      {ENTRADA: 1908.00, SALIDA: '', SALDO: 1630.40},
      {ENTRADA: 305.28, SALIDA: '', SALDO: 1935.68},
      {ENTRADA: 297.42, SALIDA: '', SALDO: 2233.10},
      {ENTRADA: 47.59, SALIDA: '', SALDO: 2280.69},
      {ENTRADA: 148.71, SALIDA: '', SALDO: 2429.40},
      {ENTRADA: 23.70, SALIDA: '', SALDO: 2453.19},
      {ENTRADA: 1000.00, SALIDA: '', SALDO: 3453.19},
      {ENTRADA: 160.00, SALIDA: '', SALDO: 3613.19}
    ]
  }

  cambiar(val: string){
    if(this.Valor != val) {
      this.Detalle = false
      this.Valor = val
    }
    else if(this.Valor = val){
      this.Detalle = true
      this.Valor = ''
    }
  }

}
