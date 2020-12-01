import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from '../../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { EXITO, MODO, NOEXISTE } from '../../sharedModules/constantes';
import { EditableColumn, Table } from 'primeng/table';
import { ServiciosService } from '../../services/servicios.service';
import { MatSelect } from '@angular/material/select';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { BusquedasComponent } from 'src/app/sharedModules/busquedas/busquedas.component';

@Component({
  selector: 'app-compras-producto',
  templateUrl: './detalle-compras.component.html',
  styleUrls: ['./detalle-compras.component.scss']
})

export class DetalleComprasComponent implements OnInit {
  @ViewChild('CampoSelectPF', { static: false }) CampoSelectPF: MatSelect;
  @ViewChildren(EditableColumn) private editableColumns: QueryList<EditableColumn>;
  @ViewChild(EditableColumn) editableColumn: EditableColumn;
  tipoProd
  dataSource: Array<any> = [];
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  datos = { 'NUM': 0, 'CODIGO_PROD': '', 'DESCRIPCION': '', 'CANTIDAD': 0, 'COSTO': 0, 'ASIGNADO': "0", 'IVA_PROD': "0", 'TOTAL': 0 };
  @ViewChild('dt') table: Table;
  Nombrecatalogo: any;
  tipoDoc: any;
  listaDocumentos: any;
  listaMaterasP: any;
  colorSelect = 'primary';
  validando = false;
  Proveedor: any;
  formaDePago: any;
  listaFormasPago: any;
  importeSINIVA: any;
  IVA: any;
  Total: any;
  Folio: any;
  NumDecimales: number = 2;
  constructor(private peticiones: PeticionesWebComponent,
    public ServiciosService: ServiciosService,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DetalleComprasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private renderer: Renderer2) {
    this.isCargando = false;
    this.Nombrecatalogo = 'Alta de compras';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.inicializarTipoDocs();
      this.inicializarFormasPago();
      this.consultMateriasPrimas();
      switch (this.data.Proceso) {
        case MODO.MODIFICAR:
          this.consultaDetalle();
          break;
        case MODO.ALTA:
          this.tipoProd = 'P';
          break;
      }
    }, 100);
  }
  consultaDetalle() {
    let json: any = {};
    json.FOLIO = this.data.item.FOLIO;
    this.mostrarCargado();
    this.peticiones.peticionPost(json, 'detalleCompras').then((resultado: any) => {
      debugger
      console.log(resultado);
      this.Folio = resultado.datos.FOLIO;
      this.formaDePago = resultado.datos.FORMA_PAGO;
      this.importeSINIVA = resultado.datos.IMPORTE_SIN_IVA;
      this.Proveedor = resultado.datos.PROVEEDOR;
      this.tipoDoc = resultado.datos.TIPO_DOC;
      this.tipoProd = resultado.datos.TIPO_ELEMENT;
      this.Total = resultado.datos.TOTAL;
      this.dataSource = resultado.datos.COMPRAS;
      let num = 1;
      for (let item of this.dataSource) {
        item.NUM = num;
        num++;
      }


      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.isCargando = false;
      this.quitarCargando();
      // });
    });
  }



  inicializarTipoDocs() {
    this.listaDocumentos = [
      { ID: 'RC', NOMBRE: 'Remisión' },
      { ID: 'FC', NOMBRE: 'Factura' }
    ]
  }

  consultMateriasPrimas() {
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaMateriaPrima').then((resultado: any) => {
      console.log(resultado);
      this.listaMaterasP = resultado;

      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.isCargando = false;
      this.quitarCargando();
    });
  }


  /**
     *\brief   Función que activa el componente cargando
     *\author  Alexis Osvaldo Dorantes Ku
     *\date    23/09/2020
     *\version	1.00.00
   */
  mostrarCargado() {
    this.isCargando = this.funcGenerales.onCargando();
  }

  /**
   *\brief   Función que desactiva el componente cargando
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  quitarCargando() {
    this.isCargando = this.funcGenerales.offCargando();
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
      if (this.datos.CODIGO_PROD) {
        this.datos[this.EncontrarIndice(this.datos.CODIGO_PROD)] = this.datos;
      }
      else {
        this.datos.NUM = siguienteIndice = this.dataSource.length + 1;
        this.dataSource.push(this.datos);
      }

      this.dataSource = [...this.dataSource];
      this.datos = { 'NUM': 0, 'CODIGO_PROD': '', 'DESCRIPCION': '', 'CANTIDAD': 0, 'COSTO': 0, 'ASIGNADO': "0", 'IVA_PROD': "0", 'TOTAL': 0 }
    }
  }

  validaCamposVacios(): boolean {
    let campoVacio = false;
    let buscar = this.dataSource.find(item => item.CODIGO_PROD === '');
    if (buscar) {
      campoVacio = true;
      let indice = this.dataSource.findIndex(item => item.CODIGO_PROD === '');
      this.itemSeleccionado = this.dataSource[indice];
      this.funcGenerales.popUpAlerta('Error', 'No se ha capturado el código en la fila ' + buscar.NUM, 'ACEPTAR', '').then(() => {
      });
    }
    return campoVacio;
  }

  /**
   *\brief   Funciónque invoca el detalle y ponerlo en modo modificar
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  modificar() {

  }

  /**
   *\brief   Función que invoca la ventana del detalle
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
   @param[in] -> el modo en el que se comportará la ventana
 */
  // ventanaDetalle(Modo) {
  //   var width = '70vh';
  //   var height = '50';

  //   const dialogRef = this.dialog.open(DetalleMateriaPrimaComponent, {
  //     disableClose: true,
  //     width: width,
  //     height: height,
  //     data: {
  //       Proceso: Modo,
  //       item: this.itemSeleccionado
  //     }
  //   });

  //   return new Promise(resolve => {
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log(result)
  //       this.consulta();
  //     });
  //   });
  // }

  /**
     *\brief   Función para eliminar un registro
     *\author  Alexis Osvaldo Dorantes Ku
     *\date    23/09/2020
     *\version	1.00.00
   */
  eliminar() {
    let index = this.itemSeleccionado.NUM - 1;
    this.dataSource.splice(index, 1);
    this.itemSeleccionado = '';
    // this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.CODIGO + "\" ?'", 'Si', 'No').then((respuesta) => {

    //   if (respuesta) {
    //     this.mostrarCargado();
    //     let json: any = {};
    //     json.CODIGO = this.itemSeleccionado.CODIGO;
    //     this.peticiones.peticionPost(json, 'eliminarMateriPrima').then((resultado: any) => {
    //       this.quitarCargando();
    //     }).catch((error) => {
    //       console.log(error);
    //       this.quitarCargando();
    //     });
    //   }
    // });
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

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  cambioDeOpcionSelect(e) {
    console.log(e);
    let buscar = this.listaMaterasP.find(item => item.CODIGO_PROD === e.value);
    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].CODIGO_PROD === e.value) {
        this.dataSource[i].MATERIA_PRIMA = buscar.MATERIA_PRIMA;
        this.dataSource[i].UNIDAD_MEDIDA = buscar.UNIDAD_MEDIDA;
      }
    }
  }

  validarTyping(e, campo) {
    let respuesta: boolean = true;
    let valor = Number(e.key);
    switch (campo) {
      default:
        if (isNaN(valor)) {
          respuesta = false;
        }
        break;
    }
    return respuesta;
  }

  guardar() {
    debugger
    let json: any = {};
    json.FOLIO = this.Folio;
    json.TIPO_DOC = this.tipoDoc;
    json.TIPO_ELEMENT = this.tipoProd;
    json.IMPORTE_SIN_IVA = this.importeSINIVA;
    json.FORMA_PAGO = this.formaDePago;
    json.PROVEEDOR = this.Proveedor;
    json.TOTAL = this.Total;
    json.COMPRAS = this.dataSource;
    switch (this.data.Proceso) {
      case MODO.ALTA:
        if (!this.validaAlta()) {
          this.mostrarCargado();
          console.log(json)

          this.peticiones
            .peticionPost(json, 'altaCompras')
            .then((resultado: any) => {
              console.log('resultado then');
              console.log(resultado);
              if (this.funcGenerales.extraerCodigo(resultado) === NOEXISTE) {
                this.funcGenerales.popUpAlerta('Error', resultado.message, 'Aceptar', '');
              } else {
                this.quitarCargando();
                this.CerrarVentana();
              }

            })
            .catch((error) => {
              console.log('error');
              console.log(error);
              this.quitarCargando();
            });
        }

        break;
      case MODO.MODIFICAR:
        this.mostrarCargado();
        this.peticiones
          .peticionPost(json, 'modificarCompras')
          .then((resultado: any) => {
            console.log('resultado then');
            console.log(resultado);
            if (this.funcGenerales.extraerCodigo(resultado) === NOEXISTE) {
              this.funcGenerales.popUpAlerta('Error', resultado.message, 'Aceptar', '');
            } else {
              this.quitarCargando();
              this.CerrarVentana();
            }

          })
          .catch((error) => {
            console.log('error');
            console.log(error);
            this.quitarCargando();
          });
        break;
    }

  }

  CerrarVentana() {
    this.dialogRef.close();
  }
  inicarProcesoEdicion(e) {
    let index = e.index ? e.index : e;
    let buscarItem = this.dataSource.find(item => item.NUM === index);
    setTimeout(() => {
      this.itemSeleccionado = buscarItem;
    }, 5);

  }

  validaAlta(): boolean {
    let respuesta = false;

    if (this.funcGenerales.EsVacioNulo(this.tipoDoc)) {
      respuesta = true;
      this.funcGenerales.popUpAlerta('Error', 'No se ha seleccionado un producto fabricado', 'Aceptar', '').then(() => {
        this.colorSelect = 'warn';
        this.CampoSelectPF.focus();
      });

    }
    if (this.dataSource.length === 0 && respuesta === false) {
      this.funcGenerales.popUpAlerta('Error', 'Se deben agregar materias primas a este producto fabricado para guardar', 'Aceptar', '');
      respuesta = true;
    }

    return respuesta;
  }

  cambiarColorSelectPF() {
    this.colorSelect = 'primary';
    // this.mostrarCargado();
    // let json:any = {};
    // json.CODIGO_PRODUCTOF = this.productoFabricadoSeleccionado;
    // this.peticiones.peticionPost(json, 'detalleMPasignados').then((resultado: any) => {
    //   debugger
    //   console.log(resultado);
    //   if(this.funcGenerales.extraerCodigo(resultado) === EXITO){
    //     this.funcGenerales.popUpAlerta('Error', 'El producto fabricado ya se le ha asignado materías primas', 'Aceptar', '').then(() => {
    //       this.colorSelect = 'warn';
    //       this.CampoSelectPF.focus();
    //     });
    //   }else{

    //   }
    //   this.quitarCargando();
    // }).catch((error) => {
    //   console.log(error);
    //   this.isCargando = false;
    //   this.quitarCargando();
    // });


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
        if (this.dataSource[i].CODIGO_PROD === buscarItem.CODIGO_PROD) {
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


  perderFoco(campo) {
    switch (campo) {
      case 'COSTO':
        // this.ManoSrv.COSTO = this.funcGenerales.dameFormatoMoneda(this.ManoSrv.COSTO, 2);
        break;
    }
  }
  ObtenerFoco(e) {
    e.target.select()
  }

  presionaBoton(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      this.CerrarVentana();
    }
  }

  inicializarFormasPago() {
    this.listaFormasPago = [
      { ID: 'E', DESCRIP: 'EFECTIVO' },
      { ID: 'B', DESCRIP: 'BANCO' },
      { ID: 'C', DESCRIP: 'CRÉDITO' },
      { ID: 'T', DESCRIP: 'TARJETA' }
    ]
  }

  buscarProductos(index) {
    this.inicarProcesoEdicion(index);
    let configGrid = {
      columns: 2,
      header: ['Código', 'Producto'],
      field: ['CODIGO', 'PRODUCTO'],
    };
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaProductosCompras').then((resultado: any) => {
      this.abrirVtnBusqueda(resultado, configGrid, index);
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });

  }

  abrirVtnBusqueda(dataSource, configGrid, index) {
    var width = '40%';
    var height = '45%';
    const dialogRef = this.dialog.open(BusquedasComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        TituloVentana: 'Busqueda de productos',
        dataSource: dataSource,
        configGrid: configGrid,
        idGrid: index
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        for (let item of this.dataSource) {
          if (item.CODIGO_PROD == result.itemSeleccionado.CODIGO) {
            this.funcGenerales.popUpAlerta('Error', 'Solo puede haber un registro por cada producto', 'Aceptar', '').then(() => {
              let indice = item.NUM - 1;
              this.dataSource[indice].CODIGO_PROD = '';

            });
          } else {
            if (item.NUM === result.idGrid) {
              item.DESCRIPCION = result.itemSeleccionado.PRODUCTO;
              item.CODIGO_PROD = result.itemSeleccionado.CODIGO;
            }
          }

        }
        resolve(result);
      });
    });
  }

  dameFormatoMoneda(valor) {
    return this.funcGenerales.dameFormatoMoneda(valor, this.NumDecimales);
  }

  dameFormatoCantidad(valor) {
    return this.funcGenerales.dameFormatoCantidad(valor, this.NumDecimales);
  }

  buscarImpuestos(index) {
    this.inicarProcesoEdicion(index);
    let configGrid = {
      columns: 2,
      header: ['Nombre', 'Porcentaje'],
      field: ['NOMBRE', 'PORCENTAJE'],
    };
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaImpuestos').then((resultado: any) => {
      this.abrirVtnImporte(resultado, configGrid, index);
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }

  abrirVtnImporte(dataSource, configGrid, index) {
    var width = '40%';
    var height = '45%';
    const dialogRef = this.dialog.open(BusquedasComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        TituloVentana: 'Busqueda de impuestos',
        dataSource: dataSource,
        configGrid: configGrid,
        idGrid: index
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
         this.dataSource[index - 1].IVA_PROD = result.itemSeleccionado.PORCENTAJE;
        resolve(result);
      });
    });
  }
}
