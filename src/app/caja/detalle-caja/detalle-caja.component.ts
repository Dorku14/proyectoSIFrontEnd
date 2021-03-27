import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-detalle-caja',
  templateUrl: './detalle-caja.component.html',
  styleUrls: ['./detalle-caja.component.scss']
})
export class DetalleCajaComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionado: any;
  columns: any;
  columns2: any;
  Info: Array<{}>;
  Saldo: Array<{ENTRADA, SALIDA, SALDO}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
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

  info(){
    this.Info = [
      {DIA: 11, CONCEPTO: 'COMPRAS',         FOLIO: 'F-25',   ASIGNACION: 'MAYORISTA', DESCRIPCION: '',             IMPORTE: 8860.00, CREDITO: '-', TIPO:'C'},
      {DIA: 11, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'F-25',   ASIGNACION: 'MAYORISTA', DESCRIPCION: '',             IMPORTE: 1417.60, CREDITO: '-', TIPO:'IA'},
      {DIA: 11, CONCEPTO: 'VENTAS',          FOLIO: 'F-11',   ASIGNACION: 'JORGE',     DESCRIPCION: '',             IMPORTE: 1908.00, CREDITO: '-', TIPO:'V'},
      {DIA: 11, CONCEPTO: 'IVA POR PAGAR',   FOLIO: 'F-11',   ASIGNACION: 'JORGE',     DESCRIPCION: '',             IMPORTE: 305.28,  CREDITO: '-', TIPO:'IP'},
      {DIA: 19, CONCEPTO: 'DEVOLUCIONES',    FOLIO: 'f-25',   ASIGNACION: 'MAYORISTA', DESCRIPCION: '',             IMPORTE: 297.42,  CREDITO: '-', TIPO:'D'},
      {DIA: 19, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'f-25',   ASIGNACION: 'MAYORISTA', DESCRIPCION: 'Devoluciones', IMPORTE: 47.59,   CREDITO: '-', TIPO:'IA'},
      {DIA: 20, CONCEPTO: 'DEVOLUCIONES',    FOLIO: 'f-25',   ASIGNACION: 'MAYORISTA', DESCRIPCION: '',             IMPORTE: 148.71,  CREDITO: '-', TIPO:'D'},
      {DIA: 20, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'f-25',   ASIGNACION: 'MAYORISTA', DESCRIPCION: 'Devoluciones', IMPORTE: 23.79,   CREDITO: '-', TIPO:'IA'},
      {DIA: 20, CONCEPTO: 'VENTAS',          FOLIO: 'FV-020', ASIGNACION: 'CYNTHIA',   DESCRIPCION: '',             IMPORTE: 1000.00, CREDITO: '-', TIPO:'V'},
      {DIA: 20, CONCEPTO: 'IVA POR PAGAR',   FOLIO: 'FV-020', ASIGNACION: 'CYNTHIA',   DESCRIPCION: '',             IMPORTE: 160,     CREDITO: '-', TIPO:'IP'}
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
}
