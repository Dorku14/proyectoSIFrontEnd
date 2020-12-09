import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FuncionesGenerales } from '../funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { DetalleProductoFabricadoComponent } from 'src/app/producto-fabricado/detalle-producto-fabricado/detalle-producto-fabricado.component';
import { DetalleComprasComponent } from 'src/app/compras/detalle-compras/detalle-compras.component';
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
  isCargando: boolean;
  anchoAlta: any;
  altoAlta: any;
  btnAgregar:boolean = true;
  constructor(public funcGenerales: FuncionesGenerales,
    public dialogRef: MatDialogRef<BusquedasComponent>,
    public peticiones: PeticionesWebComponent,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,) { }

  ngOnInit(): void {
    this.TituloVentana = this.data.TituloVentana;
    this.anchoAlta = this.data.anchoAlta;
    this.altoAlta = this.data.altoAlta;
    if(this.data.componenteAlta){
      this.btnAgregar=false
    }
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
    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }
  CerrarVentana() {
    this.dialogRef.close();
  }

  agregar() {
    let componente:ComponentType<unknown> = this.data.componenteAlta;
    let modo = this.data.modo;
    this.ventanaAlta(componente,modo);
  }

  registroSeleccionado() {
    let datos = { itemSeleccionado: this.itemSeleccionado, idGrid: this.data.idGrid };
    this.dialogRef.close(datos);
  }

  agregarRegistro() {

  }

  ventanaAlta(Componente: ComponentType<unknown>, Modo) {
    var width = this.anchoAlta;
    var height = this.altoAlta;

    const dialogRef = this.dialog.open(Componente, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        this.consulta(this.data.nombreConsulta);
      });
    });
  }

  /**
   *\brief   Función que activa el componente cargando
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  /**
   *\brief   Función que desactiva el componente cargando
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }


  consulta(nombreServicio) {
    this.mostrarCargado();
    this.peticiones.peticionPost({}, nombreServicio).then((resultado: any) => {
      this.dataSource = resultado;
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.isCargando = false;
      this.quitarCargando();
    });
  }
}
