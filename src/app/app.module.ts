import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
// import { MatInputModule } from '@angular/material/input';
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
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
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
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { VentasComponent } from './ventas/ventas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DetalleClientesComponent } from './clientes/detalle-clientes/detalle-clientes.component';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { DetalleProveedoresComponent } from './proveedores/detalle-proveedores/detalle-proveedores.component';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import { DetalleCuentasComponent } from './cuentas/detalle-cuentas/detalle-cuentas.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import { ConsultasBaseComponent } from './consultas-base/consultas-base.component';
import { DatosTiendaComponent } from './datos-tienda/datos-tienda.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetalleUsuariosComponent } from './usuarios/detalle-usuarios/detalle-usuarios.component';
import { CookieModule, CookieService } from 'ngx-cookie';
import { parametrosDeSistema } from './sharedModules/parametrosDeSistemas';
import { InicioComponent } from './inicio/inicio.component';
import { CajaComponent } from './caja/caja.component';
import { NominaDestajoComponent } from './nomina-destajo/nomina-destajo.component';
import { CreditoClientesComponent } from './credito-clientes/credito-clientes.component';
import { CreditoProveedoresComponent } from './credito-proveedores/credito-proveedores.component';
import { BancosComponent } from './bancos/bancos.component';
import { BalanceInicialComponent } from './balance-inicial/balance-inicial.component';
import { BalanceInicialBancosComponent } from './balance-inicial/balance-inicial-bancos/balance-inicial-bancos.component';
import { BalanceInicialCreditoClientesComponent } from './balance-inicial/balance-inicial-credito-clientes/balance-inicial-credito-clientes.component';
import { BalanceInicialCreditoProveedoresComponent } from './balance-inicial/balance-inicial-credito-proveedores/balance-inicial-credito-proveedores.component';
import { BalanceInicialDeudoresDiversosComponent } from './balance-inicial/balance-inicial-deudores-diversos/balance-inicial-deudores-diversos.component';
import { BalanceInicialAcreedoresDiversosComponent } from './balance-inicial/balance-inicial-acreedores-diversos/balance-inicial-acreedores-diversos.component';
import { BalanceInicialDeudaCreditosComponent } from './balance-inicial/balance-inicial-deuda-creditos/balance-inicial-deuda-creditos.component';
import { ActivosFijosComponent } from './activos-fijos/activos-fijos.component';
import { PrestamoRecibidoComponent } from './prestamo-recibido/prestamo-recibido.component';
import { IvaPorPagarComponent } from './iva-por-pagar/iva-por-pagar.component';
import { IvaAcreditableComponent } from './iva-acreditable/iva-acreditable.component';
import { ImpuestosDiversosComponent } from './impuestos-diversos/impuestos-diversos.component';
import { AcreedoresDiversosComponent } from './acreedores-diversos/acreedores-diversos.component';
import { PrestamoOtorgadoComponent } from './prestamo-otorgado/prestamo-otorgado.component';
import { DetalleCajaComponent } from './caja/detalle-caja/detalle-caja.component';
import { DetalleBancosComponent } from './bancos/detalle-bancos/detalle-bancos.component';
import { CapturaComponent } from './captura/captura.component';
import { CapturaEfectivoBancoComponent } from './captura/captura-efectivo-banco/captura-efectivo-banco.component';
import { CapturaBancoEfectivoComponent } from './captura/captura-banco-efectivo/captura-banco-efectivo.component';
import { CapturaBancoBancoComponent } from './captura/captura-banco-banco/captura-banco-banco.component';
import { CapturaCobroClientesComponent } from './captura/captura-cobro-clientes/captura-cobro-clientes.component';
import { CapturaPagoCreditoProveedoresComponent } from './captura/captura-pago-credito-proveedores/captura-pago-credito-proveedores.component';
import { CapturaGastoComponent } from './captura/captura-gasto/captura-gasto.component';
import { CapturaPagoDeudaAcreedoresComponent } from './captura/captura-pago-deuda-acreedores/captura-pago-deuda-acreedores.component';
import { CapturaNominaPrestacionesComponent } from './captura/captura-nomina-prestaciones/captura-nomina-prestaciones.component';
import { CapturaComisionesComponent } from './captura/captura-comisiones/captura-comisiones.component';
import { CapturaPagoIvaComponent } from './captura/captura-pago-iva/captura-pago-iva.component';
import { CapturaCompraActivoFijoComponent } from './captura/captura-compra-activo-fijo/captura-compra-activo-fijo.component';
import { CapturaVentaActivoFijoComponent } from './captura/captura-venta-activo-fijo/captura-venta-activo-fijo.component';
import { CapturaPrestamoRecibidoComponent } from './captura/captura-prestamo-recibido/captura-prestamo-recibido.component';
import { CapturaPagoPrestamoComponent } from './captura/captura-pago-prestamo/captura-pago-prestamo.component';
import { CapturaInteresPagadoComponent } from './captura/captura-interes-pagado/captura-interes-pagado.component';
import { CapturaPrestamoOtorgadoComponent } from './captura/captura-prestamo-otorgado/captura-prestamo-otorgado.component';
import { CapturaCobroPrestamoComponent } from './captura/captura-cobro-prestamo/captura-cobro-prestamo.component';
import { CapturaInteresCobradoComponent } from './captura/captura-interes-cobrado/captura-interes-cobrado.component';
import { CapturaDepreciacionComponent } from './captura/captura-depreciacion/captura-depreciacion.component';
import { CapturaImpuestosComponent } from './captura/captura-impuestos/captura-impuestos.component';
import { CapturaIsrComponent } from './captura/captura-isr/captura-isr.component';
import { BalanceInicialProductoComercialComponent } from './balance-inicial/balance-inicial-producto-comercial/balance-inicial-producto-comercial.component';
import { BalanceInicialProductoFabricadoComponent } from './balance-inicial/balance-inicial-producto-fabricado/balance-inicial-producto-fabricado.component';
import { BalanceInicialMateriaPrimaComponent } from './balance-inicial/balance-inicial-materia-prima/balance-inicial-materia-prima.component';
import { BalanceInicialDetalleProductoComercialComponent } from './balance-inicial/balance-inicial-producto-comercial/balance-inicial-detalle-producto-comercial/balance-inicial-detalle-producto-comercial.component';
import { BalanceInicialDetalleCreditoClientesComponent } from './balance-inicial/balance-inicial-credito-clientes/balance-inicial-detalle-credito-clientes/balance-inicial-detalle-credito-clientes.component';
import { BalanceInicialDetalleMateriaPrimaComponent } from './balance-inicial/balance-inicial-materia-prima/balance-inicial-detalle-materia-prima/balance-inicial-detalle-materia-prima.component';
import {DatePipe} from "@angular/common";
import { AdministradorAppComponent } from './administrador-app/administrador-app.component';
import { DetalleAdminEmpresaComponent } from './administrador-app/detalle-admin-empresa/detalle-admin-empresa.component';
import { VentanaPagoComponent } from './ventana-pago/ventana-pago.component';
import { BalanceInicialDetalleBancosComponent } from './balance-inicial/balance-inicial-bancos/balance-inicial-detalle-bancos/balance-inicial-detalle-bancos.component';
import { BalanceInicialActivosFijosComponent } from './balance-inicial/balance-inicial-activos-fijos/balance-inicial-activos-fijos.component';
import { BalanceInicialDetalleActivosFijosComponent } from './balance-inicial/balance-inicial-activos-fijos/balance-inicial-detalle-activos-fijos/balance-inicial-detalle-activos-fijos.component';
import { CategoriaActivosFijosComponent } from './categoria-activos-fijos/categoria-activos-fijos.component';
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
    BusquedasComponent,
    VentasComponent,
    ClientesComponent,
    DetalleClientesComponent,
    CuentasComponent,
    ProveedoresComponent,
    DetalleProveedoresComponent,
    DetalleCuentasComponent,
    LoginComponent,
    DatosTiendaComponent,
    UsuariosComponent,
    DetalleUsuariosComponent,
    ConsultasBaseComponent,
    InicioComponent,
    CajaComponent,
    NominaDestajoComponent,
    CreditoClientesComponent,
    CreditoProveedoresComponent,
    BancosComponent,
    BalanceInicialComponent,
    BalanceInicialBancosComponent,
    BalanceInicialCreditoClientesComponent,
    BalanceInicialCreditoProveedoresComponent,
    BalanceInicialDeudoresDiversosComponent,
    BalanceInicialAcreedoresDiversosComponent,
    BalanceInicialDeudaCreditosComponent,
    ActivosFijosComponent,
    PrestamoRecibidoComponent,
    IvaPorPagarComponent,
    IvaAcreditableComponent,
    ImpuestosDiversosComponent,
    AcreedoresDiversosComponent,
    PrestamoOtorgadoComponent,
    DetalleCajaComponent,
    DetalleBancosComponent,
    CapturaComponent,
    CapturaEfectivoBancoComponent,
    CapturaBancoEfectivoComponent,
    CapturaBancoBancoComponent,
    CapturaCobroClientesComponent,
    CapturaPagoCreditoProveedoresComponent,
    CapturaGastoComponent,
    CapturaPagoDeudaAcreedoresComponent,
    CapturaNominaPrestacionesComponent,
    CapturaComisionesComponent,
    CapturaPagoIvaComponent,
    CapturaCompraActivoFijoComponent,
    CapturaVentaActivoFijoComponent,
    CapturaPrestamoRecibidoComponent,
    CapturaPagoPrestamoComponent,
    CapturaInteresPagadoComponent,
    CapturaPrestamoOtorgadoComponent,
    CapturaCobroPrestamoComponent,
    CapturaInteresCobradoComponent,
    CapturaDepreciacionComponent,
    CapturaImpuestosComponent,
    CapturaIsrComponent,
    BalanceInicialProductoComercialComponent,
    BalanceInicialProductoFabricadoComponent,
    BalanceInicialMateriaPrimaComponent,
    BalanceInicialDetalleProductoComercialComponent,
    BalanceInicialDetalleCreditoClientesComponent,
    BalanceInicialDetalleMateriaPrimaComponent,
    AdministradorAppComponent,
    DetalleAdminEmpresaComponent,
    VentanaPagoComponent,
    BalanceInicialDetalleBancosComponent,
    BalanceInicialActivosFijosComponent,
    BalanceInicialDetalleActivosFijosComponent,
    CategoriaActivosFijosComponent
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
    SlideMenuModule,
    TextMaskModule,
    CurrencyMaskModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputTextModule,
    CardModule,
    PasswordModule,
    CookieModule.forRoot() ],
  providers: [MatDatepickerModule,MessageService,parametrosDeSistema,DatePipe,
      {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}

],
  bootstrap: [AppComponent],
  entryComponents: [CajaComponent,BancosComponent]
})
export class AppModule { }
