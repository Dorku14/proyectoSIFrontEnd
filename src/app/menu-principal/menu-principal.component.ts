import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NombreComponente, clasesEstilos, TIPOUSARIO } from './../sharedModules/constantes'
import { MenuItem, } from 'primeng/api';
import { MatMenu } from '@angular/material/menu';
import { DatosTiendaComponent } from '../datos-tienda/datos-tienda.component';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { MatDialog } from '@angular/material/dialog';
import { parametrosDeSistema } from '../../app/sharedModules/parametrosDeSistemas';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { VentanaPagoComponent } from '../ventana-pago/ventana-pago.component';

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
  verApp = false;
  expirar: any;
  // parametrosSistema:parametrosDeSistema;
  constructor(private funcGenerales: FuncionesGenerales, 
    public dialog: MatDialog, private peticiones: PeticionesWebComponent, 
    private cookieService: CookieService, private parametrosSistema: parametrosDeSistema, 
    private router: Router) {
    this.icono = 'menu'
    this.componente = NombreComponente.INICIO
    this.opcionPrincipal = 0;
    this.tiempoExpiracion();



  }

  ngOnInit(): void {
    this.parametrosSistema.consultaltaUsuarios().then(() => {

      this.NivelUsuario = this.parametrosSistema.getDatosUsuario();
      // this.NivelUsuario = TIPOUSARIO.ADMINISTRADOR;
      if (this.NivelUsuario === TIPOUSARIO.ADMINISTRADOR) {
        this.permisoAdmin = true;
      } else {
        this.permisoAdmin = false;
      }
      this.armaOpciones();
      this.menuPrueba();
      this.verApp = true;
      let fecha = this.parametrosSistema.perfil.Fecha_Proximo_Pago;
      var dateParts = fecha.split("/");

      // month is 0-based, that's why we need dataParts[1] - 1
      var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      var fechaValidad = {
        dia: dateObject.getDay(),
        mes: dateObject.getMonth(),
        anio: dateObject.getFullYear()
      }

      let hoyDate = {
        dia: new Date().getDay(),
        mes: new Date().getMonth(),
        anio: new Date().getFullYear()
      };
      setTimeout(() => {
        if(fechaValidad.anio === hoyDate.anio){
          if(fechaValidad.mes === hoyDate.mes){
            if(fechaValidad.dia === hoyDate.dia){
              this.funcGenerales.mensajeConfirmacion('pagar_membresia',"warn",
              "Cuenta pronto a expirar","Por favor realice su pago antes que pierda los beneficios",true);
            }
          }
        }
      }, 1000);


    }
    );

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
      }, {
        PADRE: 12,
        ID: 69,
        DESCRIPCION: 'Administración de la app',
        ICONO: '',
        ICONO_DISABLED: '',
        SELECTED: false,
        visible: true,
        TEMPLATE: NombreComponente.ADMINISTRACIONAPP
      }];
    this.opcionesMenuPadre = [
      {
        ID: 0,
        DESCRIPCION: 'Inicio',
        visible: true
      }, {
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
      }, {//EXTRA
        ID: 121,
        DESCRIPCION: 'Balance Inicial',
        visible: true
      }, {
        ID: 12,
        DESCRIPCION: 'Administración de la aplicación',
        visible: this.permisoAdmin
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

  pruebaConexion() {
    // let t = {t:this.cookieService.get("idSession")};
    // this.peticiones.peticionPost(t,'EstadoSesion',false).then((resultado:any)=>{
    //   console.log(resultado);
    //   if(resultado.code === '050'){
    //     this.router.navigateByUrl('');
    //   }
    // }).catch(((error:HttpErrorResponse)=>{
    //   this.funcGenerales.mensajeErrorHttp("errorArribaDerecha",error);
    // }));

    let arrayCuentasXCobrar = [{
      cliente: "alexis",
      folio: "123213",
      importeVentaSinIva: 120,
      iva: 16
    }, {
      cliente: "juan",
      folio: "323231",
      importeVentaSinIva: 100,
      iva: 16
    },
    {
      cliente: "pedro",
      folio: "22222",
      importeVentaSinIva: 12,
      iva: 16
    }, {
      cliente: "aaron",
      folio: "44444",
      importeVentaSinIva: 1111,
      iva: 16
    }, {
      cliente: "jorge",
      folio: "55555",
      importeVentaSinIva: 198,
      iva: 16
    }]

    let arrayCuentasCobradas = [{
      cliente: "diana",
      folio: "",
      importeVentaSinIva: 1000,
      FormaDeCobranza: "banco",
      iva: 16,
    }, {
      cliente: "",
      folio: "",
      importeVentaSinIva: 80,
      FormaDeCobranza: "laura",
      iva: 16,
    }, {
      cliente: "alejandro",
      folio: "",
      importeVentaSinIva: 70,
      FormaDeCobranza: "banco",
      iva: 16,
    }, {
      cliente: "jose",
      folio: "",
      importeVentaSinIva: 980,
      FormaDeCobranza: "efectivo",
      iva: 16,
    }];

  }



  tiempoExpiracion() {
    this.expirar = setTimeout(() => {
      this.router.navigateByUrl('');
    }, 36000000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.expirar);
    this.tiempoExpiracion();
  }

  @HostListener('window:keydown') refreshUserState1() {
    clearTimeout(this.expirar);
    this.tiempoExpiracion();
  }

  Pagar() {
    this.ventanaPago();
    
  }
  Cancelar() {
    this.funcGenerales.limpiarMensajes();
  }

   /**
    *\brief   Función que invoca la ventana del pago
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
    @param[in] -> el modo en el que se comportará la ventana
  */
    ventanaPago() {
      var width = '70vh';
      var height = '45vh';
  
      const dialogRef = this.dialog.open(VentanaPagoComponent, {
        disableClose: true,
        width: width,
        height: height,
        data: {},
      });
  
      return new Promise(resolve => {
        dialogRef.afterClosed().subscribe(result => {
          this.funcGenerales.mostrarMensajeError('esquinaSupDerMenu','success','Exitoso','Gracias por su preferencia',true)
          debugger
          var d = new Date();
          d.setMonth(d.getMonth() + 1);
          this.parametrosSistema.perfiles[0].Fecha_Proximo_Pago = this.funcGenerales.dameFechaString(d)
          this.parametrosSistema.perfiles[0].Ultimo_fecha_pago = this.funcGenerales.dameFechaString(new Date())
          this.funcGenerales.limpiarMensajes('pagar_membresia');
        });
      });
    }

}
