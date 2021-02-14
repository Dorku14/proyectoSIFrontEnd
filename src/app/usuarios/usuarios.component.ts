import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { MODO } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: '../consultas-base/consultas-base.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})

export class UsuariosComponent extends ConsultasBaseComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  @ViewChild('dt') table: Table;
  ocultarBTNEliminar:boolean = false;
  Nombrecatalogo:any;
  constructor(public peticiones: PeticionesWebComponent,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    super( funcGenerales,dialog,peticiones);
    this.isCargando = false;
    this.Nombrecatalogo = 'Usuarios';
  }

  ngOnInit(): void {
    this.configuraDataGrid();
    setTimeout(() => {
      this.consulta();
    }, 100);
  }

  /**
   *\brief   Función para realiza la consulta al servidor y agrega los datos al datasource de la tabla
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  consulta() {
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaUsuario').then((resultado: any) => {
      (resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.created_at = this.funcGenerales.dameFechaString(new Date(i.created_at));
        i.ESTATUS = this.funcGenerales.formateaEstatus(i.ESTATUS);
        i.TIPO_USUARIO = this.funcGenerales.formatoTipoUsuario(i.TIPO_USUARIO);
      }
      this.quitarCargando();
    }).catch((error) => {
      (error);
      this.isCargando = false;
      this.quitarCargando();
    });
  }

  /**
    *\brief   Función para configurar el grid
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  configuraDataGrid(): void {
    let configGrid = {
      columns: 8,
      header: ['#', 'Nombre','Apellido paterno','Apellido materno', 'Usuario',"Tipo de usuario",'Estatus',"Creado el"],
      field: ['NUM', 'NOMBRE', 'APELLIDO_P', 'APELLIDO_M', 'USUARIO','TIPO_USUARIO',"ESTATUS","created_at"],

    };
    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }



   /**
    *\brief   Función que invoca el componente detalle y ponerlo en modo alta
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
   agregar() {
    this.ventanaDetalle(MODO.ALTA);
  }

  /**
    *\brief   Funciónque invoca el detalle y ponerlo en modo modificar
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  modificar() {
    this.ventanaDetalle(MODO.MODIFICAR);

  }

   /**
    *\brief   Función que invoca la ventana del detalle
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
    @param[in] -> el modo en el que se comportará la ventana
  */
  ventanaDetalle(Modo) {
    var width = '70vh';
    var height = '45vh';

    const dialogRef = this.dialog.open(DetalleUsuariosComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
        item: this.itemSeleccionado
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        (result)
        this.consulta();
      });
    });
  }

 /**
    *\brief   Función para eliminar un registro
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  eliminar() {
    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.CODIGO + "\" ?'", 'Si', 'No').then((respuesta) => {

      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json.CODIGO = this.itemSeleccionado.CODIGO;
        this.peticiones.peticionPost(json, 'eliminarrProductoC').then((resultado: any) => {
          this.consulta();
          this.quitarCargando();
        }).catch((error) => {
          (error);
          this.quitarCargando();
        });
      }
    });
  }
}
