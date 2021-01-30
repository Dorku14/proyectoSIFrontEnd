import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService,PrimeNGConfig } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class FuncionesGenerales {
    formatoFecha: string[];
  
    constructor(public dialog: MatDialog,private messageService: MessageService,private PrimeNGConfig:PrimeNGConfig) {

    }

}