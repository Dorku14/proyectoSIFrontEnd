import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-prestamo-recibido',
  templateUrl: './prestamo-recibido.component.html',
  styleUrls: ['./prestamo-recibido.component.scss']
})
export class PrestamoRecibidoComponent implements OnInit {
  dataSource: Array<any>;
  itemSeleccionadoRecibido: any;
  itemSeleccionadoPagado: any;
  columns: any;
  columns2: any;
  Recibido: Array<{DIA, FOLIO, RECBIDO, PROVEEDOR, ASIGNACION, PLAZO, IMPORTE}>;
  Pagado: Array<{DIA, PAGADO, CLIENTE, FOLIO, DESCRIPCION, PAGO, SALDO}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.recibido();
    this.pagado();
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
      header: ['DÍA', 'FOLIO', 'RECIBIDO EN', 'PROVEEDOR', 'ASIGNACIÓN CONSECUTIVA', 'PLAZO', 'IMPORTE'],
      field: ['DIA', 'FOLIO', 'RECBIDO', 'PROVEEDOR', 'ASIGNACION', 'PLAZO', 'IMPORTE'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 7,
      header: ['DÍA', 'PAGADO CON', 'CLIENTE', 'FOLIO', 'DESCRIPCIÓN', 'PAGO DE PRESTAMO', 'SALDO'],
      field: ['DIA', 'PAGADO', 'CLIENTE', 'FOLIO', 'DESCRIPCION', 'PAGO', 'SALDO'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  recibido(){
    this.Recibido = [
      {DIA:24, FOLIO:'1247', RECBIDO:'EFECTIVO', PROVEEDOR:'BANAMEX', ASIGNACION:'CRÉDITO 1', PLAZO:'CORTO PLAZO', IMPORTE:'$1,000.00'},
      {DIA:24, FOLIO:'0458', RECBIDO:'BANCO', PROVEEDOR:'BANAMEX', ASIGNACION:'CRÉDITO 2', PLAZO:'LARGO PLAZO', IMPORTE:'$1,000.00'}
    ]
  }

  pagado(){
    this.Pagado = [
      {DIA:'', PAGADO:'', CLIENTE:'', FOLIO:'', DESCRIPCION:'', PAGO:'', SALDO:''}
    ]
  }

}
