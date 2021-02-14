import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE,mascaraMoneda } from 'src/app/sharedModules/constantes';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-detalle-servicios',
  templateUrl: './detalle-servicios.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss']
})
export class DetalleServiciosComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda:any
  constructor(public dialogRef: MatDialogRef<DetalleServiciosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public ServiciosSrv: ServiciosService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {
      this.mascaraMoneda = mascaraMoneda;
  }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.ServiciosSrv.incicializarVariables();

  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de servicios';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de servicio';
        if (!this.funcGenerales.EsVacioNulo(this.itemSeleccionado)) {
          this.consultaDetalle(this.itemSeleccionado);
        }
        break;
    }
  }
  CerrarVentana() {
    this.dialogRef.close();
  }
  validarTyping(e, campo) {
    let respuesta: boolean = true;
    let valor =e.key;
    switch (campo) {
      case 'PRECIOVENT':
        respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PRECIO_VENT, valor);
        break;
      case 'PRECIO_VENT_ACT':
        respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PRECIO_VENT_ACT,valor);
        break;
      case 'PRECIOPAGO':
        respuesta = this.funcGenerales.permiteNumerico(this.ServiciosSrv.PAGO_EMPLEADO, valor);
        break;
    }
    // if (isNaN(valor)) {
    //   respuesta = false;
    // }
    return respuesta;
  }


  consultaDetalle(item) {
    this.mostrarCargado();


    let json: any = {};
    json.CODIGO = item.CODIGO;;
    this.peticiones.peticionPost(json, 'detalleServicios').then((resultado: any) => {
      (resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
  }


  llenarCampoDetalle(datos: any) {
    this.ServiciosSrv.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.ServiciosSrv.CODIGO)) {
      alert('El campo código no debe estar vacío');
    } else {

      let json: any = {};
      json.CODIGO = this.ServiciosSrv.CODIGO;
      json.ACTIVIDAD = this.ServiciosSrv.ACTIVIDAD;
      json.PRECIO_VENT = this.ServiciosSrv.PRECIO_VENT;
      json.PRECIO_VENT_ACT = this.ServiciosSrv.PRECIO_VENT_ACT;
      json.PAGO_EMPLEADO = this.ServiciosSrv.PAGO_EMPLEADO;
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones.peticionPost(json, 'altaServicios').then((resultado: any) => {
                ('resultado then');
                (resultado);
                this.quitarCargando();
                this.ServiciosSrv.incicializarVariables();
                this.CerrarVentana();
              }).catch((error) => {
                ('error');
                (error);
                this.quitarCargando();
              });
            }
          });
          break;
        case MODO.MODIFICAR:
          this.peticiones.peticionPost(json, 'modificarServicios').then((resultado: any) => {
            ('resultado then');
            (resultado);
            this.quitarCargando();
            this.ServiciosSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            ('error');
            (error);
            this.quitarCargando();
          });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones.peticionPost(json, 'reactivarServicios').then((resultado: any) => {
            ('resultado then');
            (resultado);
            this.quitarCargando();
            this.ServiciosSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            ('error');
            (error);
            this.quitarCargando();
          });
          break;
      }
    }
  }

  validaRegistro() {
    return new Promise((resolve, reject) => {
      if (!this.funcGenerales.EsVacioNulo(this.ServiciosSrv.CODIGO))
        this.mostrarCargado();
      let json: any = {};
      json.CODIGO = this.ServiciosSrv.CODIGO;
      this.peticiones.peticionPost(json, 'detalleServicios').then((resultado: any) => {
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
        (error);
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
    switch (campo) {
      case 'PRECIOVENT':
        if(this.funcGenerales.EsVacioNulo(this.ServiciosSrv.PRECIO_VENT))
        this.ServiciosSrv.PRECIO_VENT = 0;
        break;
      case 'PRECIO_VENT_ACT':
        if(this.funcGenerales.EsVacioNulo(this.ServiciosSrv.PRECIO_VENT_ACT))
        this.ServiciosSrv.PRECIO_VENT_ACT = 0;
        break;
      case 'PRECIOPAGO':
        if(this.funcGenerales.EsVacioNulo( this.ServiciosSrv.PAGO_EMPLEADO))
        this.ServiciosSrv.PAGO_EMPLEADO = 0;
        break;
    }
  }
  ObtenerFoco(e){
    e.target.select()
  }
}
