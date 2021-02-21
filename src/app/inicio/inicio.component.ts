import { ComponentType } from '@angular/cdk/portal';
import { ThrowStmt } from '@angular/compiler';
import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { BancosComponent } from '../bancos/bancos.component';
import { CajaComponent } from '../caja/caja.component';
import { ProductosComercialesComponent } from '../productos-comerciales/productos-comerciales.component';
import { NombreComponente } from '../sharedModules/constantes';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { CreditoClientesComponent } from '../credito-clientes/credito-clientes.component';
import { IvaAcreditableComponent } from '../iva-acreditable/iva-acreditable.component';
import { PrestamoOtorgadoComponent } from '../prestamo-otorgado/prestamo-otorgado.component';
import { ActivosFijosComponent } from '../activos-fijos/activos-fijos.component';
import { CreditoProveedoresComponent } from '../credito-proveedores/credito-proveedores.component';
import { AcreedoresDiversosComponent} from '../acreedores-diversos/acreedores-diversos.component';
import { PrestamoRecibidoComponent } from '../prestamo-recibido/prestamo-recibido.component';
import { NominaDestajoComponent } from '../nomina-destajo/nomina-destajo.component';
import { IvaPorPagarComponent } from '../iva-por-pagar/iva-por-pagar.component';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  NombresComponetes = NombreComponente;
  dataSource: Array<any>;
  itemSeleccionado: any;
  itemSeleccionadoActivo: any;
  itemSeleccionadoPasivo: any;
  columns: any;
  columns2: any;
  columns3: any;
  columns4: any;
  Activos: Array<{ DESCRIPCION, CANTIDAD, PORCENTAJE, CONSTANTE }>;
  Pasivos: Array<{ DESCRIPCION, CANTIDAD, PORCENTAJE, CONSTANTE }>;
  ActivosDetalle: Array<{ DESCRIPCION, CANTIDAD }>;
  PasivosDetalle: Array<{ DESCRIPCION, CANTIDAD }>;
  ActivosFijos: Array<{ DESCRIPCION, CANTIDAD }>;
  Capital: Array<{ DESCRIPCION, CANTIDAD }>;
  EstadoResultado: Array<{ DESCRIPCION, MOVIMIENTO, ACUMULADO }>;
  VentasAcumuladas: Array<{ PORVENTA, DESCRIPCION, VENACU, UNIDADES, UTBRUTA, PORUTBRUTA}>;
  componenteAabrir: any;
  componetesAbiertos: Array<ComponentType<any>> = [];
  @ViewChild(MatTabGroup, { read: MatTabGroup })
  public tabGroup: MatTabGroup;
  @ViewChildren(MatTab, { read: MatTab })
  public tabNodes: QueryList<MatTab>;
  public closedTabs = [];
  public tabs: Array<{ tabType: number, name: string, componente }> = [];
  activeTab: any = 0;
  @ViewChild('figureContainer', { read: ViewContainerRef }) figureContainer;
  @ViewChild('figureContainer1', { read: ViewContainerRef }) figureContainer1;
  @ViewChild('figureContainer2', { read: ViewContainerRef }) figureContainer2;
  @ViewChild('figureContainer3', { read: ViewContainerRef }) figureContainer3;
  @ViewChild('figureContainer4', { read: ViewContainerRef }) figureContainer4;
  @ViewChild('figureContainer5', { read: ViewContainerRef }) figureContainer5;
  @ViewChild('figureContainer6', { read: ViewContainerRef }) figureContainer6;
  @ViewChild('figureContainer7', { read: ViewContainerRef }) figureContainer7;
  @ViewChild('figureContainer8', { read: ViewContainerRef }) figureContainer8;
  @ViewChild('figureContainer9', { read: ViewContainerRef }) figureContainer9;
  @ViewChild('figureContainer10', { read: ViewContainerRef }) figureContainer10;


  constructor(public funcGenerales: FuncionesGenerales, public dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {
    this.tabs.push({ tabType: 0, name: "Inicio", componente: "" })
  }

  ngOnInit(): void {
    this.configuraDataGrid();
    this.configuraDataGrid2();
    this.configuraDataGrid3();
    this.configuraDataGrid4();
    this.activos();
    this.pasivos();
    this.activosDetalle();
    this.pasivosDetalle();
    this.activosFijos();
    this.capital();
    this.estadoResultado();
    this.ventasAcumuladas();
  }

  formatoDatosTabla(columna) {
    if (columna == "NUM") {
      return "columnaNum";
    } else {
      return "";
    }
  }

  configuraDataGrid(): void {
    let configGrid = {
      columns: 3,
      header: ['Descripción', 'Cantidad', ''],
      field: ['DESCRIPCION', 'CANTIDAD', 'PORCENTAJE'],

    };

    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
  }

  configuraDataGrid2(): void {
    let configGrid2 = {
      columns: 2,
      header: ['Descripción', 'Cantidad'],
      field: ['DESCRIPCION', 'CANTIDAD'],

    };

    this.columns2 = this.funcGenerales.aplicaConfigGrid2(configGrid2);
  }

  configuraDataGrid3(): void {
    let configGrid3 = {
      columns: 3,
      header: ['Descripción', 'Movimiento DEL día 28', 'Acumulado AL día 28'],
      field: ['DESCRIPCION', 'MOVIMIENTO', 'ACUMULADO'],

    };

    this.columns3 = this.funcGenerales.aplicaConfigGrid3(configGrid3);
  }

  configuraDataGrid4(): void {
    let configGrid4 = {
      columns: 6,
      header: ['% Venta', 'Descripción', 'Ventas Acumuladas', 'Unidades', 'Ut. Bruta', '% Ut. Bruta'],
      field: ['PORVENTA', 'DESCRIPCION', 'VENACU', 'UNIDADES', 'UTBRUTA', 'PORUTBRUTA'],

    };

    this.columns4 = this.funcGenerales.aplicaConfigGrid4(configGrid4);
  }

  activos() {
    this.Activos = [
      { DESCRIPCION: 'CAJA', CANTIDAD: 1973.43, PORCENTAJE: '6%', CONSTANTE: NombreComponente.CAJA },
      { DESCRIPCION: 'BANCOS', CANTIDAD: 7885.51, PORCENTAJE: '23%', CONSTANTE: NombreComponente.BANCOS },
      { DESCRIPCION: 'CRÉDITO CLIENTES', CANTIDAD: 1000.00, PORCENTAJE: '3%', CONSTANTE: NombreComponente.CREDITOCLIENTES },
      { DESCRIPCION: '* Provisión IVA pend.x Cobrar', CANTIDAD: 160.00, PORCENTAJE: '0%', CONSTANTE: "" },
      { DESCRIPCION: 'ALMACÉN', CANTIDAD: 21417.26, PORCENTAJE: '61%', CONSTANTE: "" },
      { DESCRIPCION: 'TOTAL CIRCULANTE', CANTIDAD: 32436.20, PORCENTAJE: '93%', CONSTANTE: "" },
      { DESCRIPCION: 'IVA ACREDITABLE', CANTIDAD: 2058.84, PORCENTAJE: '6%', CONSTANTE: NombreComponente.IVAACREDITABLE },
      { DESCRIPCION: 'DEUDORES DIVERSOS', CANTIDAD: 500.00, PORCENTAJE: '1%', CONSTANTE: NombreComponente.PRESTAMOOTORGADO },
      { DESCRIPCION: 'ACTIVOS FIJOS', CANTIDAD: '-', PORCENTAJE: '', CONSTANTE: NombreComponente.ACTIVOSFIJOS },
      { DESCRIPCION: 'DEPRECIACIÓN', CANTIDAD: '-', PORCENTAJE: '', CONSTANTE: "" },
      { DESCRIPCION: 'TOTAL FIJOS', CANTIDAD: '-', PORCENTAJE: '0%', CONSTANTE: "" },
      { DESCRIPCION: 'TOTAL ACTIVOS', CANTIDAD: 34995.04, PORCENTAJE: '100%', CONSTANTE: "" }
    ]
  }

  pasivos() {
    this.Pasivos = [
      { DESCRIPCION: 'CRÉDITO DE PROVEED', CANTIDAD: 1200.00, PORCENTAJE: '3%', CONSTANTE: NombreComponente.CREDITOPROVEEDORES},
      { DESCRIPCION: '* Provisión IVA pend.x Pagar', CANTIDAD: 192.00, PORCENTAJE: '1%', CONSTANTE:''},
      { DESCRIPCION: 'ACREEDORES DIVERSOS', CANTIDAD: 1200.00, PORCENTAJE: '3%', CONSTANTE: NombreComponente.ACREEDORES},
      { DESCRIPCION: 'DEUDA POR CRÉDITOS (CP)', CANTIDAD: 1000.00, PORCENTAJE: '3%', CONSTANTE: NombreComponente.PRESTAMORECIBIDO},
      { DESCRIPCION: 'NOMINA DESTAJO', CANTIDAD: 399.50, PORCENTAJE: '1%', CONSTANTE: NombreComponente.NOMINA},
      { DESCRIPCION: 'NOMINA INDIRECTA', CANTIDAD: 500.00, PORCENTAJE: '1%', CONSTANTE: ''},
      { DESCRIPCION: 'GASTO IND. FAB.', CANTIDAD: 2000.00, PORCENTAJE: '6%', CONSTANTE: ''},
      { DESCRIPCION: 'PASIVO CORTO PLAZO', CANTIDAD: 6491.50, PORCENTAJE: '19%', CONSTANTE: ''},
      { DESCRIPCION: 'IVA POR PAGAR', CANTIDAD: 531.25, PORCENTAJE: '2%', CONSTANTE: NombreComponente.IVAPORPAGAR},
      { DESCRIPCION: 'DEUDA POR CREDITOS (LP)', CANTIDAD: 1000.00, PORCENTAJE: '3%', CONSTANTE: ''},
      { DESCRIPCION: 'TOTLAL PÁTRIMONIO', CANTIDAD: 26972.02, PORCENTAJE: '77%', CONSTANTE: ''},
      { DESCRIPCION: 'CAPITAL INICIAL', CANTIDAD: 27370.50, PORCENTAJE: '78%', CONSTANTE: ''},
      { DESCRIPCION: 'PERDIDA AL 28 AGOSTO', CANTIDAD: 398.48, PORCENTAJE: '-1%', CONSTANTE:''},
      { DESCRIPCION: 'UTILIDAD REINVERTIDA', CANTIDAD: '-', PORCENTAJE: '', CONSTANTE: ''},
      { DESCRIPCION: 'INCREMENTO CAPITAL', CANTIDAD: '-', PORCENTAJE: '', CONSTANTE: ''},
      { DESCRIPCION: 'TOTAL PASIVO + PATRIMONIO', CANTIDAD: 34995.04, PORCENTAJE: '100%', CONSTANTE: ''}
    ]
  }

  activosDetalle() {
    this.ActivosDetalle = [
      { DESCRIPCION: 'CAJA', CANTIDAD: 1973.51 },
      { DESCRIPCION: 'BANCOS', CANTIDAD: 7885.51 },
      { DESCRIPCION: 'BANAMEX', CANTIDAD: 4885.51 },
      { DESCRIPCION: 'SANTANDER', CANTIDAD: 1000.00 },
      { DESCRIPCION: 'HSBC', CANTIDAD: 1000.00 },
      { DESCRIPCION: 'BBVA', CANTIDAD: 1000.00 },
      { DESCRIPCION: 'CREDITO A CLIENTES', CANTIDAD: 1000.00 },
      { DESCRIPCION: '* Provisión IVA pend.x Cobrar', CANTIDAD: 160.00 },
      { DESCRIPCION: 'ALMACEN', CANTIDAD: 21417.26 },
      { DESCRIPCION: 'PRODUCTO COMERCIAL', CANTIDAD: 7000.00 },
      { DESCRIPCION: 'PRODUCTO FABRICADO', CANTIDAD: 9275.12 },
      { DESCRIPCION: 'PRODUCTO EN PROCESO', CANTIDAD: 4466.55 },
      { DESCRIPCION: 'IVA ACREDITABLE', CANTIDAD: 2058.84 },
      { DESCRIPCION: 'DEUDORES DIVERSOS', CANTIDAD: 500.00 },
      { DESCRIPCION: 'TOTAL CIRCULANTE', CANTIDAD: 34995.04 }
    ]
  }

  pasivosDetalle() {
    this.PasivosDetalle = [
      { DESCRIPCION: 'CRÉDITO DE PROVEED', CANTIDAD: 1200.00 },
      { DESCRIPCION: '* Provisión IVA pend.x Pagar', CANTIDAD: 192.00 },
      { DESCRIPCION: 'ACREEDORES DIVERSOS', CANTIDAD: 1200.00 },
      { DESCRIPCION: 'NÓMINA DEDSTAJO', CANTIDAD: 399.50 },
      { DESCRIPCION: 'NÍOMINA INDIRECTA', CANTIDAD: 500.00 },
      { DESCRIPCION: 'GASTO IND. FAB.', CANTIDAD: 2000.00 },
      { DESCRIPCION: 'DEUDA POR CRÉDITOS (CP)', CANTIDAD: 1000.00 },
      { DESCRIPCION: 'IVA POR PAGAR', CANTIDAD: 531.52 },
      { DESCRIPCION: 'TOTAL CORTO PLAZO', CANTIDAD: 7023.02 },
      { DESCRIPCION: 'DEUDA POR CRÉDITOS (LP)', CANTIDAD: 1000.00 },
      { DESCRIPCION: 'TOTAL PASIVOS', CANTIDAD: 8023.02 },
    ]
  }

  activosFijos() {
    this.ActivosFijos = [
      { DESCRIPCION: 'MOBILIARIO', CANTIDAD: '-' },
      { DESCRIPCION: 'EQUIPO TECNOLÓGICO', CANTIDAD: '-' },
      { DESCRIPCION: 'MAQUINARIA', CANTIDAD: '-' },
      { DESCRIPCION: 'EQUIPO DE TRANSPORTE', CANTIDAD: '-' },
      { DESCRIPCION: 'INMUEBLES', CANTIDAD: '-' },
      { DESCRIPCION: 'DEPRECIACIÓN (Acomulada)', CANTIDAD: '-' },
      { DESCRIPCION: 'TOTAL FIJOS', CANTIDAD: '-' },
      { DESCRIPCION: 'TOTAL ACTIVOS', CANTIDAD: 34995.04 }
    ]
  }

  capital() {
    this.Capital = [
      { DESCRIPCION: 'TOTAL PATRIMONIO', CANTIDAD: 26972.02 },
      { DESCRIPCION: 'CAPITAL INICIAL', CANTIDAD: 27370.50 },
      { DESCRIPCION: 'PÉRDIDAL al 28 AGOSTO', CANTIDAD: 398.48 },
      { DESCRIPCION: 'UTILIDAD REINVERTIDA', CANTIDAD: '-' },
      { DESCRIPCION: 'INCREMENTO DE CAPITAL Acomulado)', CANTIDAD: '-' },
      { DESCRIPCION: 'TOTAL PASIVO + PATRIMONIO', CANTIDAD: 34995.04 }
    ]
  }

  estadoResultado() {
    this.EstadoResultado = [
      { DESCRIPCION: 'VENTAS', MOVIMIENTO: '-', ACUMULADO: 3322.00 },
      { DESCRIPCION: '(Menos) COSTO DE VENTAS', MOVIMIENTO: '-', ACUMULADO: 2520.48 },
      { DESCRIPCION: '(=) UTILIDAD BRUTA', MOVIMIENTO: 0.00, ACUMULADO: 801.52 }
    ]
  }

  ventasAcumuladas(){
    this.VentasAcumuladas = [
      {PORVENTA:'30%', DESCRIPCION:'CAMISA 1', VENACU:'$1,000.00', UNIDADES:'5', UTBRUTA:'$500.00', PORUTBRUTA:'50%'},
      {PORVENTA:'38%', DESCRIPCION:'GUAYABERA', VENACU:'$1,272.00', UNIDADES:'2', UTBRUTA:'-$228.48', PORUTBRUTA:'-18%'},
      {PORVENTA:'24%', DESCRIPCION:'PANTALÓN', VENACU:'$800.00', UNIDADES:'4', UTBRUTA:'$400.00', PORUTBRUTA:'50%'},
      {PORVENTA:'8%', DESCRIPCION:'PRODUCTO 2', VENACU:'$250.00', UNIDADES:'1', UTBRUTA:'$130.00', PORUTBRUTA:'52%'},
      {PORVENTA:'', DESCRIPCION:'', VENACU:'$3,322.00', UNIDADES:'', UTBRUTA:'$801.52', PORUTBRUTA:'24%'}
    ]
  }

  closeTab(index: number) {
    let indexComponentesAbiertos = this.componetesAbiertos.findIndex(item => item === this.tabs[index].componente);
    this.componetesAbiertos.splice(indexComponentesAbiertos, 1);
    this.tabs.splice(index, 1);
    this.tabGroup.selectedIndex = index;
  }

  addTab(nombre: string) {

    let validaExistencia = this.tabs.find(item => item.name === nombre);
    if (!validaExistencia) {
      if (this.tabs.length < 11) {
        let vista = this.Activos.find(item => item.DESCRIPCION == nombre);
        if (vista == null) {
          vista = this.Pasivos.find(item => item.DESCRIPCION == nombre);
        }
        if (vista) {
          let nuevoIndex = this.tabs.length;
          let nuevoTab: { tabType: number, name: string, componente } = { tabType: 0, name: "", componente: "" };
          nuevoTab.name = nombre;
          nuevoTab.tabType = nuevoIndex;
          switch (vista.CONSTANTE) {
            case NombreComponente.CAJA:
              nuevoTab.componente = CajaComponent

              break;
            case NombreComponente.BANCOS:
              nuevoTab.componente = BancosComponent;
              break;
            case NombreComponente.CREDITOCLIENTES:
              nuevoTab.componente = CreditoClientesComponent;
              break;
            case NombreComponente.IVAACREDITABLE:
              nuevoTab.componente = IvaAcreditableComponent;
              break;
            case NombreComponente.PRESTAMOOTORGADO:
              nuevoTab.componente = PrestamoOtorgadoComponent;
              break;
            case NombreComponente.ACTIVOSFIJOS:
              nuevoTab.componente = ActivosFijosComponent;
              break;
            case NombreComponente.CREDITOPROVEEDORES:
              nuevoTab.componente = CreditoProveedoresComponent;
              break;
            case NombreComponente.ACREEDORES:
              nuevoTab.componente = AcreedoresDiversosComponent;
              break;
            case NombreComponente.PRESTAMORECIBIDO:
              nuevoTab.componente = PrestamoRecibidoComponent;
              break;
            case NombreComponente.NOMINA:
              nuevoTab.componente = NominaDestajoComponent;
              break;
            case NombreComponente.IVAPORPAGAR:
              nuevoTab.componente = IvaPorPagarComponent;
              break;
          }
          if (nuevoTab.componente != "") {
              this.tabs.push(nuevoTab);
              this.funcGenerales.pausa(100).then(() => {
              this.tabGroup.selectedIndex = this.tabNodes.length - 1;
            });
          }

        }
      } else {
        this.funcGenerales.mensajeConfirmacion("arribaDerecha", "error", "", "Número máximo de pestañas alcanzada");
      }
    } else {
      this.tabGroup.selectedIndex = validaExistencia.tabType
    }



  }

  changeTab(activeTab) {
    this.activeTab = activeTab;
    if (activeTab != 0) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.tabs[activeTab].componente);
      let buscarComponente = this.componetesAbiertos.find(item => item === factory.componentType);
      if (!buscarComponente) {
        this.componetesAbiertos.push(factory.componentType);
        switch (activeTab) {
          case 1:
            // this.figureContainer.clear();
            this.figureContainer.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 2:
            // this.figureContainer.clear();
            this.figureContainer2.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 3:
            // this.figureContainer.clear();
            this.figureContainer3.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 4:
            // this.figureContainer.clear();
            this.figureContainer4.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 5:
            // this.figureContainer.clear();
            this.figureContainer5.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 6:
            // this.figureContainer.clear();
            this.figureContainer6.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 7:
            // this.figureContainer.clear();
            this.figureContainer7.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 8:
            // this.figureContainer.clear();
            this.figureContainer8.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 9:
            // this.figureContainer.clear();
            this.figureContainer9.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;
          case 10:
            // this.figureContainer.clear();
            this.figureContainer10.createComponent(factory);
            // this.figureContainer.detach().detectChanges()
            break;

        }

      }
    }

  }
  tabsActivos = (indice: number) => {
    return this.funcGenerales.tabsActivos(indice, this.activeTab);
  }
}
