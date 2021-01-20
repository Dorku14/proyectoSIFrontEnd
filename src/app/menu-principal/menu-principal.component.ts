import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NombreComponente, clasesEstilos } from './../sharedModules/constantes'
import { MenuItem, } from 'primeng/api';
import { MatMenu } from '@angular/material/menu';
import { ComponentType } from '@angular/cdk/portal';
import { DatosTiendaComponent } from '../datos-tienda/datos-tienda.component';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  @ViewChild('Codigo', { static: false }) Codigomenu: MatMenu;
  showFiller = false;
  opcionesMenu: { PADRE: number; ID: number, DESCRIPCION: string, ICONO: string, ICONO_DISABLED: string, SELECTED: boolean, TEMPLATE: string }[];
  icono: string;
  componente: string;
  NombresComponetes = NombreComponente;
  itemsMenu: MenuItem[];
  opcionPrincipal: number;
  opcionesMenuPadre: { ID: number, DESCRIPCION: string }[];

  constructor(private funcGenerales:FuncionesGenerales, public dialog: MatDialog) {
    this.icono = 'menu'
    this.componente = NombreComponente.PRODCOMERCIAL
    this.opcionPrincipal = 1;
  }

  ngOnInit(): void {
    this.armaOpciones();
    this.menuPrueba();
  }

  /**
   *\brief   Función que controla los estilos de las opciones del menú lateral
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  cambiarEstilocss(item) {
    let clase: string;
    if (this.componente === item.TEMPLATE) {
      clase = clasesEstilos.Activo;
    } else {
      clase = clasesEstilos.noActivo;
    }
    return clase;
  }

  cambiarEstiloscssOpcionPrincipal(item: { ID: number, DESCRIPCION: string }) {
    let clase: any;
    if (this.opcionPrincipal === item.ID) {
      clase = clasesEstilos.Activo;
    } else {
      clase = clasesEstilos.noActivo;
    }
    return clase;
  }

  /**
   *\brief   Función para cerrar el menú lateral y que define que componente se está eligiendo
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */

  elegirVista(Vista) {
    this.drawer.close();
    this.componente = Vista;
    let opcion = this.opcionesMenu.find(item => item.TEMPLATE === Vista);
    this.opcionPrincipal = opcion.PADRE;
    this.configurarVentana(Vista);

  }

  /**
   *\brief   Función para crear las opciones del menú lateral
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  armaOpciones(): void {

    this.opcionesMenu = [
      {
        PADRE: 1,
        ID: 2,
        DESCRIPCION: 'Producto comercial',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: true,
        TEMPLATE: NombreComponente.PRODCOMERCIAL

      }, {
        PADRE: 1,
        ID: 3,
        DESCRIPCION: 'Servicios',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.SERVICIOS
      }, {
        PADRE: 1,
        ID: 4,
        DESCRIPCION: 'Productos fabricados',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.PRODFABRICADOS
      }, {
        PADRE: 1,
        ID: 5,
        DESCRIPCION: 'Materias primas',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.MATERIAPRIMA
      }, {
        PADRE: 1,
        ID: 6,
        DESCRIPCION: 'Mano de obra',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.MANOSDOBRA
      }, {
        PADRE: 1,
        ID: 7,
        DESCRIPCION: 'Categoría',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.CATEGORIA
      }, {
        PADRE: 1,
        ID: 8,
        DESCRIPCION: 'Unidad de medida',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.UNIDADDMEDIDA
      },// segudo menu
      {
        PADRE: 2,
        ID: 9,
        DESCRIPCION: 'Aisgnar materias primas',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.ASIGNARMATERIASP
      },
      {// tercer menu
        PADRE: 3,
        ID: 10,
        DESCRIPCION: 'Impuestos',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.IMPUESTOS
      }, {// tercer menu
        PADRE: 4,
        ID: 11,
        DESCRIPCION: 'Compras',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.COMPRAS
      }, {// cuarto menu
        PADRE: 4,
        ID: 11,
        DESCRIPCION: 'Ventas',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.VENTAS
      }, {// quinto menu
        PADRE: 5,
        ID: 12,
        DESCRIPCION: 'Lista de clientes',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.CLIENTES
      }, {// sexto menu
        PADRE: 6,
        ID: 13,
        DESCRIPCION: 'Lista de proveedores',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.PROVEEDORES
      }, {// septimop menu
        PADRE: 7,
        ID: 145,
        DESCRIPCION: 'Cuentas',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.CUENTAS
      }, {// septimop menu
        PADRE: 7,
        ID: 146,
        DESCRIPCION: 'Datos de la tienda',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.DATOSTIENDA
      }];
    this.opcionesMenuPadre = [{
      ID: 1,
      DESCRIPCION: 'Catálogos'
    }, {
      ID: 2,
      DESCRIPCION: 'Producción'
    }, {
      ID: 3,
      DESCRIPCION: 'Impuestos'
    }, {
      ID: 4,
      DESCRIPCION: 'Movimientos'
    }, {
      ID: 5,
      DESCRIPCION: 'Clientes'
    },
    {
      ID: 6,
      DESCRIPCION: 'Proveedores'
    },{
      ID: 7,
      DESCRIPCION: 'Configuración del sistema'
    }]
  }

  menuPrueba() {
    this.itemsMenu = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }
  cambiarEstiloBtnPrin(vista) {
    this.opcionPrincipal = vista;
  }

  configurarVentana(vista){
    let configVentana:{componente:any;width:string;height:string,data:any} = {componente:"",width:"",height:"",data:""};
    switch(vista){
      case NombreComponente.DATOSTIENDA:
        configVentana.componente = DatosTiendaComponent;
        configVentana.width = '90vh';
        configVentana.height = '75vh';
      break;

    }

    if(!this.funcGenerales.EsVacioNulo(configVentana.componente) && !this.funcGenerales.EsVacioNulo(configVentana.width) && !this.funcGenerales.EsVacioNulo(configVentana.height)){
      this.abrirVentana(configVentana);
    }
  }


  abrirVentana(configuracion:{componente:any;width:string;height:string,data:any}){
    let datosAenviar = this.funcGenerales.EsVacioNulo(configuracion.data) ? "" : configuracion.data;

    const dialogRef = this.dialog.open(configuracion.componente, {
      disableClose: true,
      width: configuracion.width,
      height: configuracion.height,
      data: datosAenviar
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {


      });
    });
  }

}
