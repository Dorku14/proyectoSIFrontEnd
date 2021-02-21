import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-activos-fijos',
  templateUrl: './activos-fijos.component.html',
  styleUrls: ['./activos-fijos.component.scss']
})
export class ActivosFijosComponent implements OnInit {

  dataSource: Array<any>;
  itemSeleccionado: any;
  itemSeleccionadoCompra: any;
  itemSeleccionadoVenta: any;
  columns: any;
  columns2: any;
  ActivoCompra: Array<{DIA, PROVEEDOR, FACTURA, ASIGNACION, DESCRIPCION, IMPORTE}>;
  ActivoVenta: Array<{DIA, CLIENTE, FACTURA, ASIGNACION, DESCRIPCION, IMPORTE, COSTO, GANANCIA}>;

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.activosCompras();
    this.activosVentas();
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
      header: ['Día', 'Proveedor', '# Factura/Remisión', 'Asignación', 'Descripción', 'Importe (Sin IVA)'],
      field: ['DIA', 'PROVEEDOR', 'FACTURA', 'ASIGNACION', 'DESCRIPCION', 'IMPORTE'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 8,
      header: ['Día', 'Cliente', '# Factura/Remisión', 'Asignación', 'Descripción', 'Importe De La Venta (Sin IVA)', 'Costo De Ventas', 'Ganancia'],
      field: ['DIA', 'CLIENTE', 'FACTURA', 'ASIGNACION', 'DESCRIPCION', 'IMPORTE', 'COSTO', 'GANANCIA'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  activosCompras(){
    this.ActivoCompra = [
      {DIA: '1 Julio', PROVEEDOR: 'Cyber Puerta', FACTURA: 'N-25', ASIGNACION: 'Pepe', DESCRIPCION: 'Equipo de computo', IMPORTE: '$1,500.00'}
    ]
  };

  activosVentas(){
    this.ActivoVenta = [
      {DIA:'2 Julio', CLIENTE: 'Cocos', FACTURA: 'Z-02', ASIGNACION: 'Margarita', DESCRIPCION: 'Equipo de computo', IMPORTE: '$2,000.00', COSTO: '$1,500.00', GANANCIA: '$500.00'}
    ]
  };

}
