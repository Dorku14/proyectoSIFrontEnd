import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from '../funcionesgenerales';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.scss']
})
export class BusquedasComponent implements OnInit {
  TituloVentana: string;
  columns: any;
  itemSeleccionado: any;
  dataSource: Array<any> = [];
  constructor(public funcGenerales: FuncionesGenerales,
    public dialogRef: MatDialogRef<BusquedasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit(): void {
    this.TituloVentana = this.data.TituloVentana;
    this.configuraDataGrid();
  }

  /**
   *\brief   Función para configurar el grid
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  configuraDataGrid(): void {
    this.dataSource = this.data.dataSource;
    let configGrid = this.data.configGrid;
    // let configGrid = {
    //   columns: 7,
    //   header: ['#', 'Código', 'Producto', 'Cantidad (Balance Inicial)', 'Precio de compra (Sin IVA)', 'Precio de venta (Sin IVA)', 'Costo actualizado',],
    //   field: ['NUM', 'CODIGO', 'PRODUCTO', 'CANTIDAD', 'PRECIOCOMP', 'PRECIOVENT', 'COSTACT'],

    // };
    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }
  CerrarVentana(){
    this.dialogRef.close();
  }

  registroSeleccionado(){
    let datos = {itemSeleccionado:this.itemSeleccionado, idGrid:this.data.idGrid};
    this.dialogRef.close(datos);
  }
}
