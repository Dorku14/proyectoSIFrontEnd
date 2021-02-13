import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-nomina-destajo',
  templateUrl: './nomina-destajo.component.html',
  styleUrls: ['./nomina-destajo.component.scss']
})
export class NominaDestajoComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionado: any;
  columns: any;
  columns2: any;
  Destajo: Array<{ORDEN, IMPORTE}>;
  Pago: Array<{ORDEN, FOLIO, COBRANZA, IMPORTE, SALDO}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.destajo();
    this.pago();
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
      columns: 2,
      header: ['ORDEN DE PRODUCCIÓN', 'IMPORTE'],
      field: ['ORDEN', 'IMPORTE'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 6,
      header: ['ORDEN DE PRODUCCIÓN', 'FOLIO/REMISION-FACTURA', 'FORMA DE COBRANZA', '', 'IMPORTE PAGADO', 'SALDO POR PAGAR'],
      field: ['ORDEN', 'FOLIO', 'COBRANZA','', 'IMPORTE', 'SALDO'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  destajo(){
    this.Destajo = [
      {ORDEN: 'PR-1', IMPORTE: 170.00},
      {ORDEN: 'PR-001', IMPORTE: 79.50},
      {ORDEN: 'PR-3', IMPORTE: 150.00}
    ]
  }

  pago(){
    this.Pago = [
      {ORDEN:'', FOLIO:'', COBRANZA:'', IMPORTE:'', SALDO: 170.00},
      {ORDEN:'', FOLIO:'', COBRANZA:'', IMPORTE:'', SALDO: 149.50},
      {ORDEN:'', FOLIO:'', COBRANZA:'', IMPORTE:'', SALDO: 399.50}

    ]
  }
}
