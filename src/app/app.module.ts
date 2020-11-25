import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
// import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { ProductosComercialesComponent } from './productos-comerciales/productos-comerciales.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiciosComponent } from './servicios/servicios.component';
import { PeticionesWebComponent } from './sharedModules/peticiones-web/peticiones-web.component';
import { HttpClientModule } from '@angular/common/http';
import { CargandoComponent } from './sharedModules/cargando/cargando.component';
import { TableModule } from 'primeng/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import { DetalleProductosComercialesComponent } from './productos-comerciales/detalle-productos-comerciales/detalle-productos-comerciales.component';
import { ConfirmacionPopUpComponent } from './sharedModules/confirmacion-pop-up/confirmacion-pop-up.component';
import { DetalleServiciosComponent } from './servicios/detalle-servicios/detalle-servicios.component';
import { ProductoFabricadoComponent } from './producto-fabricado/producto-fabricado.component';
import { DetalleProductoFabricadoComponent } from './producto-fabricado/detalle-producto-fabricado/detalle-producto-fabricado.component';
import { MateriaPrimaComponent } from './materia-prima/materia-prima.component';
import { DetalleMateriaPrimaComponent } from './materia-prima/detalle-materia-prima/detalle-materia-prima.component';
import { ManoDeObraComponent } from './mano-de-obra/mano-de-obra.component';
import { DetalleManoDeObraComponent } from './mano-de-obra/detalle-mano-de-obra/detalle-mano-de-obra.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DetalleCategoriaComponent } from './categoria/detalle-categoria/detalle-categoria.component';
import { UnidadDeMedidaComponent } from './unidad-de-medida/unidad-de-medida.component';
import { DetalleUnidadMedidaComponent } from './unidad-de-medida/detalle-unidad-medida/detalle-unidad-medida.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import { AsignarMateriasPrimasComponent } from './produccion/materias-primas-asignados/asignar-materias-primas/asignar-materias-primas.component';
import { MateriasPrimasAsignadosComponent } from './produccion/materias-primas-asignados/materias-primas-asignados.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';
import { DetalleImpuestosComponent } from './impuestos/detalle-impuestos/detalle-impuestos.component';
import { ComprasComponent } from './compras/compras.component';
import { DetalleComprasComponent } from './compras/detalle-compras/detalle-compras.component';
import { BusquedasComponent } from './sharedModules/busquedas/busquedas.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    ProductosComercialesComponent,
    ServiciosComponent,
    PeticionesWebComponent,
    CargandoComponent,
    DetalleProductosComercialesComponent,
    ConfirmacionPopUpComponent,
    DetalleServiciosComponent,
    ProductoFabricadoComponent,
    DetalleProductoFabricadoComponent,
    MateriaPrimaComponent,
    DetalleMateriaPrimaComponent,
    ManoDeObraComponent,
    DetalleManoDeObraComponent,
    CategoriaComponent,
    DetalleCategoriaComponent,
    UnidadDeMedidaComponent,
    DetalleUnidadMedidaComponent,
    AsignarMateriasPrimasComponent,
    MateriasPrimasAsignadosComponent,
    ImpuestosComponent,
    DetalleImpuestosComponent,
    ComprasComponent,
    DetalleComprasComponent,
    BusquedasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatGridListModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    TableModule,
    AccordionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ToastModule,
    MatTooltipModule,
    MatMenuModule,
    SlideMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
