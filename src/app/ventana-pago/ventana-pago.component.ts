import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosComercialesService } from 'src/app/services/ProductosComerciales.service';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE, mascaraMoneda } from 'src/app/sharedModules/constantes';

@Component({
  selector: 'app-ventana-pago',
  templateUrl: './ventana-pago.component.html',
  styleUrls: ['./../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss'],
})
export class VentanaPagoComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  mascaraMoneda: any;
  listaMembresias = [
    {Nombre:"1 mes",value: 0, costo:100},
    {Nombre:"3 mes",value: 1,costo:300},
    {Nombre:"1 año",value: 2,costo:600},

  ]
  Tipo_membresia = 0;
  Nombre_tarjeta = null;
  Fecha_vencimiento = null;
  CCV = null
  constructor(
    public dialogRef: MatDialogRef<VentanaPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales) {
    this.mascaraMoneda = mascaraMoneda;
  }

  ngOnInit(): void {
    // this.modo = this.data.Proceso;
    // this.itemSeleccionado = this.data.item;
    this.definirModo();
  }


  definirModo() {
    this.TituloVentana = 'Pagar membresia';
  }

  CerrarVentana() {
    this.dialogRef.close();
  }

  validarTyping(e, campo) {
    // let respuesta: boolean = true;
    // let valor = Number(e.key);
    // let valorS = e.key;

    // // if (isNaN(valor)) {
    // //   respuesta = false;
    // // }
    // return respuesta;
  }

  consultaDetalle(item) {
    this.mostrarCargado();

    let json: any = {};
    json.CODIGO = item.CODIGO;
    this.peticiones
      .peticionPost(json, 'detalleProductoC')
      .then((resultado: any) => {
        (resultado);
        let datos = resultado.datos[0];
        this.llenarCampoDetalle(datos);
      })
      .catch((error) => {
        (error);
        this.quitarCargando();
      });
  }

  llenarCampoDetalle(datos: any) {
    // this.PRODC.llenarCampos(datos);
    this.quitarCargando();
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    this.mostrarCargado();
    this.funcGenerales.pausa(2000).then(()=>{
      this.dialogRef.close();
      this.quitarCargando();
    })

  }

  validaRegistro() {

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

  }

  ObtenerFoco(e) {
    e.target.select()
  }

  
}
