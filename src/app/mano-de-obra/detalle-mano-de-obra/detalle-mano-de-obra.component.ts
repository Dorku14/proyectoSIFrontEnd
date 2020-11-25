import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE } from 'src/app/sharedModules/constantes';
import { ManoDeObraService } from 'src/app/services/ManoDeObra.service';
import { DetalleUnidadMedidaComponent } from 'src/app/unidad-de-medida/detalle-unidad-medida/detalle-unidad-medida.component';

@Component({
  selector: 'app-detalle-mano-de-obra',
  templateUrl: './detalle-mano-de-obra.component.html',
  styleUrls: [
    './../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss',
  ],
})
export class DetalleManoDeObraComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  ListaUndidadMedida: any = {};
  constructor(
    public dialogRef: MatDialogRef<DetalleManoDeObraComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public ManoSrv: ManoDeObraService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.ManoSrv.incicializarVariables();
    this.inicializarUnidades();
    this.ManoSrv.COSTO = this.funcGenerales.dameFormatoMoneda(this.ManoSrv.COSTO, 2);
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de mano de obra';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de mano de obra';
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
    let valor = Number(e.key);
    let valorS = e.key;
    switch (campo) {
      case 'COSTO':
        respuesta = this.funcGenerales.permiteNumerico(this.ManoSrv.COSTO,2);
        break;
      default:
        if (isNaN(valor)) {
          respuesta = false;
        }
        break;
    }
    return respuesta;
  }

  consultaDetalle(item) {
    this.mostrarCargado();

    let json: any = {};
    json.CODIGO = item.CODIGO;
    this.peticiones
      .peticionPost(json, 'detalleManoDeObra')
      .then((resultado: any) => {
        console.log(resultado);
        let datos = resultado.datos[0];
        this.llenarCampoDetalle(datos);
      })
      .catch((error) => {
        console.log(error);
        this.quitarCargando();
      });
  }

  llenarCampoDetalle(datos: any) {
    this.ManoSrv.llenarCampos(datos);
    this.ManoSrv.COSTO = this.funcGenerales.dameFormatoMoneda(datos.COSTO, 2);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.ManoSrv.CODIGO)) {
      alert('El campo código no debe estar vacío');
    } else {
      let json: any = {};
      json.CODIGO = this.ManoSrv.CODIGO;
      json.ACTIVIDAD = this.ManoSrv.ACTIVIDAD;
      json.UNIDAD_MEDIDA = this.ManoSrv.UNIDAD_MEDIDA;
      json.COSTO = this.ManoSrv.COSTO;
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones
                .peticionPost(json, 'altaManoDeObra')
                .then((resultado: any) => {
                  console.log('resultado then');
                  console.log(resultado);
                  this.quitarCargando();
                  this.ManoSrv.incicializarVariables();
                  this.CerrarVentana();
                })
                .catch((error) => {
                  console.log('error');
                  console.log(error);
                  this.quitarCargando();
                });
            }
          });
          break;
        case MODO.MODIFICAR:
          this.peticiones
            .peticionPost(json, 'modificarManoDeObra')
            .then((resultado: any) => {
              console.log('resultado then');
              console.log(resultado);
              this.quitarCargando();
              this.ManoSrv.incicializarVariables();
              this.CerrarVentana();
            })
            .catch((error) => {
              console.log('error');
              console.log(error);
              this.quitarCargando();
            });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones
            .peticionPost(json, 'reactivarManoDeObra')
            .then((resultado: any) => {
              console.log('resultado then');
              console.log(resultado);
              this.quitarCargando();
              this.ManoSrv.incicializarVariables();
              this.CerrarVentana();
            })
            .catch((error) => {
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
      if (!this.funcGenerales.EsVacioNulo(this.ManoSrv.CODIGO))
        this.mostrarCargado();
      let json: any = {};
      json.CODIGO = this.ManoSrv.CODIGO;
      this.peticiones
        .peticionPost(json, 'detalleManoDeObra')
        .then((resultado: any) => {
          this.quitarCargando();
          let codigoR = this.funcGenerales.extraerCodigo(resultado);
          if (this.funcGenerales.extraerCodigo(resultado) == '00') {
            let datos = resultado.datos[0];
            this.datosTemporales = datos;
            if (datos.ESTATUS === 'B') {
              this.funcGenerales
                .popUpAlerta(
                  'Error',
                  'El servicio ya existe pero está dado de baja, ¿Deseas reactivarlo?',
                  'Si',
                  'No'
                )
                .then((respuesta) => {
                  if (respuesta) {
                    this.reactivar();
                  } else {
                    this.funcGenerales.otorgaFoco('codigo');
                  }
                });
            } else {
              this.funcGenerales
                .popUpAlerta('Error', 'El servicio ya existe', 'Aceptar', '')
                .then((respuesta) => {
                  this.funcGenerales.otorgaFoco('codigo');
                });
            }
            resolve(this.funcGenerales.extraerCodigo(resultado));
          }
          resolve(codigoR);
        })
        .catch((error) => {
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

  inicializarUnidades() {
    let json = {};
    this.peticiones.peticionPost(json, 'consultaUnidadMedida').then((resultado: any) => {
      console.log('resultado then');
      console.log(resultado);
      this.quitarCargando();
      this.ListaUndidadMedida = resultado;
      for (let item of resultado) {
        let id = 1;
        this.ListaUndidadMedida.ID = id;
        this.ListaUndidadMedida.NOMBRE = resultado.NOMBRE;
        id++;
      }

    }).catch((error) => {
      console.log('error');
      console.log(error);
      this.quitarCargando();
    });
  }

  /**
  *\brief   Función que invoca la ventana del detalle
  *\author  Alexis Osvaldo Dorantes Ku
  *\date    23/09/2020
  *\version	1.00.00
  @param[in] -> el modo en el que se comportará la ventana
*/
  ventanaDetalle(Modo) {
    var width = '45vh';
    var height = '25vh';

    const dialogRef = this.dialog.open(DetalleUnidadMedidaComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
        item: this.itemSeleccionado,
      },
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        this.inicializarUnidades();
      });
    });
  }
  perderFoco(campo) {
    switch (campo) {
      case 'COSTO':
        this.ManoSrv.COSTO = this.funcGenerales.dameFormatoMoneda(this.ManoSrv.COSTO, 2);
        break;
    }
  }
  ObtenerFoco(e){
    e.target.select()
  }
}
