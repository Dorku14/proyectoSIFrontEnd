import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NombreComponente } from '../sharedModules/constantes';
import { BalanceInicialBancosComponent} from '../balance-inicial/balance-inicial-bancos/balance-inicial-bancos.component';
import { BalanceInicialCreditoClientesComponent} from '../balance-inicial/balance-inicial-credito-clientes/balance-inicial-credito-clientes.component';
import { BalanceInicialDeudoresDiversosComponent} from '../balance-inicial/balance-inicial-deudores-diversos/balance-inicial-deudores-diversos.component';
import { BalanceInicialCreditoProveedoresComponent} from '../balance-inicial/balance-inicial-credito-proveedores/balance-inicial-credito-proveedores.component';
import { BalanceInicialAcreedoresDiversosComponent} from '../balance-inicial/balance-inicial-acreedores-diversos/balance-inicial-acreedores-diversos.component';
import { BalanceInicialDeudaCreditosComponent} from '../balance-inicial/balance-inicial-deuda-creditos/balance-inicial-deuda-creditos.component';

@Component({
  selector: 'app-balance-inicial',
  templateUrl: './balance-inicial.component.html',
  styleUrls: ['./balance-inicial.component.scss']
})
export class BalanceInicialComponent implements OnInit {

  Activos: Array<{NOMBRE, ACTIVO, NAME, CONSTANTE}>;
  ActivosFijos: Array<{NOMBRE, ACTIVO, NAME, CONSTANTE}>;
  Pasivos: Array<{NOMBRE, ACTIVO, NAME, CONSTANTE}>;
  Capital: Array<{NOMBRE, ACTIVO, NAME, CONSTANTE}>;
  componenteAabrir: any;
  componetesAbiertos: Array<ComponentType<any>> = [];
  @ViewChild(MatTabGroup, { read: MatTabGroup })
  public tabGroup: MatTabGroup;
  @ViewChildren(MatTab, { read: MatTab })
  public tabNodes: QueryList<MatTab>;
  public closedTabs = [];
  public tabs: Array<{ tabType: number, name: string, componente }> = [];
  activeTab: any = 0;
  indexAgregadoRec :number;
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

  constructor(public funcGenerales: FuncionesGenerales, public dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver) {
    this.tabs.push({ tabType: 0, name: "Balance Inicial", componente: "" })
  }

  ngOnInit(): void {
    this.activos();
    this.activosFijos();
    this.pasivos();
    this.capital();
  }

  activos(){
    this.Activos = [
      {NOMBRE: 'Caja',                        ACTIVO: 'false', NAME: 'Caja',            CONSTANTE:''},
      {NOMBRE: 'Bancos',                      ACTIVO: 'true',  NAME: 'Bancos',          CONSTANTE: NombreComponente.BALANCEINICIAL_BANCOS},
      {NOMBRE: 'Crédito Clientes',            ACTIVO: 'true',  NAME: 'CreCli',          CONSTANTE: NombreComponente.BALANCEINICIAL_CREDITOCLIENTES},
      {NOMBRE: 'Provisión IVA Pend.x Cobrar', ACTIVO: 'true',  NAME: 'IVAxCob',         CONSTANTE: ''},
      {NOMBRE: 'Almacen',                     ACTIVO: 'true',  NAME: 'Almacen',         CONSTANTE: ''},
      {NOMBRE: 'Producto Comercial',          ACTIVO: 'true',  NAME: 'ProCom',          CONSTANTE: ''},
      {NOMBRE: 'Producto Fabricado',          ACTIVO: 'true',  NAME: 'ProFab',          CONSTANTE: ''},
      {NOMBRE: 'Materia Prima',               ACTIVO: 'true',  NAME: 'MatPri',          CONSTANTE: ''},
      {NOMBRE: 'IVA Acreditable',             ACTIVO: 'false', NAME: 'IVAAcre',         CONSTANTE: ''},
      {NOMBRE: 'Deudores Diversos',           ACTIVO: 'true',  NAME: 'Deudores',        CONSTANTE: NombreComponente.BALANCEINICIAL_DEUDORESDIVERSOS},
      {NOMBRE: 'Total Circulante',            ACTIVO: 'false', NAME: 'SubTotalActivos', CONSTANTE: ''}
    ]
  };

  activosFijos(){
  this.ActivosFijos = [
      {NOMBRE: 'Mobiliario',               ACTIVO: 'false', NAME: 'Mobiliario',       CONSTANTE: ''},
      {NOMBRE: 'Equipo Tecnológico',       ACTIVO: 'false', NAME: 'EquipoTec',        CONSTANTE: ''},
      {NOMBRE: 'Maquinaria',               ACTIVO: 'false', NAME: 'Maquinaria',       CONSTANTE: ''},
      {NOMBRE: 'Equipo De Transporte',     ACTIVO: 'false', NAME: 'EquipoTrans',      CONSTANTE: ''},
      {NOMBRE: 'Inmuebles',                ACTIVO: 'false', NAME: 'Inmuebles',        CONSTANTE: ''},
      {NOMBRE: 'Depreciación',             ACTIVO: 'false', NAME: 'Depreciacion',     CONSTANTE: ''},
      {NOMBRE: 'Depreciación (Acomulada)', ACTIVO: 'false', NAME: 'DepreciacionAcum', CONSTANTE: ''},
      {NOMBRE: 'Total Fijos',              ACTIVO: 'false', NAME: 'TotalFijos',       CONSTANTE: ''}
    ]
  };

