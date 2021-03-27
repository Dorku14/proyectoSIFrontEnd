import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NombreComponente } from '../sharedModules/constantes';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';

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
  Inicio = false
  Uno = true
  Dos = true
  Tres = true
  Cuatro = true
  Cinco = true
  Seis = true
  Siete = true
  Ocho = true
  Nueve = true
  Diez = true
  Once = true
  Doce = true
  Trece = true
  Catorce = true
  Quince = true
  Dieciseis = true
  Diecisiete = true
  Dieciocho = true
  Diecinueve = true
  Veinte = true
  Veintiuno = true

  constructor(public funcGenerales: FuncionesGenerales, public dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { this.tabs.push({ tabType: 0, name: "Inicio", componente: ""}) }

  ngOnInit(): void {
    this.listado();
  }

  addTab(e) {

    let validaExistencia = this.tabs.find(e.value);
    if (!validaExistencia) {
      if (this.tabs.length < 4) {
        if (e.value) {
          let nuevoIndex = this.getNuevoIndex();
          let nuevoTab: { tabType: number, name: string, componente } = { tabType: 0, name: "", componente: "" };
          nuevoTab.name = e.value;
          nuevoTab.tabType = nuevoIndex;
          switch (e.CONSTANTE) {
            case NombreComponente.CAJA:
              nuevoTab.componente = '';
            case NombreComponente.BANCOS:
              nuevoTab.componente = '';
              break;
            case NombreComponente.CREDITOCLIENTES:
              nuevoTab.componente = '';
              break;
            case NombreComponente.IVAACREDITABLE:
              nuevoTab.componente = '';
              break;
            case NombreComponente.PRESTAMOOTORGADO:
              nuevoTab.componente = '';
              break;
            case NombreComponente.ACTIVOSFIJOS:
              nuevoTab.componente = '';
              break;
            case NombreComponente.CREDITOPROVEEDORES:
              nuevoTab.componente = '';
              break;
            case NombreComponente.ACREEDORES:
              nuevoTab.componente = '';
              break;
            case NombreComponente.PRESTAMORECIBIDO:
              nuevoTab.componente = '';
              break;
            case NombreComponente.NOMINA:
              nuevoTab.componente = '';
              break;
            case NombreComponente.IVAPORPAGAR:
              nuevoTab.componente = ''
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
      {ID:0, DESCRIP:''},
    ]
  }

  ocultar(e){
    this.Inicio = false
    this.Uno = true
    this.Dos = true
    this.Tres = true
    this.Cuatro = true
    this.Cinco = true
    this.Seis = true
    this.Siete = true
    this.Ocho = true
    this.Nueve = true
    this.Diez = true
    this.Once = true
    this.Doce = true
    this.Trece = true
    this.Catorce = true
    this.Quince = true
    this.Dieciseis = true
    this.Diecisiete = true
    this.Dieciocho = true
    this.Diecinueve = true
    this.Veinte = true
    this.Veintiuno = true
    if(e.value > 0){
      this.Inicio = true
    }
    switch(e.value){
      case 1:
        this.Uno = false
      break;
      case 2:
        this.Dos = false
      break;
      case 3:
        this.Tres = false
      break;
      case 4:
        this.Cuatro = false
      break;
      case 5:
        this.Cinco = false
      break;
      case 6:
        this.Seis = false
      break;
      case 7:
        this.Siete = false
      break;
      case 8:
        this.Ocho = false
      break;
      case 9:
        this.Nueve = false
      break;
      case 10:
        this.Diez = false
      break;
      case 11:
        this.Once = false
      break;
      case 12:
        this.Doce = false
      case 13:
        this.Trece = false
      case 14:
        this.Catorce = false
      break;
      case 15:
        this.Quince = false
      break;
      case 16:
        this.Dieciseis = false
      case 17:
        this.Diecisiete = false
      break;
      case 18:
        this.Dieciocho = false
      break;
      case 19:
        this.Diecinueve = false
      break;
      case 20:
        this.Veinte = false
      break;
      case 21:
        this.Veintiuno = false
      break;

    }
  }

}
