import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-credito-clientes',
  templateUrl: './credito-clientes.component.html',
  styleUrls: ['./credito-clientes.component.scss']
})
export class CreditoClientesComponent implements OnInit {

  constructor(public funcGenerales: FuncionesGenerales) { }

  dataSource: Array<any>;
  itemSeleccionado: any;
  columns: any;
  columns2: any;
  columns3: any;
  Cobrar: Array<{DIA, CLIENTE, FOLIO, IMPORTE, IVA}>;
  Cobradas: Array<{CLIENTE, FOLIO, COBRANZA, IMPORTE, IVA}>;
  Saldo: Array<{VENTA, IVA, TOTAL}>;

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.configuraDataGrid3();
    this.cobrar();
    this.cobradas();
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
      header: ['DÍA', 'CLIENTE', 'FOLIO/REMISION-FACTURA', 'IMPORTE DE LA VENTA (SIN IVA)', 'IVA'],
      field: ['DIA', 'CLIENTE', 'FOLIO', 'IMPORTE', 'IVA'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 5,
      header: ['CLIENTE', 'FOLIO/REMISION-FACTURA', 'FORMA DE COBRANZA', 'IMPORTE COBRADO (SIN IVA)', 'IVA'],
      field: ['CLIENTE', 'FOLIO', 'COBRANZA', 'IMPORTE', 'IVA'],
  
    };
  
    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  configuraDataGrid3(): void {
    let configGrid3 = {
      columns: 3,
      header: ['DE LA VENTA', 'Provisión IVA', 'TOTAL POR COBRAR'],
      field: ['VENTA', 'IVA', 'TOTAL'],
  
    };
  
    this.columns3 = this.funcGenerales.aplicaConfigGrid3(configGrid3);
  }

  cobrar(){
    this.Cobrar = [
      {DIA: 22, CLIENTE: 'JJ', FOLIO: 'FV-22', IMPORTE: 1000.00, IVA: 160.00}
    ]
  }

  cobradas(){
    this.Cobradas = [
      {CLIENTE: '-', FOLIO: '-', COBRANZA: '-', IMPORTE: '-', IVA: '-'}
    ]
  }

  saldo(){
    this.Saldo = [
      {VENTA: 1000.00, IVA: 160.00, TOTAL: 1160.00}
    ]
  }

}
