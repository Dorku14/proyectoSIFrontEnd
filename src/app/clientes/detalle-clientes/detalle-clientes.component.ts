import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE, mascaraMoneda } from 'src/app/sharedModules/constantes';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { EditableColumn } from 'primeng/table';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FechasNoObligatorio } from 'src/app/sharedModules/fechasNoObligatorio.adapter';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { AppFechasAdapter, APP_DATE_FORMATS } from '../../../app/sharedModules/fechas.adapter';
import { creditoXclienteService } from 'src/app/services/creditoXcliente.service';
import { abonoService } from 'src/app/services/abono.service';
@Component({
  selector: 'app-detalle-clientes',
  templateUrl: './detalle-clientes.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: FechasNoObligatorio },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]

})
export class DetalleClientesComponent implements OnInit {
  modo: any;
  @ViewChildren(EditableColumn) private editableColumns: QueryList<EditableColumn>;
  @ViewChild('fechaAntiguedad', { static: false }) fechaAntiguedad: ElementRef;
  @ViewChild('fechaNacimiento', { static: false }) fechaNacimiento: ElementRef;
  @ViewChild('filtroFecha', { static: false }) filtroFecha: ElementRef;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any
  dataSource: Array<any> = [];
  columns: any;
  validando: any;
  activarSlide: boolean = false;
  deshabilitarSlide: boolean;
  datos = { 'NUM': 0, 'NUMERO_CTA': '', 'BANCO': '' };
  campoMonto:boolean = false;
  indiceTabsActivo:number = 0;
  public mask = {
    guide: true, showMask: true, pipe: createAutoCorrectedDatePipe('dd/mm/yyyy'), keepCharPositions: true, mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  labelSlide: string;
  constructor(public dialogRef: MatDialogRef<DetalleClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public clientesSrv: ClientesService,
    public creditoSrv: creditoXclienteService,
    public abonosSrv: abonoService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {
    this.mascaraMoneda = mascaraMoneda;
  }

  ngOnInit(): void {
    this.funcGenerales.pausa(300).then(() => {
      this.funcGenerales.otorgaFoco('nombres');
    });
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.clientesSrv.incicializarVariables();
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de clientes';
        this.obtenerSiguienteClave();
        this.activarSlide = true;
        this.funcGenerales.pausa(150).then(() => {
          this.filtroFecha.nativeElement.value = this.funcGenerales.dameFechaString(new Date());
        });
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de clientes';
        if (!this.funcGenerales.EsVacioNulo(this.itemSeleccionado)) {
          this.consultaDetalle(this.itemSeleccionado);
        }
        break;
    }
  }
  obtenerSiguienteClave() {
    this.mostrarCargado();
    let json: any = {};
    this.peticiones.peticionPost(json, 'dameClaveSigClientes').then((resultado: any) => {
      console.log(resultado);
      this.clientesSrv.ID = resultado;
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }
  CerrarVentana() {
    this.clientesSrv.incicializarVariables();
    this.dialogRef.close();
  }
  validarTyping(e, campo) {
    let respuesta: boolean = true;
    let valor = e.key;
    // switch (campo) {
    //   case 'NOMBRES':
    //     respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PRECIO_VENT, valor);
    //     break;
    //   case 'APELLIDO_P':
    //     respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PRECIO_VENT_ACT,valor);
    //     break;
    //   case 'APELLIDO_M':
    //     respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PAGO_EMPLEADO, valor);
    //     break;
    // }
    // if (isNaN(valor)) {
    //   respuesta = false;
    // }
    return respuesta;
  }


  consultaDetalle(item) {
    this.mostrarCargado();
    let json: any = {};
    json.ID = item.ID;
    this.peticiones.peticionPost(json, 'detalleClientes').then((resultado: any) => {
      console.log(resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
      this.activarSlide = datos.ESTATUS == 'A' ? true : false;
      this.fechaAntiguedad.nativeElement.value = this.funcGenerales.dameFechaString(new Date(datos.created_at));
      this.clientesSrv.FECHA_NACIMIENTO = this.funcGenerales.fechaFormatoYYMMDDtoDDMMYY(datos.FECHA_NACIMIENTO);
      this.fechaNacimiento.nativeElement.value = this.clientesSrv.FECHA_NACIMIENTO;
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }


  llenarCampoDetalle(datos: any) {
    this.clientesSrv.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.clientesSrv.NOMBRES) && this.funcGenerales.EsVacioNulo(this.clientesSrv.APELLIDO_M) && this.funcGenerales.EsVacioNulo(this.clientesSrv.APELLIDO_P)) {
      alert('El campo Nombre no debe estar vacío');
    } else {

      let json: any = {};
      json.ID = this.clientesSrv.ID;
      json.NOMBRES = this.clientesSrv.NOMBRES;
      json.APELLIDO_P = this.clientesSrv.APELLIDO_P;
      json.APELLIDO_M = this.clientesSrv.APELLIDO_M;
      json.DIRECCION = this.clientesSrv.DIRECCION;
      json.FACEBOOK = this.clientesSrv.FACEBOOK;
      json.CORREO = this.clientesSrv.CORREO;
      json.RFC = this.clientesSrv.RFC;
      json.TELEFONO = this.clientesSrv.TELEFONO
      json.ESTATUS = this.activarSlide ? 'A' : 'B';
      json.FECHA_NACIMIENTO = this.fechaNacimiento.nativeElement.value == '__/__/____' ? '' : this.fechaNacimiento.nativeElement.value;
      switch (this.modo) {
        case MODO.ALTA:
          this.peticiones.peticionPost(json, 'altaClientes').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.clientesSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });


          break;
        case MODO.MODIFICAR:
          this.peticiones.peticionPost(json, 'modificarClientes').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.clientesSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones.peticionPost(json, 'reactivarServicios').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.clientesSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
      }
    }
  }

  validaRegistro() {
    return new Promise((resolve, reject) => {
      if (!this.funcGenerales.EsVacioNulo(this.clientesSrv.NOMBRES) && !this.funcGenerales.EsVacioNulo(this.clientesSrv.APELLIDO_M) && !this.funcGenerales.EsVacioNulo(this.clientesSrv.APELLIDO_P))
        this.mostrarCargado();
      let json: any = {};
      json.NOMBRES = this.clientesSrv.NOMBRES;
      this.peticiones.peticionPost(json, 'detalleClientes').then((resultado: any) => {
        this.quitarCargando();
        let codigoR = this.funcGenerales.extraerCodigo(resultado)
        if (this.funcGenerales.extraerCodigo(resultado) == '00') {
          let datos = resultado.datos[0];
          this.datosTemporales = datos;
          if (datos.ESTATUS === 'B') {
            this.funcGenerales.popUpAlerta('Error', 'El servicio ya existe pero está dado de baja, ¿Deseas reactivarlo?', 'Si', 'No').then((respuesta) => {
              if (respuesta) {
                this.reactivar();
              } else {
                this.funcGenerales.otorgaFoco('codigo');

              }
            });
          } else {
            this.funcGenerales.popUpAlerta('Error', 'El servicio ya existe', 'Aceptar', '').then((respuesta) => {
              this.funcGenerales.otorgaFoco('codigo');

            });

          }
          resolve(this.funcGenerales.extraerCodigo(resultado));
        }
        resolve(codigoR);

      }).catch((error) => {
        console.log(error);
        this.quitarCargando();
        reject();
      });
    });

  }

  reactivar() {
    this.modo = MODO.REACTIVAR;
    this.llenarCampoDetalle(this.datosTemporales);
  }

  presionaBoton(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      this.CerrarVentana();
    }
  }

  perderFoco(campo) {
    // switch (campo) {
    //   case 'PRECIOVENT':
    //     if(this.funcGenerales.EsVacioNulo(this.ServiciosSrv.PRECIO_VENT))
    //     this.ServiciosSrv.PRECIO_VENT = 0;
    //     break;
    //   case 'PRECIO_VENT_ACT':
    //     if(this.funcGenerales.EsVacioNulo(this.ServiciosSrv.PRECIO_VENT_ACT))
    //     this.ServiciosSrv.PRECIO_VENT_ACT = 0;
    //     break;
    //   case 'PRECIOPAGO':
    //     if(this.funcGenerales.EsVacioNulo( this.ServiciosSrv.PAGO_EMPLEADO))
    //     this.ServiciosSrv.PAGO_EMPLEADO = 0;
    //     break;
    // }
  }
  ObtenerFoco(e) {
    e.target.select()
  }

  terminarProcesoEditar(e) {
    if (!this.validando) {
      this.validando = true;
      let buscarItem = this.dataSource.find(item => item.NUM === e.index);
      e.data = buscarItem;
      let coincidencias = 0;
      let duplicado = false;
      let indexDuplicado = 0;
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].NUMERO_CTA === buscarItem.NUMERO_CTA) {
          coincidencias++
          if (coincidencias > 1) {
            duplicado = true;
            indexDuplicado = i;
            break;
          }
        }
      }

