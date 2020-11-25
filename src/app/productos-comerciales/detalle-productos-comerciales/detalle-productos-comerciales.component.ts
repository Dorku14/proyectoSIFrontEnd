import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosComercialesService } from 'src/app/services/ProductosComerciales.service';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE } from 'src/app/sharedModules/constantes';

@Component({
  selector: 'app-detalle-productos-comerciales',
  templateUrl: './detalle-productos-comerciales.component.html',
  styleUrls: ['./detalle-productos-comerciales.component.scss'],
})
export class DetalleProductosComercialesComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  constructor(
    public dialogRef: MatDialogRef<DetalleProductosComercialesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public PRODC: ProductosComercialesService,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales
  ) {}

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.PRODC.incicializarVariables();
    this.darFormatoIniciales();
  }
  darFormatoIniciales() {
    this.PRODC.COSTACT = this.funcGenerales.dameFormatoMoneda(
      this.PRODC.COSTACT,
      2
    );
    this.PRODC.PRECIOCOMP = this.funcGenerales.dameFormatoMoneda(
      this.PRODC.PRECIOCOMP,
      2
    );
    this.PRODC.PRECIOVENT = this.funcGenerales.dameFormatoMoneda(
      this.PRODC.PRECIOVENT,
      2
    );
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de productos comerciales';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle del producto comercial';
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
      case 'CANTIDAD':
        if (isNaN(valor)) {
          respuesta = false;
        }
        break;
      case 'PRECIOCOMP':
        respuesta = this.funcGenerales.permiteNumerico(this.PRODC.PRECIOCOMP,valorS);
        break;
      case 'PRECIOVENT':
        respuesta = this.funcGenerales.permiteNumerico(this.PRODC.PRECIOVENT,valorS);
        break;
      case 'COSTACT':
        respuesta = this.funcGenerales.permiteNumerico(this.PRODC.COSTACT,valorS);
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
    json.CODIGO = item.CODIGO;
    this.peticiones
      .peticionPost(json, 'detalleProductoC')
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
    this.PRODC.CODIGO = datos.CODIGO;
    this.PRODC.PRODUCTO = datos.PRODUCTO;
    this.PRODC.CANTIDAD = datos.CANTIDAD;
    this.PRODC.COSTACT = this.funcGenerales.dameFormatoMoneda(datos.COSTACT, 2);
    this.PRODC.PRECIOCOMP = this.funcGenerales.dameFormatoMoneda(
      datos.PRECIOCOMP,
      2
    );
    this.PRODC.PRECIOVENT = this.funcGenerales.dameFormatoMoneda(
      datos.PRECIOVENT,
      2
    );
    let v = this.funcGenerales.dameFormatoNumero(this.PRODC.PRECIOCOMP);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.PRODC.CODIGO)) {
      alert('El campo código no debe estar vacío');
    } else {
      let json: any = {};
      json.CODIGO = this.PRODC.CODIGO;
      json.PRODUCTO = this.PRODC.PRODUCTO;
      json.CANTIDAD = this.PRODC.CANTIDAD;
      json.PRECIOCOMP = this.funcGenerales.dameFormatoNumero(
        this.PRODC.PRECIOCOMP
      );
      json.PRECIOVENT = this.funcGenerales.dameFormatoNumero(
        this.PRODC.PRECIOVENT
      );
      json.COSTACT = this.funcGenerales.dameFormatoNumero(this.PRODC.COSTACT);
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones
                .peticionPost(json, 'altaProductoC')
                .then((resultado: any) => {
                  console.log('resultado then');
                  console.log(resultado);
                  this.quitarCargando();
                  this.PRODC.incicializarVariables();
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
            .peticionPost(json, 'modificarProductoC')
            .then((resultado: any) => {
              console.log('resultado then');
              console.log(resultado);
              this.quitarCargando();
              this.PRODC.incicializarVariables();
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
            .peticionPost(json, 'reactivarProductoC')
            .then((resultado: any) => {
              console.log('resultado then');
              console.log(resultado);
              this.quitarCargando();
              this.PRODC.incicializarVariables();
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
      if (!this.funcGenerales.EsVacioNulo(this.PRODC.CODIGO))
        this.mostrarCargado();
      let json: any = {};
      json.CODIGO = this.PRODC.CODIGO;
      this.peticiones
        .peticionPost(json, 'detalleProductoC')
        .then((resultado: any) => {
          this.quitarCargando();
          let codigoR = this.funcGenerales.extraerCodigo(resultado);
          if (codigoR == '00') {
            let datos = resultado.datos[0];
            this.datosTemporales = datos;
            if (datos.ESTATUS === 'B') {
              this.funcGenerales
                .popUpAlerta(
                  'Error',
                  'El producto ya existe pero está dado de baja, ¿Deseas reactivarlo?',
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
                .popUpAlerta('Error', 'El producto ya existe', 'Aceptar', '')
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

  perderFoco(campo) {
    switch (campo) {
      case 'PRECIOCOMP':
        this.PRODC.PRECIOCOMP = this.funcGenerales.dameFormatoMoneda(
          this.PRODC.PRECIOCOMP,
          2
        );
        break;
      case 'COSTACT':
        this.PRODC.COSTACT = this.funcGenerales.dameFormatoMoneda(
          this.PRODC.COSTACT,
          2
        );
        break;
      case 'PRECIOVENT':
        this.PRODC.PRECIOVENT = this.funcGenerales.dameFormatoMoneda(
          this.PRODC.PRECIOVENT,
          2
        );
        break;
    }
  }

  ObtenerFoco(e){
    e.target.select()
  }
}
