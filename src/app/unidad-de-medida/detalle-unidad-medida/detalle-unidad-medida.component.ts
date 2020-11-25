import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE } from 'src/app/sharedModules/constantes';
import { CategoriaService } from 'src/app/services/Categoria.service';
import { UnidadDeMedidaService } from 'src/app/services/UnidadDeMedida.service';


@Component({
  selector: 'app-detalle-unidad-medida',
  templateUrl: './detalle-unidad-medida.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss']
})
export class DetalleUnidadMedidaComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  constructor(public dialogRef: MatDialogRef<DetalleUnidadMedidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public UniSrv: UnidadDeMedidaService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {

  }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.UniSrv.incicializarVariables();
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de unidad de medida';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de unidad de medida';
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
    // switch (campo) {
    //   case 'CANTIDAD':
    //     if (isNaN(valor)) {
    //       respuesta = false;
    //     }
    //     break;
    // }
    if (isNaN(valor)) {
      respuesta = false;
    }
    return respuesta;
  }


  consultaDetalle(item) {
    this.mostrarCargado();


    let json: any = {};
    json.NOMBRE = item.NOMBRE;;
    this.peticiones.peticionPost(json, 'detalleUnidadMedida').then((resultado: any) => {
      console.log(resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }


  llenarCampoDetalle(datos: any) {
    this.UniSrv.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.UniSrv.NOMBRE)) {
      alert('El campo nombre no debe estar vacío');
    } else {

      let json: any = {};
      json.NOMBRE = this.UniSrv.NOMBRE;
      json.ABREVIACION = this.UniSrv.ABREVIACION;
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones.peticionPost(json, 'altaUnidadMedida').then((resultado: any) => {
                console.log('resultado then');
                console.log(resultado);
                this.quitarCargando();
                this.UniSrv.incicializarVariables();
                this.CerrarVentana();
              }).catch((error) => {
                console.log('error');
                console.log(error);
                this.quitarCargando();
              });
            }
          });
          break;
        case MODO.MODIFICAR:
          this.peticiones.peticionPost(json, 'modificarUnidadMedida').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.UniSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones.peticionPost(json, 'reactivarUnidadMedida').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.UniSrv.incicializarVariables();
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
      if (!this.funcGenerales.EsVacioNulo(this.UniSrv.NOMBRE))
        this.mostrarCargado();
      let json: any = {};
      json.NOMBRE = this.UniSrv.NOMBRE;
      this.peticiones.peticionPost(json, 'detalleUnidadMedida').then((resultado: any) => {
        this.quitarCargando();
        let codigoR = this.funcGenerales.extraerCodigo(resultado)
        if (this.funcGenerales.extraerCodigo(resultado) == '00') {
          let datos = resultado.datos[0];
          this.datosTemporales = datos;
          if (datos.ESTATUS === 'B') {
            this.funcGenerales.popUpAlerta('Error', 'La unidad de medida ya existe pero está dado de baja, ¿Deseas reactivarlo?', 'Si', 'No').then((respuesta) => {
              if (respuesta) {
                this.reactivar();
              } else {
                this.funcGenerales.otorgaFoco('codigo');

              }
            });
          } else {
            this.funcGenerales.popUpAlerta('Error', 'la unidad de medida ya existe', 'Aceptar', '').then((respuesta) => {
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
    this.guardar();
  }

  presionaBoton(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      this.CerrarVentana();
    }
  }

  ObtenerFoco(e){
    e.target.select()
  }
}
