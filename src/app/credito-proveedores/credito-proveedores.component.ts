import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-credito-proveedores',
  templateUrl: './credito-proveedores.component.html',
  styleUrls: ['./credito-proveedores.component.scss']
})
export class CreditoProveedoresComponent implements OnInit {

  constructor(public funcGenerales: FuncionesGenerales) { }

  dataSource: Array<any>;
  itemSeleccionado: any;
  columns: any;
  columns2: any;
  columns3: any;
  Deuda: Array<{DIA, PROVEEDOR, FOLIO, IMPORTE, IVA}>;
  Pago: Array<{PROVEEDOR, FOLIO, PAGO, IMPORTE, IVA}>;
  Saldo: Array<{COMPRA, IVA, TOTAL}>;

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.configuraDataGrid3();
    this.deuda();
    this.pago();
    this.saldo();
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
      columns: 5,
      header: ['DÍA', 'PROVEEDOR', 'FOLIO/REMISION-FACTURA', 'IMPORTE DE LA COMPRA (SIN IVA)', 'IVA'],
      field: ['DIA', 'PROVEEDOR', 'FOLIO', 'IMPORTE', 'IVA'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 5,
      header: ['PROVEEDOR', 'FOLIO/REMISION-FACTURA', 'FORMA DE PAGO', 'IMPORTE COBRADO (SIN IVA)', 'IVA'],
      field: ['PROVEEDOR', 'FOLIO', 'PAGO', 'IMPORTE', 'IVA'],
  
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
      {DIA: 22, PROVEEDOR: 'gg', FOLIO: 'fv25', IMPORTE: 1200.00, IVA: 192.00}
    ]
  }

  pago(){
    this.Pago = [
      {PROVEEDOR: '', FOLIO: '', PAGO: '', IMPORTE: '', IVA: ''}
    ]
  }

  saldo(){
    this.Saldo = [
      {COMPRA: 1200.00, IVA: 192.00, TOTAL: 1392.00}
    ]
  }

}
