import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE } from 'src/app/sharedModules/constantes';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ImpuestosService } from 'src/app/services/impuestos.service';


@Component({
  selector: 'app-detalle-impuestos',
  templateUrl: './detalle-impuestos.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss']
})
export class DetalleImpuestosComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  constructor(public dialogRef: MatDialogRef<DetalleImpuestosComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public ImpustoSrv: ImpuestosService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {

  }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.ImpustoSrv.incicializarVariables();


  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de impuestos';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de impuesto';
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
      case 'PROCENTAJE':
        respuesta = this.funcGenerales.permiteNumerico(this.ImpustoSrv.PORCENTAJE, valor);
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
    json.NOMBRE = item.NOMBRE;;
    this.peticiones.peticionPost(json, 'detalleImpuestos').then((resultado: any) => {
      (resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
    }).catch((error) => {
      (error);
      this.quitarCargando();
    });
  }


  llenarCampoDetalle(datos: any) {
    this.ImpustoSrv.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.ImpustoSrv.NOMBRE)) {
      alert('El campo código no debe estar vacío');
    } else {

      let json: any = {};
      json.NOMBRE = this.ImpustoSrv.NOMBRE;
      json.PORCENTAJE = this.ImpustoSrv.PORCENTAJE;
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones.peticionPost(json, 'altaImpuestos').then((resultado: any) => {
                ('resultado then');
                (resultado);
                this.quitarCargando();
                this.ImpustoSrv.incicializarVariables();
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
          this.peticiones.peticionPost(json, 'modificarImpuestos').then((resultado: any) => {
            ('resultado then');
            (resultado);
            this.quitarCargando();
            this.ImpustoSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            ('error');
            (error);
            this.quitarCargando();
          });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones.peticionPost(json, 'reactivareImpuestos').then((resultado: any) => {
            ('resultado then');
            (resultado);
            this.quitarCargando();
            this.ImpustoSrv.incicializarVariables();
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
      if (!this.funcGenerales.EsVacioNulo(this.ImpustoSrv.NOMBRE))
        this.mostrarCargado();
      let json: any = {};
      json.NOMBRE = this.ImpustoSrv.NOMBRE;
      this.peticiones.peticionPost(json, 'detalleImpuestos').then((resultado: any) => {
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
      case 'PORCENTAJE':
        // this.ImpustoSrv.PORCENTAJE = this.funcGenerales.dameFormatoMoneda(this.ImpustoSrv.PORCENTAJE, 2);
        break;

    }
  }
  ObtenerFoco(e){
    e.target.select()
  }
}
