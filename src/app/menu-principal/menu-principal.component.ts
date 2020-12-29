import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NombreComponente, clasesEstilos } from './../sharedModules/constantes'
import { MenuItem } from 'primeng/api';
import { MatMenu } from '@angular/material/menu';
@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  @ViewChild('Codigo',{static:false}) Codigomenu: MatMenu;
  showFiller = false;
  opcionesMenu: { PADRE: number; ID: number, DESCRIPCION: string, ICONO: string, ICONO_DISABLED: string, SELECTED: boolean, TEMPLATE: string }[];
  icono: string;
  componente: string;
  NombresComponetes = NombreComponente;
  itemsMenu: MenuItem[];
  opcionPrincipal: number;
  opcionesMenuPadre: {ID:number,DESCRIPCION: string}[];
  constructor() {
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
    let clase: any;
    if (this.componente === item.TEMPLATE) {
      clase = clasesEstilos.Activo;
    } else {
      clase = clasesEstilos.noActivo;
    }
    return clase;
  }

  cambiarEstiloscssOpcionPrincipal(item: {ID:number,DESCRIPCION: string}) {
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
      },{// cuarto menu
        PADRE: 5,
        ID: 12,
        DESCRIPCION: 'Lista de clientes',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        TEMPLATE: NombreComponente.CLIENTES
      }];
     this.opcionesMenuPadre = [{
      ID:1,
      DESCRIPCION:'Catálogos'
     },{
       ID:2,
       DESCRIPCION: 'Producción'
     },{
      ID:3,
      DESCRIPCION: 'Impuestos'
    },{
      ID:4,
      DESCRIPCION: 'Movimientos'
    },{
      ID:5,
      DESCRIPCION: 'Clientes'
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


}
