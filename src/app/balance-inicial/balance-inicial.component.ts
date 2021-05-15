import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { MatDialog} from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MODO, mascaraMoneda } from 'src/app/sharedModules/constantes';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { NombreComponente } from '../sharedModules/constantes';
import { BalanceInicialBancosComponent} from '../balance-inicial/balance-inicial-bancos/balance-inicial-bancos.component';
import { BalanceInicialCreditoClientesComponent} from '../balance-inicial/balance-inicial-credito-clientes/balance-inicial-credito-clientes.component';
import { BalanceInicialDeudoresDiversosComponent} from '../balance-inicial/balance-inicial-deudores-diversos/balance-inicial-deudores-diversos.component';
import { BalanceInicialCreditoProveedoresComponent} from '../balance-inicial/balance-inicial-credito-proveedores/balance-inicial-credito-proveedores.component';
import { BalanceInicialAcreedoresDiversosComponent} from '../balance-inicial/balance-inicial-acreedores-diversos/balance-inicial-acreedores-diversos.component';
import { BalanceInicialDeudaCreditosComponent} from '../balance-inicial/balance-inicial-deuda-creditos/balance-inicial-deuda-creditos.component';
import { BalanceInicialMateriaPrimaComponent } from '../balance-inicial/balance-inicial-materia-prima/balance-inicial-materia-prima.component';
import { BalanceInicialProductoComercialComponent } from '../balance-inicial/balance-inicial-producto-comercial/balance-inicial-producto-comercial.component';
import { BalanceInicialProductoFabricadoComponent } from '../balance-inicial/balance-inicial-producto-fabricado/balance-inicial-producto-fabricado.component';
import { BalanceInicialActivosFijosComponent } from '../balance-inicial/balance-inicial-activos-fijos/balance-inicial-activos-fijos.component';
import { balanceinicialService } from 'src/app/services/balanceInicial.service';

@Component({
  selector: 'app-balance-inicial',
  templateUrl: './balance-inicial.component.html',
  styleUrls: ['./balance-inicial.component.scss']
})
export class BalanceInicialComponent implements OnInit {

  Activos: any;
  ActivosFijos: any;
  Pasivos: any;
  Capital: any;
  componenteAabrir: any;
  mascaraMoneda: any;
  modo: any;
  isCargando: boolean;
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

  constructor(
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    public BI:balanceinicialService,
    private peticiones: PeticionesWebComponent,
    ) {
    this.mascaraMoneda = mascaraMoneda; this.tabs.push({ tabType: 0, name: "Balance Inicial", componente: "" })
  }

  ngOnInit(): void {
    this.activos();
    this.activosFijos();
    this.pasivos();
    this.capital();
    // this.BI.incicializarVariables();
    this.consulta();
  }

  activos(){
    this.Activos = [
      {NOMBRE: 'Bancos',                      CONSTANTE: NombreComponente.BALANCEINICIAL_BANCOS},
      {NOMBRE: 'Crédito Clientes',            CONSTANTE: NombreComponente.BALANCEINICIAL_CREDITOCLIENTES},
      {NOMBRE: 'Almacen',                     CONSTANTE: ''},
      {NOMBRE: 'Producto Comercial',          CONSTANTE: NombreComponente.BALANCEINICIAL_PRODUCTOCOMERCIAL},
      {NOMBRE: 'Producto Fabricado',          CONSTANTE: NombreComponente.BALANCEINICIAL_PRODUCTOFABRICADO},
      {NOMBRE: 'Materia Prima',               CONSTANTE: NombreComponente.BALANCEINICIAL_MATERIAPRIMA},
      {NOMBRE: 'Deudores Diversos',           CONSTANTE: NombreComponente.BALANCEINICIAL_DEUDORESDIVERSOS},
    ]
  };

  activosFijos(){
  this.ActivosFijos = [
      {NOMBRE: 'Activos Fijos', CONSTANTE: NombreComponente.BALANCEINICIAL_ACTIVOSFIJOS},
    ]
  };

