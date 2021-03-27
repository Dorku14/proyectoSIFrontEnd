import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NombreComponente, clasesEstilos, TIPOUSARIO } from './../sharedModules/constantes'
import { MenuItem, } from 'primeng/api';
import { MatMenu } from '@angular/material/menu';
import { ComponentType } from '@angular/cdk/portal';
import { DatosTiendaComponent } from '../datos-tienda/datos-tienda.component';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { MatDialog } from '@angular/material/dialog';
import { parametrosDeSistema } from '../../app/sharedModules/parametrosDeSistemas';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  @ViewChild('Codigo', { static: false }) Codigomenu: MatMenu;

  showFiller = false;
  opcionesMenu: { PADRE: number; ID: number, DESCRIPCION: string, ICONO: string, ICONO_DISABLED: string, SELECTED: boolean, TEMPLATE: string, visible: boolean }[];
  icono: string;
  componente: string;
  NombresComponetes = NombreComponente;
  TIPOUSUARIOS = TIPOUSARIO;
  itemsMenu: MenuItem[];
  opcionPrincipal: number;
  opcionesMenuPadre: { ID: number, DESCRIPCION: string, visible: boolean }[];
  NivelUsuario: string;
  permisoAdmin: boolean;
  // parametrosSistema:parametrosDeSistema;
  constructor(private funcGenerales: FuncionesGenerales, public dialog: MatDialog, private peticiones: PeticionesWebComponent, private cookieService: CookieService, private parametrosSistema: parametrosDeSistema) {
    this.icono = 'menu'
    this.componente = NombreComponente.INICIO
    this.opcionPrincipal = 0;



  }

  ngOnInit(): void {
    this.parametrosSistema.consultaltaUsuarios().then(()=>{

      this.NivelUsuario = this.parametrosSistema.getDatosUsuario();
      // this.NivelUsuario = TIPOUSARIO.ADMINISTRADOR;
      if (this.NivelUsuario === TIPOUSARIO.ADMINISTRADOR) {
        this.permisoAdmin = true;
      } else {
        this.permisoAdmin = false;
      }
      this.armaOpciones();
      this.menuPrueba();
    });

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
        PADRE: 0,
        ID: 15,
        DESCRIPCION: 'Inicio',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.INICIO
      },
      {
        PADRE: 0,
        ID: 151,
        DESCRIPCION: 'Captura',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.CAPTURA
      },
      {
        PADRE: 1,
        ID: 2,
        DESCRIPCION: 'Producto comercial',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: true,
        visible: true,
        TEMPLATE: NombreComponente.PRODCOMERCIAL

      }, {
        PADRE: 1,
        ID: 3,
        DESCRIPCION: 'Servicios',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.SERVICIOS
      }, {
        PADRE: 1,
        ID: 4,
        DESCRIPCION: 'Productos fabricados',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.PRODFABRICADOS
      }, {
        PADRE: 1,
        ID: 5,
        DESCRIPCION: 'Materias primas',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.MATERIAPRIMA
      }, {
        PADRE: 1,
        ID: 6,
        DESCRIPCION: 'Mano de obra',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.MANOSDOBRA
      }, {
        PADRE: 1,
        ID: 7,
        DESCRIPCION: 'Categoría',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.CATEGORIA
      }, {
        PADRE: 1,
        ID: 8,
        DESCRIPCION: 'Unidad de medida',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.UNIDADDMEDIDA
      },// segudo menu
      {
        PADRE: 2,
        ID: 9,
        DESCRIPCION: 'Aisgnar materias primas',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.ASIGNARMATERIASP
      },
      {// tercer menu
        PADRE: 3,
        ID: 10,
        DESCRIPCION: 'Impuestos',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.IMPUESTOS
      }, {// tercer menu
        PADRE: 4,
        ID: 11,
        DESCRIPCION: 'Compras',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.COMPRAS
      }, {// cuarto menu
        PADRE: 4,
        ID: 11,
        DESCRIPCION: 'Ventas',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.VENTAS
      }, {// quinto menu
        PADRE: 5,
        ID: 12,
        DESCRIPCION: 'Lista de clientes',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.CLIENTES
      }, {// sexto menu
        PADRE: 6,
        ID: 13,
        DESCRIPCION: 'Lista de proveedores',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.PROVEEDORES
      }, {// septimop menu
        PADRE: 7,
        ID: 145,
        DESCRIPCION: 'Cuentas bancarias',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.CUENTAS
      }, {// septimop menu
        PADRE: 7,
        ID: 146,
        DESCRIPCION: 'Datos de la tienda',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.DATOSTIENDA
      }, {// septimop menu
        PADRE: 7,
        ID: 146,
        DESCRIPCION: 'Administracion de usuarios',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: this.permisoAdmin,
        TEMPLATE: NombreComponente.ADMINISTRARUSDUARIOS
      }, {// EXTRA
        PADRE: 8,
        ID: 16,
        DESCRIPCION: 'Caja',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.CAJA
      }, {// EXTRA
        PADRE: 11,
        ID: 20,
        DESCRIPCION: 'BANCOS',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.BANCOS
      }, {// EXTRA
        PADRE: 121,
        ID: 211,
        DESCRIPCION: 'Balance Inicial',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.BALANCEINICIAL
      }];
    this.opcionesMenuPadre = [
      {
        ID: 0,
        DESCRIPCION: 'Inicio',
        visible : true
      },{
      ID: 1,
      DESCRIPCION: 'Catálogos',
      visible: true
    }, {
      ID: 2,
      DESCRIPCION: 'Producción',
      visible: true
    }, {
      ID: 3,
      DESCRIPCION: 'Impuestos',
      visible: true
    }, {
      ID: 4,
      DESCRIPCION: 'Movimientos',
      visible: true
    }, {
      ID: 5,
      DESCRIPCION: 'Clientes',
      visible: true
    },
    {
      ID: 6,
      DESCRIPCION: 'Proveedores',
      visible: true
    }, {
      ID: 7,
      DESCRIPCION: 'Configuración del sistema',
      visible: this.permisoAdmin
    }, {//EXTRA
      ID: 8,
      DESCRIPCION: 'Caja',
      visible: true
    }, {//EXTRA
      ID: 11,
      DESCRIPCION: 'Bancos',
      visible: true
    },  {//EXTRA
      ID: 121,
      DESCRIPCION: 'Balance Inicial',
      visible: true
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

  configurarVentana(vista) {
    let configVentana: { componente: any; width: string; height: string, data: any } = { componente: "", width: "", height: "", data: "" };
    switch (vista) {
      case NombreComponente.DATOSTIENDA:
        configVentana.componente = DatosTiendaComponent;
        configVentana.width = '90vh';
        configVentana.height = '75vh';
        break;

    }

    if (!this.funcGenerales.EsVacioNulo(configVentana.componente) && !this.funcGenerales.EsVacioNulo(configVentana.width) && !this.funcGenerales.EsVacioNulo(configVentana.height)) {
      this.abrirVentana(configVentana);
    }
  }


  abrirVentana(configuracion: { componente: any; width: string; height: string, data: any }) {
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
