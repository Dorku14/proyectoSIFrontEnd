import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-prestamo-otorgado',
  templateUrl: './prestamo-otorgado.component.html',
  styleUrls: ['./prestamo-otorgado.component.scss']
})
export class PrestamoOtorgadoComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionadoOtorgado: any;
  itemSeleccionadoCobrado: any;
  columns: any;
  columns2: any;
  Otorgado: Array<{DIA, DEUDOR, FOLIO, CREDITO, OTORGADO, IMPORTE}>;
  Cobrado: Array<{DIA, DEUDOR, FOLIO, CREDITO, COBRADO, COSTO, SALDO}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.otorgado();
    this.cobrado();
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
      header: ['DÍA', 'DEUDOR', 'No. CONTRATO/FOLIO', 'No. DE CRÉDITO', 'OROTGADO EN', 'IMPORTE OTORGADO'],
      field: ['DIA', 'DEUDOR', 'FOLIO', 'CREDITO', 'OTORGADO', 'IMPORTE'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 7,
      header: ['DÍA', 'DEUDOR', 'No. CONTRATO/FOLIO', 'No. DE CRÉDITO', 'COBRANDO EN', 'COSTO DE VENTAS', 'SALDO'],
      field: ['DIA', 'DEUDOR', 'FOLIO', 'CREDITO', 'COBRADO', 'COSTO', 'SALDO'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  otorgado(){
    this.Otorgado = [
      {DIA:24, DEUDOR:'HH', FOLIO:'0485', CREDITO:'CRÉDITO 1', OTORGADO:'EFECTIVO', IMPORTE:'$500.00'}
    ]
  }

  cobrado(){
    this.Cobrado = [
      {DIA:'', DEUDOR:'', FOLIO:'', CREDITO:'', COBRADO:'', COSTO:'', SALDO:''}
    ]
  }

}
