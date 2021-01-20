import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

@Component({
  selector: 'app-datos-tienda',
  templateUrl: './datos-tienda.component.html',
  styleUrls: ['./../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss'],
})
export class DatosTiendaComponent implements OnInit {
  TituloVentana:string;
  isCargando:boolean;
  indiceTabsActivo:number = 0;
  constructor(public dialogRef: MatDialogRef<DatosTiendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private funcGenerales:FuncionesGenerales) {
      this.TituloVentana ="Datos de la tienda";
     }

  ngOnInit(): void {
  }

  CerrarVentana(){
    this.dialogRef.close();
  }

  guardar(){

  }

  tabsActivos=(indice :number)=>{
    return this.funcGenerales.tabsActivos(indice, this.indiceTabsActivo);
  }
}
