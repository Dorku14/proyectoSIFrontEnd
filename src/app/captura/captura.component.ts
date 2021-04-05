import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { CapturaEfectivoBancoComponent } from '../captura/captura-efectivo-banco/captura-efectivo-banco.component';
import { CapturaBancoEfectivoComponent } from '../captura/captura-banco-efectivo/captura-banco-efectivo.component';
import { CapturaBancoBancoComponent } from '../captura/captura-banco-banco/captura-banco-banco.component';
import { CapturaCobroClientesComponent } from '../captura/captura-cobro-clientes/captura-cobro-clientes.component';
import { CapturaPagoCreditoProveedoresComponent } from '../captura/captura-pago-credito-proveedores/captura-pago-credito-proveedores.component';
import { CapturaGastoComponent } from '../captura/captura-gasto/captura-gasto.component';
import { CapturaPagoDeudaAcreedoresComponent } from '../captura/captura-pago-deuda-acreedores/captura-pago-deuda-acreedores.component';
import { CapturaNominaPrestacionesComponent } from '../captura/captura-nomina-prestaciones/captura-nomina-prestaciones.component';
import { CapturaComisionesComponent } from '../captura/captura-comisiones/captura-comisiones.component';
import { CapturaPagoIvaComponent } from '../captura/captura-pago-iva/captura-pago-iva.component';
import { CapturaCompraActivoFijoComponent } from '../captura/captura-compra-activo-fijo/captura-compra-activo-fijo.component';
import { CapturaVentaActivoFijoComponent } from '../captura/captura-venta-activo-fijo/captura-venta-activo-fijo.component';
import { CapturaPrestamoRecibidoComponent } from '../captura/captura-prestamo-recibido/captura-prestamo-recibido.component';
import { CapturaPagoPrestamoComponent } from '../captura/captura-pago-prestamo/captura-pago-prestamo.component';
import { CapturaInteresPagadoComponent } from '../captura/captura-interes-pagado/captura-interes-pagado.component';
import { CapturaPrestamoOtorgadoComponent } from '../captura/captura-prestamo-otorgado/captura-prestamo-otorgado.component';
import { CapturaCobroPrestamoComponent } from '../captura/captura-cobro-prestamo/captura-cobro-prestamo.component';
import { CapturaInteresCobradoComponent } from '../captura/captura-interes-cobrado/captura-interes-cobrado.component';
import { CapturaDepreciacionComponent } from '../captura/captura-depreciacion/captura-depreciacion.component';
import { CapturaImpuestosComponent } from '../captura/captura-impuestos/captura-impuestos.component';
import { CapturaIsrComponent } from '../captura/captura-isr/captura-isr.component';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrls: ['./captura.component.scss']
})
export class CapturaComponent implements OnInit {
  Listado: Array<{ID, DESCRIP}>
  componenteAabrir: any;
  componetesAbiertos: Array<ComponentType<any>> = [];
  @ViewChild(MatTabGroup, { read: MatTabGroup })
  public tabGroup: MatTabGroup;
  @ViewChildren(MatTab, { read: MatTab })
  public tabNodes: QueryList<MatTab>;
  public closedTabs = [];
  public tabs: Array<{ tabType: number, name: string, componente }> = [];
  activeTab: any = 0;
  indexAgregadoRec :number; // indice agregado recientemente
  @ViewChild('figureContainer', { read: ViewContainerRef }) figureContainer;
  @ViewChild('figureContainer1', { read: ViewContainerRef }) figureContainer1;
  @ViewChild('figureContainer2', { read: ViewContainerRef }) figureContainer2;
  @ViewChild('figureContainer3', { read: ViewContainerRef }) figureContainer3;

