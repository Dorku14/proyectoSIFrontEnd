import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { MODO,TIPOMOVDOCS } from './../sharedModules/constantes';
import { Table } from 'primeng/table';
import { ServiciosService } from '../services/servicios.service';
import { DetalleComprasComponent } from './detalle-compras/detalle-compras.component';

@Component({
  selector: 'app-compras',
  templateUrl: './../productos-comerciales/productos-comerciales.component.html',
  styleUrls: ['./../productos-comerciales/productos-comerciales.component.scss']
})

export class ComprasComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  data = [
    {'DESCRIPCION':"tela", 'TIPO_DOC': 'Remisión', 'PROVEEDOR':"Telas del sureste", 'TIPO_ELEMENT':'Materia prima', 'IVA':"16%",'IMPORTE_SIN_IVA':180,'TOTAL':208.80},
    {'DESCRIPCION':"Calceta", 'TIPO_DOC': 'Factura', 'PROVEEDOR':"Ropantastico", 'TIPO_ELEMENT':'Producto', 'IVA':"16%",'IMPORTE_SIN_IVA':60,'TOTAL':69.6},

  ]
  @ViewChild('dt') table: Table;
  Nombrecatalogo:any;
  ocultarBTNEliminar:boolean = false;
  constructor(private peticiones: PeticionesWebComponent,
    public ServiciosService: ServiciosService,
    private funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
    this.isCargando = false;
    this.Nombrecatalogo = 'Compras';
  }

  ngOnInit(): void {
    this.configuraDataGrid();
    setTimeout(() => {
      this.consulta();
    }, 100);
  }

  /**
   *\brief   Función para realiza la consulta al servidor y agrega los datos al datasource de la tabla
   *\author  Alexis Osvaldo Dorantes Ku
   *\date    23/09/2020
   *\version	1.00.00
 */
  consulta() {

    this.mostrarCargado();
    this.peticiones.peticionPost({}, 'consultaCompras').then((resultado: any) => {
      console.log(resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.IMPORTE_SIN_IVA = this.funcGenerales.dameFormatoMoneda(i.IMPORTE_SIN_IVA,2);
        i.TOTAL = this.funcGenerales.dameFormatoMoneda(i.TOTAL,2);
        i.IVA_PROD = i.IVA_PROD + '%';
        i.TIPO_ELEMENT = this.funcGenerales.formatoTipoElemento(i.TIPO_ELEMENT);
        i.TIPO_DOC = this.funcGenerales.formatoTipoDocto(i.TIPO_DOC);
        i.FORMA_PAGO = this.funcGenerales.formatoPago(i.FORMA_PAGO);
        // i.PAGO_EMPLEADO = this.funcGenerales.dameFormatoMoneda(i.PAGO_EMPLEADO,2);
      }
      this.quitarCargando();
    }).catch((error) => {
      console.log(error);
      this.isCargando = false;
      this.quitarCargando();
    });
  }

  /**
    *\brief   Función para configurar el grid
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    02/11/20
    *\version	1.00.00
  */
  configuraDataGrid(): void {
    let configGrid = {
      columns: 8,
      header: ['#', 'Folio','Tipo de documento','Forma de pago', 'Proveedor','Tipo de elemento', 'Importe sin IVA', 'Importe con IVA' ,'Total'],
      field: ['NUM','FOLIO', 'TIPO_DOC', 'FORMA_PAGO','PROVEEDOR', 'TIPO_ELEMENT','IMPORTE_SIN_IVA','IVA','TOTAL'],

    };
    this.columns = this.funcGenerales.aplicaConfigGrid(configGrid);
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
    this.ventanaDetalle(MODO.ALTA);
  }

   /**
    *\brief   Funciónque invoca el detalle y ponerlo en modo modificar
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  modificar() {
    this.ventanaDetalle(MODO.MODIFICAR);

  }

   /**
    *\brief   Función que invoca la ventana del detalle
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
    @param[in] -> el modo en el que se comportará la ventana
  */
  ventanaDetalle(Modo) {
    var width = '150vh';
    var height = '85vh';

    const dialogRef = this.dialog.open(DetalleComprasComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
        item: this.itemSeleccionado,
        TIPO_MOV: TIPOMOVDOCS.COMPRAS
      }
    });

    return new Promise(resolve => {
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        this.consulta();
      });
    });
  }

 /**
    *\brief   Función para eliminar un registro
    *\author  Alexis Osvaldo Dorantes Ku
    *\date    23/09/2020
    *\version	1.00.00
  */
  eliminar() {
    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.DESCRIPCION + "\" ?'", 'Si', 'No').then((respuesta) => {

      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json.CODIGO = this.itemSeleccionado.CODIGO;
        this.peticiones.peticionPost(json, 'eliminarServicios').then((resultado: any) => {
          this.consulta();
          this.quitarCargando();
        }).catch((error) => {
          console.log(error);
          this.quitarCargando();
        });
      }
    });
  }
}