  pasivos(){
    this.Pasivos = [
      {NOMBRE: 'Crédito Proveedores',        ACTIVO: 'true',  NAME: 'CrePro',          CONSTANTE: NombreComponente.BALANCEINICIAL_CREDITOPROVEEDORES},
      {NOMBRE: 'Provisión IVA Pend.x Pagar', ACTIVO: 'false', NAME: 'IVAxPag',         CONSTANTE: ''},
      {NOMBRE: 'Acreedores Diversos',        ACTIVO: 'true',  NAME: 'Acree',           CONSTANTE: NombreComponente.BALANCEINICIAL_ACREEDORESDIVERSOS},
      {NOMBRE: 'Nomina Destajo',             ACTIVO: 'false', NAME: 'NomDes',          CONSTANTE: ''},
      {NOMBRE: 'Nomina Indirecta',           ACTIVO: 'false', NAME: 'NomInd',          CONSTANTE: ''},
      {NOMBRE: 'Deuda Por Créditos',         ACTIVO: 'true',  NAME: 'Deuda',           CONSTANTE: NombreComponente.BALANCEINICIAL_DEUDACREDITOS},
      {NOMBRE: 'IVA Por Pagar',              ACTIVO: 'false', NAME: 'IVAPag',          CONSTANTE: ''},
      {NOMBRE: 'Total Corto Plazo',          ACTIVO: 'false', NAME: 'SubTotalPasivos', CONSTANTE: ''},
      {NOMBRE: 'Total Pasivos',              ACTIVO: 'false', NAME: 'TotalPasivos',    CONSTANTE: ''}
    ]
  };

  capital(){
    this.Capital = [
      {NOMBRE: 'Total Patrimonio',                 ACTIVO: 'false', NAME: 'TotalPatri',      CONSTANTE: ''},
      {NOMBRE: 'Capital Inicial',                  ACTIVO: 'false', NAME: 'CapIni',          CONSTANTE: ''},
      {NOMBRE: 'Utilidad Del Ejercicio',           ACTIVO: 'false', NAME: 'UtiEje',          CONSTANTE: ''},
      {NOMBRE: 'Utilidad Reinvertida (Acumulado)', ACTIVO: 'false', NAME: 'UtiRei',          CONSTANTE: ''},
      {NOMBRE: 'Incremento De Capital',            ACTIVO: 'false', NAME: 'IncCap',          CONSTANTE: ''},
      {NOMBRE: 'Total Pasivo + Patrimonio',        ACTIVO: 'false', NAME: 'TotalPasivoxPat', CONSTANTE: ''}
    ]
  };

  addTab(nombre: string) {

    let validaExistencia = this.tabs.find(item => item.name === nombre);
    if (!validaExistencia) {
      if (this.tabs.length < 11) {
        let vista = this.Activos.find(item => item.NOMBRE == nombre);
        if (vista == null) {
          vista = this.Pasivos.find(item => item.NOMBRE == nombre);
        }
        
        if (vista) {
          let nuevoIndex = this.getNuevoIndex();
          let nuevoTab: { tabType: number, name: string, componente } = { tabType: 0, name: "", componente: "" };
          nuevoTab.name = nombre;
          nuevoTab.tabType = nuevoIndex;
          switch (vista.CONSTANTE) {
            case NombreComponente.BALANCEINICIAL_CREDITOCLIENTES:
              nuevoTab.componente = BalanceInicialCreditoClientesComponent;
              break;
            case NombreComponente.BALANCEINICIAL_BANCOS:
              nuevoTab.componente = BalanceInicialBancosComponent;
              break;
            case NombreComponente.BALANCEINICIAL_DEUDORESDIVERSOS:
              nuevoTab.componente = BalanceInicialDeudoresDiversosComponent;
              break;
            case NombreComponente.BALANCEINICIAL_CREDITOPROVEEDORES:
              nuevoTab.componente = BalanceInicialCreditoProveedoresComponent;
              break;
            case NombreComponente.BALANCEINICIAL_ACREEDORESDIVERSOS:
              nuevoTab.componente = BalanceInicialAcreedoresDiversosComponent;
              break;
            case NombreComponente.BALANCEINICIAL_DEUDACREDITOS:
              nuevoTab.componente = BalanceInicialDeudaCreditosComponent;
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
          case 4:
            this.figureContainer4.createComponent(factory);
            break;
          case 5:
            this.figureContainer5.createComponent(factory);
            break;
          case 6:
            this.figureContainer6.createComponent(factory);
            break;
          case 7:
            this.figureContainer7.createComponent(factory);
            break;
          case 8:
            this.figureContainer8.createComponent(factory);
            break;
          case 9:
            this.figureContainer9.createComponent(factory);
            break;
          case 10:
            this.figureContainer10.createComponent(factory);
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

}
