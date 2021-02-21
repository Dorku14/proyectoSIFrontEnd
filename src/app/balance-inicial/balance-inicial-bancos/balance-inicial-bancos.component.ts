import { Component, OnInit } from '@angular/core';
import { FuncionesGenerales } from '../../sharedModules/funcionesgenerales'

@Component({
  selector: 'app-balance-inicial-bancos',
  templateUrl: './balance-inicial-bancos.component.html',
  styleUrls: ['./balance-inicial-bancos.component.scss']
})
export class BalanceInicialBancosComponent implements OnInit {

  isCargando: boolean;
  itemSeleccionado: any;
  colorSelect = 'primary';
  dataSource: Array<any> = [];
  columns: any;
  NumDecimales: number = 2;
  datos = { 'NUM': 0, 'BANCO': '', 'CANTIDAD': 0, 'CUENTA': '' };

  constructor(public funcGenerales: FuncionesGenerales) { }

  ngOnInit(): void {
  }

  guardar() {
  }

  agregar() {
    let siguienteIndice = this.dataSource.length + 1;
    if (!this.validaCamposVacios()) {
      this.datos.NUM = siguienteIndice = this.dataSource.length + 1;
      this.dataSource.push(this.datos);
      this.dataSource = [...this.dataSource];
      this.datos = { 'NUM': 0, 'BANCO': '', 'CANTIDAD': 0, 'CUENTA': '' }
    }
  }

  eliminar() {
    let index = this.itemSeleccionado.NUM - 1;
    this.dataSource.splice(index, 1);
    this.itemSeleccionado = '';
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

  validaCamposVacios(): boolean {
    let campoVacio = false;
    let buscar = this.dataSource.find(item => item.CUENTA === '');
    if (buscar) {
      campoVacio = true;
      let indice = this.dataSource.findIndex(item => item.CUENTA === '');
      this.itemSeleccionado = this.dataSource[indice];
      this.funcGenerales.popUpAlerta('Error', 'No se ha terminado de capturar información en la fila ' + buscar.NUM, 'ACEPTAR', '').then(() => {
      });
    }
    return campoVacio;
  }


  dameFormatoMoneda(valor) {
    return this.funcGenerales.dameFormatoMoneda(valor, this.NumDecimales);
  }

  dameFormatoCantidad(valor) {
    return this.funcGenerales.dameFormatoCantidad(valor, this.NumDecimales);
  }

}
