import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-iva-acreditable',
  templateUrl: './iva-acreditable.component.html',
  styleUrls: ['./iva-acreditable.component.scss']
})
export class IvaAcreditableComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionadoCompras: any;
  itemSeleccionadoVentas: any;
  itemSeleccionadoIVA: any;
  columns: any;
  columns2: any;
  columns3: any;
  Compras: Array<{DIA, PROVEEDOR, FOLIO, CONCEPTO, SALIDA, IVA}>;
  Ventas: Array<{DIA, CLIENTE, FOLIO, UNIDADES, ENTRADA, PAGO}>;
  Iva: Array<{DIA, TOTAL, SALIDA}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.configuraDataGrid3();
    this.compras();
    this.ventas();
    this.iva();
  }

  formatoDatosTabla(columna) {
    if (columna == "NUM") {
      return "columnaNum";
    } else {
      return "";
    }
  }

  configuraDataGrid(): void {
    let configGrid = {
      columns: 6,
      header: ['DÍA', 'PROVEEDOR', 'FOLIO/ORDEN', 'CONCEPTO', 'SALIDA DE', 'IVA GENERADO FACTURA'],
      field: ['DIA', 'PROVEEDOR', 'FOLIO', 'CONCEPTO', 'SALIDA', 'IVA'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 6,
      header: ['DÍA', 'CLIENTE', 'FOLIO/REMISIÓN-FACTURA', 'UNIDADES VENDIDAS', 'ENTRADA EN', 'PAGO O AJUSTE'],
      field: ['DIA', 'CLIENTE', 'FOLIO', 'UNIDADES', 'ENTRADA', 'PAGO'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  configuraDataGrid3(): void {
    let configGrid3 = {
      columns: 3,
      header: ['DÍA', 'IVA ACREDITABLE', ''],
      field: ['DIA', 'TOTAL', 'SALIDA'],

    };

    this.columns3 = this.funcGenerales.aplicaConfigGrid3(configGrid3);
  }

  compras(){
    this.Compras = [
      {DIA:11, PROVEEDOR:'MAYORISTA', FOLIO:'F-25', CONCEPTO:'0', SALIDA:'EFECTIVO', IVA:'$1,417.60'},
      {DIA:19, PROVEEDOR:'MAYORISTA', FOLIO:'F-25', CONCEPTO:'DEVOLUCIONES', SALIDA:'BANCO', IVA:'-$47.59'},
      {DIA:19, PROVEEDOR:'MAYORISTA', FOLIO:'F-25', CONCEPTO:'DEVOLUCIONES', SALIDA:'BANCO', IVA:'-$71.38'},
      {DIA:20, PROVEEDOR:'MAYORISTA', FOLIO:'f-25', CONCEPTO:'DEVOLUCIONES', SALIDA:'BANCO', IVA:'-$23.79'},
      {DIA:20, PROVEEDOR:'LEVIS', FOLIO:'FC-020', CONCEPTO:'BANAMEX', SALIDA:'BANCO', IVA:'$240.00'}
    ]
  }

  ventas(){
    this.Ventas = [
      {DIA:'', CLIENTE:'', FOLIO:'', UNIDADES:'', ENTRADA:'', PAGO:''}
    ]
  }

  iva(){
    this.Iva = [
      {DIA:11, TOTAL:'$1,417.60', SALIDA:'-'},
      {DIA:19, TOTAL:'$1,370.01', SALIDA:'-$47.59'},
      {DIA:19, TOTAL:'$1,298.63', SALIDA:'-$118.97'},
      {DIA:20, TOTAL:'$1,274.84', SALIDA:'-$142.76'},
      {DIA:20, TOTAL:'$1,514.84', SALIDA:'-$142.76'}
    ]
  }

}
