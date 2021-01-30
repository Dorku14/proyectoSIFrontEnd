import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';
import { ProductosComercialesComponent } from '../productos-comerciales/productos-comerciales.component';
import { MODO } from '../sharedModules/constantes';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { DetalleCuentasComponent } from './detalle-cuentas/detalle-cuentas.component';


@Component({
  selector: 'app-cuentas',
  templateUrl: '../consultas-base/consultas-base.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})
export class CuentasComponent extends ConsultasBaseComponent implements OnInit {

  constructor(public peticiones: PeticionesWebComponent, public funcGenerales: FuncionesGenerales, public dialog: MatDialog) {
    super(funcGenerales, dialog, peticiones);
    this.Nombrecatalogo = 'Cuentas'
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
    this.peticiones.peticionPost({}, 'consultaCuentas').then((resultado: any) => {
      console.log(resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.PROPIEDAD =  i.PROPIEDAD == 'P' ? 'Proveedor' :'Mio';
        i.ESTATUS = this.funcGenerales.formateaEstatus(i.ESTATUS);
        // i.PRECIOVENT = this.funcGenerales.dameFormatoMoneda(i.PRECIOVENT, 2);
        // i.COSTACT = this.funcGenerales.dameFormatoMoneda(i.COSTACT, 2);
        // i.PRECIO_VENTA_ACT = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENTA_ACT, 2);
      }
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
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
      columns: 5,
      header: ['número de cuenta', 'Propiedad', 'Clave del proveedor', 'Nombre del banco', 'Estatus'],
      field: ['NUMERO_CTA', 'PROPIEDAD', 'ID_PROVEEDOR', 'BANCO', 'ESTATUS'],

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

    const dialogRef = this.dialog.open(DetalleCuentasComponent, {
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
        console.log(result)
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
    this.funcGenerales.mensajeConfirmacion('c', 'warn', '¿Estas seguro?', 'Confirmar', true);

    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar la cuenta \"' + this.itemSeleccionado.NUMERO_CTA + "\" ?'", 'Si', 'No').then((respuesta) => {
      debugger
      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json = this.itemSeleccionado;
        this.peticiones.peticionPost(json, 'eliminarCuentas').then((resultado: any) => {
          this.consulta();
          this.quitarCargando();
        }).catch((error) => {
          console.log(error);
          this.quitarCargando();
        });
      }
    });
  }
}