      if (duplicado) {
        console.log(this.editableColumns);
        this.funcGenerales.popUpAlerta('Error', 'Ya has capturado esta materia prima para este producto fabricado', 'Aceptar', '').then(() => {
          this.validando = false;
          let columna = this.editableColumns.find(e => e.rowIndex === buscarItem.NUM);
          columna.openCell();
        });

      } else {
        this.validando = false;
      }
    }

  }

  inicarProcesoEdicion(e) {
    let index = e.index ? e.index : e;
    let buscarItem = this.dataSource.find(item => item.NUM === index);
    setTimeout(() => {
      this.itemSeleccionado = buscarItem;
    }, 5);

  }

  /**
 *\brief   Función que invoca el componente detalle y ponerlo en modo alta
 *\author  Alexis Osvaldo Dorantes Ku
 *\date    23/09/2020
 *\version	1.00.00
*/
  agregar() {
    let siguienteIndice = this.dataSource.length + 1;
    if (!this.validaCamposVacios()) {
      if (this.datos.NUMERO_CTA) {
        this.datos[this.EncontrarIndice(this.datos.NUMERO_CTA)] = this.datos;
      }
      else {
        this.datos.NUM = siguienteIndice = this.dataSource.length + 1;
        this.dataSource.push(this.datos);
      }

      this.dataSource = [...this.dataSource];
      this.datos = { 'NUM': 0, 'NUMERO_CTA': '', 'BANCO': '' };
    }
  }

  validaCamposVacios(): boolean {
    let campoVacio = false;
    let buscar = this.dataSource.find(item => item.NUMERO_CTA === '');
    if (buscar) {
      campoVacio = true;
      let indice = this.dataSource.findIndex(item => item.NUMERO_CTA === '');
      this.itemSeleccionado = this.dataSource[indice];
      this.funcGenerales.popUpAlerta('Error', 'No se ha capturado el código en la fila ' + buscar.NUM, 'ACEPTAR', '').then(() => {
      });
    }
    return campoVacio;
  }
  EncontrarIndice(id: string): number {
    let index = -1;
    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].NUM === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  obetenerEstadoSlide() {
    if (this.activarSlide) {
      this.labelSlide = 'Activo';
    } else {
      this.labelSlide = 'Baja'
    }
    return this.activarSlide;
  }
  perderFocoDate(picker) {
    console.log(picker);
  }

  /**
   *\brief     Cierra el selector de fecha
    *\author    Sergio Antonio Chan Samos
    *\date      06/08/2020
    *\version	 1.00.00
  */
  CierraVentanaFecha() {
    this.fechaNacimiento.nativeElement.focus();
  }
  /**
   *\brief     Muestra el selector de fecha
   *\author    Sergio Antonio Chan Samos
   *\date      30/06/2020
   *\version	 1.00.00
  */
  muestraVentanaFecha(elemFecha) {
    elemFecha.open();
  }

  tabsActivos=(indice :number)=>{
    return this.funcGenerales.tabsActivos(indice, this.indiceTabsActivo);
  }
}
