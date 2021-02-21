import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-iva-por-pagar',
  templateUrl: './iva-por-pagar.component.html',
  styleUrls: ['./iva-por-pagar.component.scss']
})
export class IvaPorPagarComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionadoPago: any;
  itemSeleccionadoVentas: any;
  itemSeleccionadoIVA: any;
  columns: any;
  columns2: any;
  columns3: any;
  Ventas: Array<{DIA, PROVEEDOR, FOLIO, CONCEPTO, ENTRADA, GENERADO, COBRADO}>;
  Pago: Array<{DIA, CLIENTE, FOLIO, CONCEPTO, BLANK, PAGO}>;
  Iva: Array<{DIA, PAGAR, COBRAR}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.configuraDataGrid3();
    this.ventas();
    this.pago();
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
      columns: 7,
      header: ['DÍA', 'PROVEEDOR', 'FOLIO/ORDEN', 'CONCEPTO', 'ENTRADA', 'IVA GENERADO FACTURADO', 'IVA COBRADO'],
      field: ['DIA', 'PROVEEDOR', 'FOLIO', 'CONCEPTO', 'ENTRADA', 'GENERADO', 'COBRADO'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 6,
      header: ['DÍA', 'CLIENTE', 'FOLIO/REMISIÓN-FACTURA', 'CONCEPTO', '', 'PAGO O AJUSTE'],
      field: ['DIA', 'CLIENTE', 'FOLIO', 'CONCEPTO', 'BLANK', 'PAGO'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  configuraDataGrid3(): void {
    let configGrid3 = {
      columns: 3,
      header: ['DÍA', 'IVA POR PAGAR', ''],
      field: ['DIA', 'PAGAR', 'COBRAR'],

    };

    this.columns3 = this.funcGenerales.aplicaConfigGrid3(configGrid3);
  }

  ventas(){
    this.Ventas = [
      {DIA:11, PROVEEDOR:'JORGE', FOLIO:'F-11', CONCEPTO:'0', ENTRADA:'BANCO', GENERADO:'$305.28', COBRADO:'$305.28'},
      {DIA:20, PROVEEDOR:'CYNTHIA', FOLIO:'FV-020', CONCEPTO:'0', ENTRADA:'BANCO', GENERADO:'$160.00', COBRADO:'$160.00'},
      {DIA:20, PROVEEDOR:'CYNTHIA', FOLIO:'FV-020', CONCEPTO:'DEVOLUCIONES', ENTRADA:'EFECTIVO', GENERADO:'-$32.00', COBRADO:'-$32.00'},
      {DIA:20, PROVEEDOR:'JORGE', FOLIO:'F-11', CONCEPTO:'DEVOLUCIONES', ENTRADA:'EFECTIVO', GENERADO:'-$101.76', COBRADO:'-$101.76'},
      {DIA:21, PROVEEDOR:'JORGE', FOLIO:'FV-024', CONCEPTO:'0', ENTRADA:'BANCO', GENERADO:'$40.00', COBRADO:'$40.00'}
    ]
  }

  pago(){
    this.Pago = [
      {DIA:'', CLIENTE:'', FOLIO:'', CONCEPTO:'', BLANK:'', PAGO:''}
    ]
  }

  iva(){
    this.Iva = [
      {DIA:11, PAGAR:'$1,417.60', COBRAR:'-'},
      {DIA:19, PAGAR:'$1,370.01', COBRAR:'-$47.59'},
      {DIA:19, PAGAR:'$1,298.63', COBRAR:'-$118.97'},
      {DIA:20, PAGAR:'$1,274.84', COBRAR:'-$142.76'},
      {DIA:20, PAGAR:'$1,514.84', COBRAR:'-$142.76'}
    ]
  }

}