  constructor(public funcGenerales: FuncionesGenerales, public dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { this.tabs.push({ tabType: 0, name: "Inicio", componente: ""}) }

  ngOnInit(): void {
    this.listado();
  }

  addTab(e) {
    console.log(e.value);
    let validaExistencia = this.tabs.find(item => item.name === e.value.DESCRIP);
    if (!validaExistencia) {
      if (this.tabs.length < 4) {
        let vista = this.Listado.find(item => item.ID == e.value.ID);
        if (vista) {
          let nuevoIndex = this.getNuevoIndex();
          let nuevoTab: { tabType: number, name: string, componente } = { tabType: 0, name: "", componente: "" };
          nuevoTab.name = vista.DESCRIP;
          nuevoTab.tabType = nuevoIndex;
          switch (vista.ID) {
            case 1:
              nuevoTab.componente = CapturaEfectivoBancoComponent;
              break;
            case 2:
              nuevoTab.componente = CapturaBancoEfectivoComponent;
              break;
            case 3:
              nuevoTab.componente = CapturaBancoBancoComponent;
              break;
            case 4:
              nuevoTab.componente = CapturaCobroClientesComponent;
              break;
            case 5:
              nuevoTab.componente = CapturaPagoCreditoProveedoresComponent;
              break;
            case 6:
              nuevoTab.componente = CapturaGastoComponent;
              break;
            case 7:
              nuevoTab.componente = CapturaPagoDeudaAcreedoresComponent;
              break;
            case 8:
              nuevoTab.componente = CapturaNominaPrestacionesComponent;
              break;
            case 9:
              nuevoTab.componente = CapturaComisionesComponent;
              break;
            case 10:
              nuevoTab.componente = CapturaPagoIvaComponent;
              break;
            case 11:
              nuevoTab.componente = CapturaCompraActivoFijoComponent;
              break;
            case 12:
              nuevoTab.componente = CapturaVentaActivoFijoComponent;
              break;
            case 13:
              nuevoTab.componente = CapturaPrestamoRecibidoComponent;
              break;
            case 14:
              nuevoTab.componente = CapturaPagoPrestamoComponent;
              break;
            case 15:
              nuevoTab.componente = CapturaInteresPagadoComponent;
              break;
            case 16:
              nuevoTab.componente = CapturaPrestamoOtorgadoComponent;
              break;
            case 17:
              nuevoTab.componente = CapturaCobroPrestamoComponent;
              break;
            case 18:
              nuevoTab.componente = CapturaInteresCobradoComponent;
              break;
            case 19:
              nuevoTab.componente = CapturaDepreciacionComponent;
              break;
            case 20:
              nuevoTab.componente = CapturaImpuestosComponent;
              break;
            case 21:
              nuevoTab.componente = CapturaIsrComponent;
              break;
          }
          if (nuevoTab.componente != "") {
              this.tabs.push(nuevoTab);
              this.indexAgregadoRec = nuevoTab.tabType;
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

  getNuevoIndex() {
    if(this.tabs.length > 1){
      for(let i = 1; i <= this.tabs.length; i++){
          let buscarTabVacio = this.tabs.find(item => item.tabType === i);
          if(!buscarTabVacio){
            return i;
          }
      }
    }else{
      return 1;
    }
  }

  changeTab(activeTab) {
    this.activeTab = activeTab;
    if (activeTab != 0) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.tabs[activeTab].componente);
      let buscarComponente = this.componetesAbiertos.find(item => item === factory.componentType);
      if (!buscarComponente) {
        this.componetesAbiertos.push(factory.componentType);
        switch (this.indexAgregadoRec) {
          case 1:
            this.figureContainer.createComponent(factory);
            break;
          case 2:
            this.figureContainer2.createComponent(factory);
            break;
          case 3:
            this.figureContainer3.createComponent(factory);
            break;
        }
      }
    }
  }

  tabsActivos = (indice: number) => {
    return this.funcGenerales.tabsActivos(indice, this.activeTab);
  }

  closeTab(index: number) {
    let indexComponentesAbiertos = this.componetesAbiertos.findIndex(item => item === this.tabs[index].componente);
    this.componetesAbiertos.splice(indexComponentesAbiertos, 1);
    this.tabs.splice(index, 1);
    this.tabGroup.selectedIndex = index;
  }

  listado(){
    this.Listado = [
      {ID:1, DESCRIP:'DE EFECTIVO => A BANCO'},
      {ID:2, DESCRIP:'DE BANCO => A EFECTIVO'},
      {ID:3, DESCRIP:'DE BANCO => A BANCO'},
      {ID:4, DESCRIP:'COBRO A CLIENTES'},
      {ID:5, DESCRIP:'PAGO CREDITO PROVEEDORES'},
      {ID:6, DESCRIP:'GASTO'},
      {ID:7, DESCRIP:'PAGO DEUDA A ACREEDORES'},
      {ID:8, DESCRIP:'NÓMINA Y PRESTACIONES'},
      {ID:9, DESCRIP:'COMISIONES'},
      {ID:10, DESCRIP:'PAGO DEL IVA'},
      {ID:11, DESCRIP:'COMPRA ACTIVO FIJO'},
      {ID:12, DESCRIP:'VENTA ACTIVO FIJO'},
      {ID:13, DESCRIP:'PRÉSTAMO RECIBIDO'},
      {ID:14, DESCRIP:'PAGO DEL PRESTAMO'},
      {ID:15, DESCRIP:'INTERÉS PAGADO'},
      {ID:16, DESCRIP:'PRÉSTAMO OTORGADO'},
      {ID:17, DESCRIP:'COBRO DEL PRÉSTAMO'},
      {ID:18, DESCRIP:'INTERÉS COBRADO'},
      {ID:19, DESCRIP:'DEPRECIACIÓN'},
      {ID:20, DESCRIP:'IMPUESTOS'},
      {ID:21, DESCRIP:'ISR'},
    ]
  }

}
