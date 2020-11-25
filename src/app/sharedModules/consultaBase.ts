import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuncionesGenerales } from '../sharedModules/funcionesgenerales'
import { PeticionesWebComponent } from '../sharedModules/peticiones-web/peticiones-web.component';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';

export abstract class ConsultaBaseGeneral {

  dataSource: Array<any>;
  abstract isCargando: boolean;
  itemSeleccionado: any;
  abstract columns: any;
  abstract Datosfila;
  @ViewChild('dt') table: Table;
  constructor(private peticiones: PeticionesWebComponent,
    private funcGenerales: FuncionesGenerales,
    public dialog: MatDialog) {
  }


  abstract consulta()
  abstract configuraDataGrid()
  abstract mostrarCargado()
  abstract quitarCargando() 
  abstract agregar()
  abstract modificar()
  abstract detatalle()
  abstract eliminar()
}
