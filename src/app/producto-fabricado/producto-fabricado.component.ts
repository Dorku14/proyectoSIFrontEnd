import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { MODO } from '../sharedModules/constantes';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales';
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { DetalleProductoFabricadoComponent } from './detalle-producto-fabricado/detalle-producto-fabricado.component';

@Component({
  selector: 'app-producto-fabricado',
  templateUrl: './../productos-comerciales/productos-comerciales.component.html',
  styleUrls: ['./../productos-comerciales/productos-comerciales.component.scss']
})
export class ProductoFabricadoComponent implements OnInit {
  dataSource: Array<any>;
  isCargando: boolean;
  itemSeleccionado: any;
  columns: any;
  // data = { 'NUM': 1, 'CODIGO': '1231', 'ACTIVIDAD': 'camisa', 'PRECIO_VENT': 12, 'PRECIO_VENT_ACT': 80, 'PAGO_EMPLEADO': 120 }
  @ViewChild('dt') table: Table;
  Nombrecatalogo:any;
  constructor(
    private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
      this.isCargando = false;
      this.Nombrecatalogo = 'Productos Fabricados';
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
    this.peticiones.peticionPost({}, 'consultaProductosF').then((resultado: any) => {
      console.log(resultado);
      this.dataSource = resultado;
      let num = 0;
      for (let i of this.dataSource) {
        num += 1;
        i.NUM = num;
        i.PRECIO_COMPRA = this.funcGenerales.dameFormatoMoneda(i.PRECIO_COMPRA,2);
        i.PRECIO_VENTA = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENTA,2);
        i.COSTO_ACTUALIZADO = this.funcGenerales.dameFormatoMoneda(i.COSTO_ACTUALIZADO,2);
        i.PRECIO_VENT_ACT = this.funcGenerales.dameFormatoMoneda(i.PRECIO_VENT_ACT,2);
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
    *\date    23/09/2020
    *\version	1.00.00
  */
  configuraDataGrid(): void {
    let configGrid = {
      columns: 10,
      header: ['#', 'Código','Producto','Cantidad', 'Precio de compra(Sin IVA)', 'Precio de venta(Sin IVA)','Costo actualizado','Precio de venta actualizado','Inventario','Punto de reorden'],
      field: ['NUM', 'CODIGO', 'PRODUCTO','CANTIDAD', 'PRECIO_COMPRA','PRECIO_VENTA', 'COSTO_ACTUALIZADO','PRECIO_VENT_ACT','INVENTARIO','PUNTO_REORDEN'],

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
    var width = '70vh';
    var height = '50vh';

    const dialogRef = this.dialog.open(DetalleProductoFabricadoComponent, {
      disableClose: true,
      width: width,
      height: height,
      data: {
        Proceso: Modo,
        item: this.itemSeleccionado
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
    this.funcGenerales.popUpAlerta('Confirmación', '¿Seguro que deseas eliminar el registro \"' + this.itemSeleccionado.CODIGO + "\" ?'", 'Si', 'No').then((respuesta) => {

      if (respuesta) {
        this.mostrarCargado();
        let json: any = {};
        json.CODIGO = this.itemSeleccionado.CODIGO;
        this.peticiones.peticionPost(json, 'eliminarProductosF').then((resultado: any) => {
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
