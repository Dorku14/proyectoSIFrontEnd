import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FuncionesGenerales } from 'src/app/sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from 'src/app/sharedModules/peticiones-web/peticiones-web.component';
import { MODO, EXITO, NOEXISTE } from 'src/app/sharedModules/constantes';
import { adminEmpresasService } from 'src/app/services/adminEmpresas.service';

@Component({
  selector: 'app-detalle-admin-empresa',
  templateUrl: './detalle-admin-empresa.component.html',
  styleUrls: [
    './../../productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component.scss',
  ],
})
export class DetalleAdminEmpresaComponent implements OnInit {
  modo: any;
  itemSeleccionado: any;
  TituloVentana: string;
  isCargando: boolean;
  datosTemporales: any;
  ListaEstatusEmpresa: Array<{id,Nombre,value}>;
   AdminService: adminEmpresasService
  constructor(
    public dialogRef: MatDialogRef<DetalleAdminEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) { 
      this.AdminService = new adminEmpresasService();

    }

  ngOnInit(): void {
    this.modo = this.data.Proceso;
    this.itemSeleccionado = this.data.item;
    this.AdminService.incicializarVariables();
    this.definirModo();

    this.ListaEstatusEmpresa = [{
      id:1,
      Nombre: 'Activo',
      value:'verified'
    },{
      id:2,
      Nombre: 'Cancelado',
      value:'cancel'
    }]
  }



  definirModo() {
    switch (this.modo) {
      case MODO.ALTA:
        this.TituloVentana = 'Alta de empresa';
        this.AdminService.NUM = this.data.nextIndex;
        break;
      case MODO.MODIFICAR:
        this.TituloVentana = 'Detalle de empresa';
        if (!this.funcGenerales.EsVacioNulo(this.itemSeleccionado)) {
          this.AdminService.llenarCampos(this.itemSeleccionado)
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
      case 'PRECIO_VENTA':
        // respuesta = this.funcGenerales.permiteNumerico(this.MateriaSrv.PRECIO_VENTA,valorS);
        break;
    }
  }

  consultaDetalle(item) {
    this.mostrarCargado();

    let json: any = {};
    json.CODIGO = item.CODIGO;
    this.peticiones
      .peticionPost(json, 'detalleMateriaPrima')
      .then((resultado: any) => {
        (resultado);
        let datos = resultado.datos[0];
        this.llenarCampoDetalle(datos);
        this.quitarCargando();
      })
      .catch((error) => {
        (error);
        this.quitarCargando();
      });
  }

  llenarCampoDetalle(datos: adminEmpresasService) {
    this.AdminService.llenarCampos(datos);
  }

  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
  }
  guardar() {
    this.dialogRef.close(this.AdminService);
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
    switch (campo) {
      case 'PRECIO_VENTA':
        // this.MateriaSrv.PRECIO_VENTA = this.funcGenerales.dameFormatoMoneda(this.MateriaSrv.PRECIO_VENTA, 2);
        break;

    }
  }
  ObtenerFoco(e){
    e.target.select()
  }
}
