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
  Activos: Array<{ DESCRIPCION, CANTIDAD, PORCENTAJE, CONSTANTE }>;
  Pasivos: Array<{ DESCRIPCION, CANTIDAD, PORCENTAJE }>;
  ActivosDetalle: Array<{ DESCRIPCION, CANTIDAD }>;
  PasivosDetalle: Array<{ DESCRIPCION, CANTIDAD }>;
  ActivosFijos: Array<{ DESCRIPCION, CANTIDAD }>;
  Capital: Array<{ DESCRIPCION, CANTIDAD }>;
  EstadoResultado: Array<{ DESCRIPCION, MOVIMIENTO, ACUMULADO }>;
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
    this.activos();
    this.pasivos();
    this.activosDetalle();
    this.pasivosDetalle();
    this.activosFijos();
    this.capital();
    this.estadoResultado();
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

  activos() {
    this.Activos = [
      { DESCRIPCION: 'CAJA', CANTIDAD: 1973.43, PORCENTAJE: '6%', CONSTANTE: NombreComponente.CAJA },
      { DESCRIPCION: 'BANCOS', CANTIDAD: 7885.51, PORCENTAJE: '23%', CONSTANTE: NombreComponente.BANCOS },
      { DESCRIPCION: 'CRÉDITO CLIENTES', CANTIDAD: 1000.00, PORCENTAJE: '3%', CONSTANTE: "" },
      { DESCRIPCION: '* Provisión IVA pend.x Cobrar', CANTIDAD: 160.00, PORCENTAJE: '0%', CONSTANTE: "" },
      { DESCRIPCION: 'ALMACÉN', CANTIDAD: 21417.26, PORCENTAJE: '61%', CONSTANTE: "" },
      { DESCRIPCION: 'TOTAL CIRCULANTE', CANTIDAD: 32436.20, PORCENTAJE: '93%', CONSTANTE: "" },
      { DESCRIPCION: 'IVA ACREDITABLE', CANTIDAD: 2058.84, PORCENTAJE: '6%', CONSTANTE: "" },
      { DESCRIPCION: 'DEUDORES DIVERSOS', CANTIDAD: 500.00, PORCENTAJE: '1%', CONSTANTE: "" },
      { DESCRIPCION: 'ACTIVOS FIJOS', CANTIDAD: '-', PORCENTAJE: '', CONSTANTE: "" },
      { DESCRIPCION: 'DEPRECIACIÓN', CANTIDAD: '-', PORCENTAJE: '', CONSTANTE: "" },
      { DESCRIPCION: 'TOTAL FIJOS', CANTIDAD: '-', PORCENTAJE: '0%', CONSTANTE: "" },
      { DESCRIPCION: 'TOTAL ACTIVOS', CANTIDAD: 34995.04, PORCENTAJE: '100%', CONSTANTE: "" }
    ]
  }

  pasivos() {
    this.Pasivos = [
      { DESCRIPCION: 'CRÉDITO DE PROVEED', CANTIDAD: 1200.00, PORCENTAJE: '3%' },
      { DESCRIPCION: '* Provisión IVA pend.x Pagar', CANTIDAD: 192.00, PORCENTAJE: '1%' },
      { DESCRIPCION: 'ACREEDORES DIVERSOS', CANTIDAD: 1200.00, PORCENTAJE: '3%' },
      { DESCRIPCION: 'DEUDA POR CRÉDITOS (CP)', CANTIDAD: 1000.00, PORCENTAJE: '3%' },
      { DESCRIPCION: 'NOMINA DESTAJO', CANTIDAD: 399.50, PORCENTAJE: '1%' },
      { DESCRIPCION: 'NOMINA INDIRECTA', CANTIDAD: 500.00, PORCENTAJE: '1%' },
      { DESCRIPCION: 'GASTO IND. FAB.', CANTIDAD: 2000.00, PORCENTAJE: '6%' },
      { DESCRIPCION: 'PASIVO CORTO PLAZO', CANTIDAD: 6491.50, PORCENTAJE: '19%' },
      { DESCRIPCION: 'IVA POR PAGAR', CANTIDAD: 531.25, PORCENTAJE: '2%' },
      { DESCRIPCION: 'DEUDA POR CREDITOS (LP)', CANTIDAD: 1000.00, PORCENTAJE: '3%' },
      { DESCRIPCION: 'TOTLAL PÁTRIMONIO', CANTIDAD: 26972.02, PORCENTAJE: '77%' },
      { DESCRIPCION: 'CAPITAL INICIAL', CANTIDAD: 27370.50, PORCENTAJE: '78%' },
      { DESCRIPCION: 'PERDIDA AL 28 AGOSTO', CANTIDAD: 398.48, PORCENTAJE: '-1%' },
      { DESCRIPCION: 'UTILIDAD REINVERTIDA', CANTIDAD: '-', PORCENTAJE: '' },
      { DESCRIPCION: 'INCREMENTO CAPITAL', CANTIDAD: '-', PORCENTAJE: '' },
      { DESCRIPCION: 'TOTAL PASIVO + PATRIMONIO', CANTIDAD: 34995.04, PORCENTAJE: '100%' }
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
            default:
              nuevoTab.componente = ""
              break
          }
          this.tabs.push(nuevoTab);
          this.funcGenerales.pausa(100).then(() => {
            this.tabGroup.selectedIndex = this.tabNodes.length - 1;
          });

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
  tabsActivos=(indice :number)=>{
    return this.funcGenerales.tabsActivos(indice, this.activeTab);
  }
}
