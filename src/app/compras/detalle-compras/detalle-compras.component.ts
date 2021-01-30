import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from '../../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { EXITO, MODO, NOEXISTE, mascaraMoneda } from '../../sharedModules/constantes';
import { EditableColumn, Table } from 'primeng/table';
import { ServiciosService } from '../../services/servicios.service';
import { MatSelect } from '@angular/material/select';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { BusquedasComponent } from 'src/app/sharedModules/busquedas/busquedas.component';
import { DetalleProductosComercialesComponent } from 'src/app/productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component';

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
  listaDeBanco: Array<{ ID, DESCRIPCION }>;
  listaDeCuentas: Array<{ ID, NUMERO_CTA }>;
  importeSINIVA: any = 0;
  IVA: any = 0;
  Total: any = 0;
  Folio: any;
  NumDecimales: number = 2;
  mascaraMoneda: any;
  ivaConfigurado = 16;
  NumeroReferencia: string = "";
  nombreBanco: any;
  NumeroCuenta: any;
  NombreServicios:any ={};
  listaProveedores: Array<{ ID, CODIGO,NOMBRE,APELLIDO_P }>;
  constructor(private peticiones: PeticionesWebComponent,
    public ServiciosService: ServiciosService,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DetalleComprasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private renderer: Renderer2) {
    this.isCargando = false;
    this.mascaraMoneda = mascaraMoneda;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.inicializarTipoDocs();
      this.inicializarFormasPago();
      this.consultMateriasPrimas();
      this.consultaProveedores();
      this.listaBancos();
      this.consultaCuentas();
      switch (this.data.Proceso) {
        case MODO.MODIFICAR:
          switch (this.data.TIPO_MOV) {
            case 'C':
              this.Nombrecatalogo = 'Modificar compra';

              break;
            case 'V':
              this.Nombrecatalogo = 'Modificar venta';

              break;
          }
          this.consultaDetalle();

          break;
        case MODO.ALTA:
          switch (this.data.TIPO_MOV) {
            case 'C':
              this.Nombrecatalogo = 'Alta de compras';

              break;
            case 'V':
              this.Nombrecatalogo = 'Alta de ventas';

              break;
          }
          this.tipoProd = 'P';
          break;
      }
    }, 100);
  }


  consultaDetalle() {
    let json: any = {};
    json.FOLIO = this.data.item.FOLIO;
    json.TIPO_MOV = this.data.TIPO_MOV;
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
      this.IVA = resultado.datos.IVA;
      this.Total = resultado.datos.TOTAL;
      this.nombreBanco = resultado.datos.NOMBRE_BNC;
      this.NumeroCuenta = resultado.datos.NUMERO_CTA;
      this.NumeroReferencia = resultado.datos.NUMERO_REF;
      this.dataSource = resultado.datos.PARTIDAS;
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
     *\brief   Función para eliminar un registro
     *\author  Alexis Osvaldo Dorantes Ku
     *\date    23/09/2020
     *\version	1.00.00
   */
  eliminar() {
    let index = this.itemSeleccionado.NUM - 1;
    this.dataSource.splice(index, 1);
    this.itemSeleccionado = '';
    this.calculaImportes()
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

  validarTyping(e, campo, valorE?) {
    let respuesta: boolean = true;
    let valor = e.key;
    switch (campo) {
      case 'ASIGNADO':
        respuesta = this.funcGenerales.permiteNumerico(valorE, valor);
        break;

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
    json.TIPO_MOV = this.data.TIPO_MOV;
    json.IVA = this.IVA;
    json.TOTAL = this.Total;
    json.NOMBRE_BNC = this.nombreBanco;
    json.NUMERO_CTA = this.NumeroCuenta;
    json.NUMERO_REF = this.NumeroReferencia;
    json.PARTIDAS = this.dataSource;
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
              this.quitarCargando();
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
    if (this.formaDePago == 'B') {
      this.listaBancos();
      this.consultaCuentas();
    }
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

    this.calculaImportes();
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
    var height = '50%';
    const dialogRef = this.dialog.open(BusquedasComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        TituloVentana: 'Busqueda de productos',
        dataSource: dataSource,
        configGrid: configGrid,
        idGrid: index,
        componenteAlta: DetalleProductosComercialesComponent,
        modo: MODO.ALTA,
        anchoAlta: '70vh',
        altoAlta: '40vh',
        nombreConsulta: 'consultaProductosCompras'
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

  calculaTotalFila(cantidad, costo, asignado, key) {
    let indice = key - 1;
    let Cant = Number(cantidad);
    let Cost = Number(costo);
    let PorcAsig = Number(asignado);
    let ResultMult = Cant * Cost;
    let total = PorcAsig > 0 ? (PorcAsig * ResultMult / 100) + ResultMult : ResultMult;
    this.dataSource[indice].TOTAL = total;
    return total;
  }

  calculaImportes() {
    this.importeSINIVA = 0;
    if (this.dataSource.length > 0) {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.importeSINIVA = Number(this.dataSource[i].TOTAL) + Number(this.importeSINIVA);
      }
      this.IVA = (this.ivaConfigurado * this.importeSINIVA / 100);
      this.Total = this.IVA + this.importeSINIVA;
    } else {
      this.importeSINIVA = 0;
      this.IVA = 0;
      this.Total = 0;
    }
  }

  listaBancos() {
    this.listaDeBanco = [
      { ID: 1, DESCRIPCION: 'BBVA' },
      { ID: 2, DESCRIPCION: 'BANORTE' },
      { ID: 3, DESCRIPCION: 'SANTANDER' },
      { ID: 4, DESCRIPCION: 'INBURSA' }
    ]

  }
  
  consultaCuentas() {
    this.peticiones.peticionPost({}, 'consultaCuentasCompletas').then((resultado: any) =>{
      let datos = resultado;
      this.listaDeCuentas = datos;
    }).catch((error) =>{
      console.log(error);
    })
  }

  consultaProveedores(){
    this.peticiones.peticionPost({}, 'consultaProveedores').then((resultado: any) => {
      console.log(resultado);
      let datos = resultado;
      this.listaProveedores = datos;
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });
  }

}
