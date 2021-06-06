import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultasBaseComponent } from '../consultas-base/consultas-base.component';
import { adminEmpresasService } from '../services/adminEmpresas.service';
import { MODO } from '../sharedModules/constantes';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { parametrosDeSistema } from '../sharedModules/parametrosDeSistemas';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import EmpresaJson from './../services/empresasJson.json'
import { DetalleAdminEmpresaComponent } from './detalle-admin-empresa/detalle-admin-empresa.component';
@Component({
  selector: 'app-administrador-app',
  templateUrl: './administrador-app.component.html',
  styleUrls: ['../consultas-base/consultas-base.component.scss']
})
export class AdministradorAppComponent extends ConsultasBaseComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  Nombrecatalogo: any;
  constructor(public peticiones: PeticionesWebComponent,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog, public AdminService: adminEmpresasService, private parametrosSistema: parametrosDeSistema) {
    super(funcGenerales, dialog, peticiones);
    this.isCargando = false;
    this.Nombrecatalogo = 'Administrador de la aplicación';
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
    this.funcGenerales.pausa(2000).then(() => {
      this.dataSource = this.parametrosSistema.perfiles;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        debugger
        if (num % 2 == 0) {
          i.Estatus = "verified"
        } else {
          i.Estatus = "cancel"
        }
      }
      this.quitarCargando();
    });
    // this.peticiones.peticionPost({}, 'consultaManoDeObra').then((resultado: any) => {
    //   (resultado);
    //   this.dataSource = resultado;
    //   let num = 0;
    //   for (let i of this.dataSource) {
    //     num += 1;
    //     i.NUM = num;
    //     i.COSTO = this.funcGenerales.dameFormatoMoneda(i.COSTO, 2);
    //   }

    //   this.quitarCargando();
    // }).catch((error) => {
    //   (error);
    //   this.isCargando = false;
    //   this.quitarCargando();
    // });
  }

  /**
    *\brief   Función para configurar el grid
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    02/11/20
    *\version	1.00.00
  */
  configuraDataGrid(): void {
    let configGrid = {
      columns: 7,
      header: ['#', 'Empresa', 'Fecha del próximo pago','Fecha del último pago','Tipo de Membresia', 'Email', 'Telefono', "Estatus"],
      field: ['NUM', 'Empresa', 'Fecha_Proximo_Pago','Ultimo_fecha_pago','Tipo_Membresia', 'Email', 'Telefono', "Estatus"],

    };
    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  agregar() {
    this.ventanaDetalle(MODO.ALTA);
  }

  modificar() {
    this.ventanaDetalle(MODO.MODIFICAR);
  }
  validaColumnaEstatus(col) {
    if (col === 'Estatus') {
      return 'Icono'
    } else {
      return 'Texto'
    }
  }

  validaClaseCss(dato) {
    if (dato === 'verified') {
      return "iconoSuccess";
    } else {
      return "iconoCancel";
    }
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
    var height = '50';

    const dialogRef = this.dialog.open(DetalleAdminEmpresaComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
        item: this.itemSeleccionado,
        nextIndex: this.dataSource.length + 1
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        if (!this.funcGenerales.EsVacioNulo(result)) {
          this.mostrarCargado()
          if (Modo === MODO.ALTA) {
            this.dataSource.push(result);
          } else if (Modo === MODO.MODIFICAR) {
            let itemAmodificar = this.dataSource.findIndex(e => e.NUM === result.NUM);
            this.dataSource[itemAmodificar] = result;
          }
          this.quitarCargando();
        }

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
    this.funcGenerales.limpiarMensajes();
    this.funcGenerales.mensajeConfirmacion('confirm', 'warn', 'Confirmación', '¿Seguro que deseas eliminar la empresa\"' + this.itemSeleccionado.Empresa + "\"?", true);
  }

  Confirmar() {
    this.funcGenerales.limpiarMensajes();
    this.mostrarCargado();
    let itemAeliminar = this.dataSource.findIndex(e => e.NUM ===this.itemSeleccionado.NUM);
    this.dataSource.splice(itemAeliminar,1);
    this.quitarCargando();
  }

  Cancelar() {
    this.funcGenerales.limpiarMensajes();
  }
}
