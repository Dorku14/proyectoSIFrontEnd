import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-impuestos-diversos',
  templateUrl: './impuestos-diversos.component.html',
  styleUrls: ['./impuestos-diversos.component.scss']
})
export class ImpuestosDiversosComponent implements OnInit {

  itemSeleccionadoImpuesto: any;
  columns: any;
  Impuesto: Array<{DIA, PERIODO, CONCEPTO, FOLIO, PAGADO, IMPORTE, IMPUESTOS}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
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
      header: ['DÍA', 'PERIODO', 'CONCEPTO ESPECÍFICO', 'FOLIO', 'PAGADO DESDE', 'IMPORTE', 'IMPUESTOS PAGADOS'],
      field: ['DIA', 'PERIODO', 'CONCEPTO', 'FOLIO', 'PAGADO', 'IMPORTE', 'IMPUESTOS'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  impuestos(){
    this.Impuesto = [
      {DIA:'', PERIODO:'', CONCEPTO:'', FOLIO:'', PAGADO:'', IMPORTE:'', IMPUESTOS:''}
    ]
  }

}