  pasivos(){
    this.Pasivos = [
      {NOMBRE: 'Crédito Proveedores',        ACTIVO: 'true',  NAME: 'CrePro',           CONSTANTE: NombreComponente.BALANCEINICIAL_CREDITOPROVEEDORES},
      {NOMBRE: 'Provisión IVA Pend.x Pagar', ACTIVO: 'true',  NAME: 'IVAxPag',          CONSTANTE: ''},
      {NOMBRE: 'Acreedores Diversos',        ACTIVO: 'true',  NAME: 'Acree',            CONSTANTE: NombreComponente.BALANCEINICIAL_ACREEDORESDIVERSOS},
      {NOMBRE: 'Nomina Destajo',             ACTIVO: 'false', NAME: 'NomDes',           CONSTANTE: ''},
      {NOMBRE: 'Nomina Indirecta',           ACTIVO: 'false', NAME: 'NomInd',           CONSTANTE: ''},
      {NOMBRE: 'Deuda Por Créditos',         ACTIVO: 'true',  NAME: 'Deuda',            CONSTANTE: NombreComponente.BALANCEINICIAL_DEUDACREDITOS},
      {NOMBRE: 'IVA Por Pagar',              ACTIVO: 'false', NAME: 'IVAPag',           CONSTANTE: ''},
      {NOMBRE: 'Total Corto Plazo',          ACTIVO: 'false', NAME: 'SubTotalPasivos',  CONSTANTE: ''},
      {NOMBRE: 'Total Pasivos',              ACTIVO: 'false', NAME: 'TotalPasivos',     CONSTANTE: ''}
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
    console.log(validaExistencia);
    if (!validaExistencia) {
      if (this.tabs.length < 11) {
        let vista = this.Activos.find(item => item.NOMBRE == nombre);
        if (vista == null) {
          vista = this.ActivosFijos.find(item => item.NOMBRE == nombre);
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
            case NombreComponente.BALANCEINICIAL_MATERIAPRIMA:
              nuevoTab.componente = BalanceInicialMateriaPrimaComponent;
              break;
            case NombreComponente.BALANCEINICIAL_PRODUCTOCOMERCIAL:
              nuevoTab.componente = BalanceInicialProductoComercialComponent;
              break;
            case NombreComponente.BALANCEINICIAL_PRODUCTOFABRICADO:
              nuevoTab.componente = BalanceInicialProductoFabricadoComponent;
              break;
            case NombreComponente.BALANCEINICIAL_ACTIVOSFIJOS:
              nuevoTab.componente = BalanceInicialActivosFijosComponent;
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

  guardar() {
    let json: any = {};
      json.CAJA = this.BI.CAJA;
      json.ALMACEN = this.BI.ALMACEN;
      json.PRODUC_FABRI = this.BI.PRODUC_FABRI;
      json.MATERIA_PRIMA = this.BI.MATERIA_PRIMA;
      json.IVA_ACREDITABLE = this.BI.IVA_ACREDITABLE;
      json.DEUDORES_DIV = this.BI.DEUDORES_DIV;
      json.TOTAL_CIRCULANTE = this.BI.TOTAL_CIRCULANTE;
      console.log(json);
      this.peticiones
            .peticionPost(json, 'altaBalanceInicial')
            .then((resultado: any) => {
              ('resultado then');
              (resultado);
              this.funcGenerales.mensajeConfirmacion('esquinaSupDer','success','','Elemento agredado correctamente',false);
              this.quitarCargando();
              this.BI.incicializarVariables();
            })
            .catch((error) => {
              ('error');
              (error);
              this.funcGenerales.mostrarMensajeError('esquinaSupDer','error','Error',error,false);
              this.quitarCargando();
            });
    this.consulta();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }

  ObtenerFoco(e) {
    e.target.select()
  }

  validarTyping(e, campo) {
    let respuesta: boolean = true;
    let valor = Number(e.key);
    let valorS = e.key;
    switch (campo) {
      case 'CANTIDAD':
        if (isNaN(valor)) {
          respuesta = false;
        }
        break;
      case 'CAJA':
        respuesta = this.funcGenerales.permiteNumerico(this.BI.CAJA, valorS);
        break;
    }
    // if (isNaN(valor)) {
    //   respuesta = false;
    // }
    return respuesta;
  }

  consulta() {
    this.mostrarCargado();
    let json: any = {};
    this.peticiones.peticionPost({}, 'ConsultaBalanceInicial').then((resultado: any) => {
      (resultado);
      this.llenarCampos(resultado);
      console.log(resultado);
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
  }

  llenarCampos(datos: any) {
    console.log(datos);
    this.BI.llenarCampos(datos);
    this.quitarCargando();
  }
}
