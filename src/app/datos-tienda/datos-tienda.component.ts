import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { MODO, EXITO, NOEXISTE, mascaraMoneda } from 'src/app/sharedModules/constantes';
import { ConfiguracionCajaService } from 'src/app/services/ConfiguracionCaja.service';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';

@Component({
  selector: 'app-datos-tienda',
  templateUrl: './datos-tienda.component.html',
  styleUrls: ['./../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss'],
})
export class DatosTiendaComponent implements OnInit {
  TituloVentana:string;
  dataSource: Array<any>;
  isCargando:boolean;
  indiceTabsActivo:number = 0;
  mascaraMoneda: any;
  modo: any;
  listaPosicion: Array<{ ID, Descrip }>;
  constructor(public peticiones: PeticionesWebComponent, public dialogRef: MatDialogRef<DatosTiendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public ConfiguracionCajaSRV: ConfiguracionCajaService, private funcGenerales:FuncionesGenerales) {
      this.TituloVentana ="Datos de la tienda";
      this.mascaraMoneda = mascaraMoneda;
     }

  ngOnInit(): void {
    this.generarPosicion();
    this.ConfiguracionCajaSRV.incicializarVariables();
    this.consulta();
  }

  consulta(){
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'detalleConfiguracionCaja').then((resultado: any) => {
      console.log(resultado);
      this.validarModo(resultado);
      this.dataSource = resultado;
      this.quitarCargando();;
    }).catch((error) => {
      console.log(error);
      this.isCargando = false;
      this.quitarCargando();
    });
    if(this.modo = MODO.MODIFICAR){
      this.consultaDetalle(1);
    }
  }

  validarModo($resulato){
    let valor = this.funcGenerales.extraerCodigo($resulato);
    if(valor == NOEXISTE){
      this.modo = MODO.ALTA;
    }
    else{
      this.modo = MODO.MODIFICAR;
    }
    
  }

  CerrarVentana(){
    this.dialogRef.close();
  }

  guardar(){
    let json = this.ConfiguracionCajaSRV.dameJsonEntrada();
      switch (this.modo) {
        case MODO.ALTA:
          this.peticiones.peticionPost(json, 'altaConfiguracionCaja').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.ConfiguracionCajaSRV.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
        case MODO.MODIFICAR:
          this.peticiones.peticionPost(json, 'modificarConfiguracionCaja').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.ConfiguracionCajaSRV.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
      }
  }

  consultaDetalle(item) {
    this.mostrarCargado();
    let json: any = {};
    json.ID = item;
    this.peticiones.peticionPost(json, 'detalleConfiguracionCaja').then((resultado: any) => {
      let datos = resultado.datos[0];
      this.ConfiguracionCajaSRV.llenarCampos(datos);
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }

  tabsActivos=(indice :number)=>{
    return this.funcGenerales.tabsActivos(indice, this.indiceTabsActivo);
  }

  validarTyping(e, campo) {
    let respuesta: boolean = true;
    let valor = Number(e.key);
    let valorS = e.key;
    switch (campo) {
      case 'Tiempo':
        if (isNaN(valor)) {
          respuesta = false;
        }
        break;
      case 'MONTO_MINIMO':
        respuesta = this.funcGenerales.permiteNumerico(this.ConfiguracionCajaSRV.MONTO_MINIMO, valorS);
        break;
    }
    return respuesta;
  }

  generarPosicion() {
    this.listaPosicion = [
      { ID: 'I', Descrip: 'Izquierda' },
      { ID: 'D', Descrip: 'Derecha' }
    ]
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
}
