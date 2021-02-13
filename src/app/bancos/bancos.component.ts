import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionado: any;
  columns: any;
  columns2: any;
  Bancos: Array<{DIA, CONCEPTO, FOLIO, ASIGNACION, BANCO, IMPORTE, CREDITO}>;
  Especifico: Array<{BANCO, CUENTA, SALDO}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.bancos();
    this.especifico();
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
      header: ['DÍA', 'CONCEPTO GENERAL','ASIGNACIÓN', 'BANCO', 'IMPORTE ORIGEN', 'CRÉDITO'],
      field: ['DIA', 'CONCEPTO', 'ASIGNACION', 'BANCO', 'IMPORTE', 'CREDITO'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 3,
      header: ['BANCO', 'CUENTA', 'SALDO EN BANCO'],
      field: ['BANCO', 'CUENTA', 'SALDO'],
  
    };
  
    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  bancos(){
    this.Bancos = [
      {DIA: 19, CONCEPTO: 'DEVOLUCIONES', FOLIO: 'F-25', ASIGNACION: 'MAYORISTA', BANCO: 'BANAMEX', IMPORTE: '$446.13', CREDITO: ''},
      {DIA: 19, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'F-25', ASIGNACION: 'MAYORISTA', BANCO: 'Devoluciones', IMPORTE: '$71.38', CREDITO: ''},
      {DIA: 20, CONCEPTO: 'COMPRAS', FOLIO: 'FC-020', ASIGNACION: 'LEVIS', BANCO: 'BANAMEX', IMPORTE: '$1,500.00', CREDITO: ''},
      {DIA: 20, CONCEPTO: 'IVA ACERDITABLE', FOLIO: 'FC-020', ASIGNACION: 'LEVIS', BANCO: 'BANAMEX', IMPORTE: '$240.00', CREDITO: ''},
      {DIA: 21, CONCEPTO: 'COMPRAS', FOLIO: 'FC-020', ASIGNACION: 'JORGE', BANCO: 'BANAMEX', IMPORTE: '$1,200.00', CREDITO: ''},
      {DIA: 21, CONCEPTO: 'IVA ACREDITABLE', FOLIO: 'FC-020', ASIGNACION: 'JORGE', BANCO: 'BANAMEX', IMPORTE: '$192.00', CREDITO: ''},
      {DIA: 24, CONCEPTO: 'PRÉSTAMO RECIBIDO', FOLIO: '0458', ASIGNACION: 'BANAMEX', BANCO: 'CRÉDITO 2', IMPORTE: '$1,000.00', CREDITO: ''},
      {DIA: 25, CONCEPTO: 'GASTOS INDIRECTOS', FOLIO: 'F78', ASIGNACION: 'CFE', BANCO: '', IMPORTE: '$1,000.00', CREDITO: 'FALSO'},
      {DIA: 25, CONCEPTO: 'GASTOS INDIRECTOS', FOLIO: 'f45', ASIGNACION: 'IODEMO', BANCO: '', IMPORTE: '$1,000.00', CREDITO: 'FALSO'},
      {DIA: 25, CONCEPTO: 'NÓMINA INDIRECTA', FOLIO: 'JUNIO', ASIGNACION: 'VARIAS', BANCO: '', IMPORTE: '$500.00', CREDITO: 'FALSO'}
    ]
  }

  especifico(){
    this.Especifico = [
      {BANCO: 'SANTANDER', CUENTA: '314', SALDO: '$1,000.00'}
    ]
  }

}
