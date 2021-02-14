import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';
import { ProductosComercialesComponent } from '../productos-comerciales/productos-comerciales.component';
import { MODO } from '../sharedModules/constantes';
import { ConsultaBaseGeneral } from '../sharedModules/consultaBase';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { DetalleProveedoresComponent } from './detalle-proveedores/detalle-proveedores.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: '../consultas-base/consultas-base.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})
export class ProveedoresComponent extends ConsultasBaseComponent implements OnInit {

  constructor(public peticiones: PeticionesWebComponent, public funcGenerales: FuncionesGenerales, public dialog: MatDialog) {
    super(funcGenerales, dialog,peticiones);
    this.Nombrecatalogo = 'Proveedores'
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
    this.peticiones.peticionPost({}, 'consultaProveedores').then((resultado: any) => {
      (resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.PERZONALIDAD_FISICA = this.funcGenerales.formatoPerzonalidadFisica(i.PERZONALIDAD_FISICA);
        i.ESTATUS = this.funcGenerales.formateaEstatus(i.ESTATUS);
        // i.PRECIOVENT = this.funcGenerales.dameFormatoMoneda(i.PRECIOVENT, 2);
        // i.COSTACT = this.funcGenerales.dameFormatoMoneda(i.COSTACT, 2);
        // i.PRECIO_VENTA_ACT = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENTA_ACT, 2);
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
      columns: 9,
      header: ['Código proveedor', 'Perzonalidad física', 'Razón social', 'Apellido paterno', 'Correo del contacto', 'Correo del proveedor', 'Celular del proveedor', 'Telefono de oficina', 'Estado'],
      field: ['CODIGO', 'PERZONALIDAD_FISICA', 'RAZON_SOCIAL', 'APELLIDO_P', 'CORREO', 'P_CORREO', 'P_CELULAR', 'P_TEL_OFICINA', 'ESTATUS'],

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
    var width = '75vh';
    var height = '50vh';

    const dialogRef = this.dialog.open(DetalleProveedoresComponent, {
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
    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el proveedor con el código \"' + this.itemSeleccionado.CODIGO + "\" ?'", 'Si', 'No').then((respuesta) => {

      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json.CODIGO = this.itemSeleccionado.CODIGO;
        this.peticiones.peticionPost(json, 'eliminarProveedores').then((resultado: any) => {
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
