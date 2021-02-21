import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-acreedores-diversos',
  templateUrl: './acreedores-diversos.component.html',
  styleUrls: ['./acreedores-diversos.component.scss']
})
export class AcreedoresDiversosComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionado: any;
  itemSeleccionadoDeuda: any;
  itemSeleccionadoPago: any;
  itemSeleccionadoSaldo: any;
  columns: any;
  columns2: any;
  columns3: any;
  Deuda: Array<{DIA, CLIENTE, FOLIO, DESCRIPCION, IMPORTE, IVA}>;
  Pago: Array<{DIA, CLIENTE, FOLIO, TIPO, IMPORTE, IVA}>;
  Saldo: Array<{COMPRA, IVA, TOTAL}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.configuraDataGrid3();
    this.deuda();
    this.pago();
    this.saldo();
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
      header: ['DÍA', 'CLIENTE', 'FOLIO/REMISIÓN-FACTURA', '', 'IMPORTE DE LA COMPRA', 'IVA'],
      field: ['DIA', 'CLIENTE', 'FOLIO', 'DESCRIPCION', 'IMPORTE', 'IVA'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 6,
      header: ['DÍA', 'CLIENTE', 'FOLIO/REMISIÓN-FACTURA', 'FORMA DE PAGO', 'IMPORTE COBRADO (SIN IVA)', 'IVA'],
      field: ['DIA', 'CLIENTE', 'FOLIO', 'TIPO', 'IMPORTE', 'IVA'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  configuraDataGrid3(): void {
    let configGrid3 = {
      columns: 3,
      header: ['DE LA COMPRA', 'DEL IVA', 'TOTAL POR PAGAR'],
      field: ['COMPRA', 'IVA', 'TOTAL'],

    };

    this.columns3 = this.funcGenerales.aplicaConfigGrid3(configGrid3);
  }

  deuda(){
    this.Deuda = [
      {DIA:'1 Julio', CLIENTE:'Pepe', FOLIO:'N-28', DESCRIPCION:'', IMPORTE:'$500.00', IVA:''},
      {DIA:'24', CLIENTE:'LODEMO', FOLIO:'454', DESCRIPCION:'Gasolina', IMPORTE:'$1,200.00', IVA:''}
    ]
  }

  pago(){
    this.Pago = [
      {DIA:'', CLIENTE:'', FOLIO:'', TIPO:'', IMPORTE:'', IVA:''}
    ]
  }

  saldo(){
    this.Saldo = [
      {COMPRA:'$1,700.00', IVA:'', TOTAL:'$1,700.00'}
    ]
  }

}
