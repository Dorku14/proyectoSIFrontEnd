import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE,mascaraMoneda } from 'src/app/sharedModules/constantes';
import { ProductosFabricadosService } from 'src/app/services/ProductosFabricados.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-detalle-producto-fabricado',
  templateUrl: './detalle-producto-fabricado.component.html',
  styleUrls: ['./../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss']
})

export class DetalleProductoFabricadoComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda:any;
  constructor(public dialogRef: MatDialogRef<DetalleProductoFabricadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public ProductoFSrv: ProductosFabricadosService,
    private peticiones: PeticionesWebComponent,
    public funcGenerales: FuncionesGenerales) {
      this.mascaraMoneda = mascaraMoneda;

  }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.definirModo();
    this.ProductoFSrv.incicializarVariables();
  }

  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de productos fabricados';
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle del producto fabricado';
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
      case 'COSTO_PRODUCCION':
        respuesta = this.funcGenerales.permiteNumerico(this.ProductoFSrv.COSTO_PRODUCCION,valorS);
        break;
      case 'COSTO_ACTUALIZADO':
        respuesta = this.funcGenerales.permiteNumerico(this.ProductoFSrv.COSTO_ACTUALIZADO,valorS);
        break;
      case 'PRECIO_VENTA':
        respuesta = this.funcGenerales.permiteNumerico(this.ProductoFSrv.PRECIO_VENTA,valorS);
        break;
      case 'PRECIO_VENT_ACT':
        respuesta = this.funcGenerales.permiteNumerico(this.ProductoFSrv.PRECIO_VENT_ACT,valorS);
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
    json.CODIGO = item.CODIGO;;
    this.peticiones.peticionPost(json, 'detalleProductosF').then((resultado: any) => {
      console.log(resultado);
      let datos = resultado.datos[0];
      this.llenarCampoDetalle(datos);
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }


  llenarCampoDetalle(datos: any) {
    this.ProductoFSrv.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    if (this.funcGenerales.EsVacioNulo(this.ProductoFSrv.CODIGO)) {
      alert('El campo código no debe estar vacío');
    } else {

      let json: any = {};
      json.CODIGO = this.ProductoFSrv.CODIGO;
      json.PRODUCTO = this.ProductoFSrv.PRODUCTO;
      json.CANTIDAD = this.ProductoFSrv.CANTIDAD;
      json.COSTO_PRODUCCION = this.ProductoFSrv.COSTO_PRODUCCION;
      json.PRECIO_VENTA = this.ProductoFSrv.PRECIO_VENTA;
      json.COSTO_ACTUALIZADO = this.ProductoFSrv.COSTO_ACTUALIZADO;
      json.PRECIO_VENT_ACT = this.ProductoFSrv.PRECIO_VENT_ACT;
      // json.INVENTARIO = this.ProductoFSrv.INVENTARIO;
      json.PUNTO_REORDEN = this.ProductoFSrv.PUNTO_REORDEN;
      console.log(json);
      switch (this.modo) {
        case MODO.ALTA:
          json.ESTATUS = 'A';
          this.validaRegistro().then((resultado) => {
            if (resultado === NOEXISTE) {
              this.peticiones.peticionPost(json, 'altaProductosF').then((resultado: any) => {
                console.log('resultado then');
                console.log(resultado);
                this.quitarCargando();
                this.ProductoFSrv.incicializarVariables();
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
          this.peticiones.peticionPost(json, 'modificarProductoF').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.ProductoFSrv.incicializarVariables();
            this.CerrarVentana();
          }).catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
          break;
        case MODO.REACTIVAR:
          json.ESTATUS = 'A';
          this.peticiones.peticionPost(json, 'reactivarProductoF').then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            this.quitarCargando();
            this.ProductoFSrv.incicializarVariables();
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
      if (!this.funcGenerales.EsVacioNulo(this.ProductoFSrv.CODIGO))
        this.mostrarCargado();
      let json: any = {};
      json.CODIGO = this.ProductoFSrv.CODIGO;
      this.peticiones.peticionPost(json, 'detalleProductosF').then((resultado: any) => {
        this.quitarCargando();
        let codigoR = this.funcGenerales.extraerCodigo(resultado)
        if (this.funcGenerales.extraerCodigo(resultado) == '00') {
          let datos = resultado.datos[0];
          this.datosTemporales = datos;
          if (datos.ESTATUS === 'B') {
            this.funcGenerales.popUpAlerta('Error', 'El producto ya existe pero está dado de baja, ¿Deseas reactivarlo?', 'Si', 'No').then((respuesta) => {
              if (respuesta) {
                this.reactivar();
              } else {
                this.funcGenerales.otorgaFoco('codigo');

              }
            });
          } else {
            this.funcGenerales.popUpAlerta('Error', 'El producto ya existe', 'Aceptar', '').then((respuesta) => {
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
    switch (campo) {
      case 'COSTO_PRODUCCION':
        if(this.funcGenerales.EsVacioNulo(this.ProductoFSrv.COSTO_PRODUCCION))
        this.ProductoFSrv.COSTO_PRODUCCION = 0;
        break;
      case 'COSTO_ACTUALIZADO':
        if(this.funcGenerales.EsVacioNulo(this.ProductoFSrv.COSTO_ACTUALIZADO))
        this.ProductoFSrv.COSTO_ACTUALIZADO = 0;
        break;
      case 'PRECIO_VENTA':
        if(this.funcGenerales.EsVacioNulo(this.ProductoFSrv.PRECIO_VENTA))
        this.ProductoFSrv.PRECIO_VENTA = 0;
        break;
      case 'PRECIO_VENT_ACT':
        if(this.funcGenerales.EsVacioNulo(this.ProductoFSrv.PRECIO_VENT_ACT))
        this.ProductoFSrv.PRECIO_VENT_ACT = 0;
        break;
    }
  }
  ObtenerFoco(e) {
    e.target.select()
  }
}
