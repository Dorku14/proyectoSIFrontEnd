import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionesGenerales } from '../../../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../../../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { EXITO, MODO, NOEXISTE } from './../../../sharedModules/constantes';
import { EditableColumn, Table } from 'primeng/table';
import { ServiciosService } from '../../../services/servicios.service';
import { MatSelect } from '@angular/material/select';
import { BusquedasComponent } from 'src/app/sharedModules/busquedas/busquedas.component';

@Component({
  selector: 'app-asignar-materias-primas',
  templateUrl: './asignar-materias-primas.component.html',
  styleUrls: ['./asignar-materias-primas.component.scss']
})

export class AsignarMateriasPrimasComponent implements OnInit {
  @ViewChild('CampoSelectPF', { static: false }) CampoSelectPF: MatSelect;
  @ViewChildren(EditableColumn) private editableColumns: QueryList<EditableColumn>;
  @ViewChild(EditableColumn) editableColumn: EditableColumn
  dataSource: Array<any> = [];
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  datos = { 'NUM': 0, 'CODIGO': '', 'MATERIA_PRIMA': '', 'CANTIDAD': 0, 'UNIDAD_MEDIDA': '' }
  @ViewChild('dt') table: Table;
  Nombrecatalogo: any;
  productoFabricadoSeleccionado: any;
  listaProductosF: any;
  listaMaterasP: any;
  colorSelect = 'primary';
  validando = false;
  decimalesCantidad:number = 2;
  constructor(private peticiones: PeticionesWebComponent,
    public ServiciosService: ServiciosService,
    public funcGenerales: FuncionesGenerales,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AsignarMateriasPrimasComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private renderer: Renderer2) {
    this.isCargando = false;
    this.Nombrecatalogo = 'Asignar materias primas';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.consultaProductosFabricados();
      this.consultMateriasPrimas();
      if (this.data.Proceso === MODO.MODIFICAR) {
        this.consultaDetalle();
      }
    }, 100);
  }
  consultaDetalle() {
    let json: any = {};
    json.CODIGO_PRODUCTOF = this.data.item.CODIGO_PRODUCTOF;
    this.mostrarCargado();
    this.peticiones.peticionPost(json, 'detalleMPasignados').then((resultado: any) => {
      console.log(resultado);
      this.productoFabricadoSeleccionado = resultado.datos.CODIGO_PRODUCTOF;
      this.dataSource = resultado.datos.REGISTROS;
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
    });
  }



  consultaProductosFabricados() {
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaProductosF').then((resultado: any) => {
      console.log(resultado);
      this.listaProductosF = resultado;

      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.isCargando = false;
      this.quitarCargando();
    });
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
      if (this.datos.CODIGO) {
        this.datos[this.EncontrarIndice(this.datos.CODIGO)] = this.datos;
      }
      else {
        this.datos.NUM = siguienteIndice = this.dataSource.length + 1;
        this.dataSource.push(this.datos);
      }

      this.dataSource = [...this.dataSource];
      this.datos = { 'NUM': 0, 'CODIGO': '', 'MATERIA_PRIMA': '', 'CANTIDAD': 0, 'UNIDAD_MEDIDA': '' };
    }
  }

  validaCamposVacios(): boolean {
    let campoVacio = false;
    let buscar = this.dataSource.find(item => item.CODIGO === '');
    if (buscar) {
      campoVacio = true;
      let indice = this.dataSource.findIndex(item => item.CODIGO === '');
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
    let buscar = this.listaMaterasP.find(item => item.CODIGO === e.value);
    for (let i = 0; i < this.dataSource.length; i++) {
      if (this.dataSource[i].CODIGO === e.value) {
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
    switch (this.data.Proceso) {
      case MODO.ALTA:
        if (!this.validaAlta()) {
          let json: any = {};
          json.CODIGO_PRODUCTOF = this.productoFabricadoSeleccionado;
          json.REGISTROS = this.dataSource;
          console.log(json)
          this.peticiones
            .peticionPost(json, 'altaMPasignados')
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
        let jsonM: any = {};
        jsonM.CODIGO_PRODUCTOF = this.productoFabricadoSeleccionado;
        jsonM.REGISTROS = this.dataSource;
        console.log(jsonM)
        this.peticiones
          .peticionPost(jsonM, 'modificarMPasignados')
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
    console.log(this.productoFabricadoSeleccionado);

    if (this.funcGenerales.EsVacioNulo(this.productoFabricadoSeleccionado)) {
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
    this.mostrarCargado();
    let json:any = {};
    json.CODIGO_PRODUCTOF = this.productoFabricadoSeleccionado;
    this.peticiones.peticionPost(json, 'detalleMPasignados').then((resultado: any) => {
      debugger
      console.log(resultado);
      if(this.funcGenerales.extraerCodigo(resultado) === EXITO){
        this.funcGenerales.popUpAlerta('Error', 'El producto fabricado ya se le ha asignado materías primas', 'Aceptar', '').then(() => {
          this.colorSelect = 'warn';
          this.CampoSelectPF.focus();
        });
      }else{
        this.colorSelect = 'primary';
      }
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.isCargando = false;
      this.quitarCargando();
    });


  }

  terminarProcesoEditar(e) {
    if(!this.validando){
      this.validando = true;
      let buscarItem = this.dataSource.find(item => item.NUM === e.index);
      e.data = buscarItem;
      let coincidencias = 0;
      let duplicado = false;
      let indexDuplicado = 0;
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].CODIGO === buscarItem.CODIGO) {
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

      }else{
        this.validando = false;
      }
    }

  }

  dameFormatoCantidad(valor){
    return this.funcGenerales.dameFormatoCantidad(valor,this.decimalesCantidad);
  }


  buscarProductos() {

    let configGrid = {
      columns: 2,
      header: ['Código', 'Producto'],
      field: ['CODIGO', 'PRODUCTO'],
    };
    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaProductosF').then((resultado: any) => {
      this.abrirVtnBusqueda(resultado, configGrid);
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.quitarCargando();
    });

  }

  abrirVtnBusqueda(dataSource, configGrid) {
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
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        this.funcGenerales.otorgaFoco('ProductoF');
        this.productoFabricadoSeleccionado = result.itemSeleccionado.CODIGO;
        resolve(result);
      });
    });
  }

}
