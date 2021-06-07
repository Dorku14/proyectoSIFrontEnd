import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class balanceinicialService {
    ID: Number;
    CAJA: Number;
    BANCOS: Number;
    CREDITO_CLI: Number;
    IVAxCOBRAR: Number;
    ALMACEN: Number;
    PRODUC_COM: Number;
    PRODUC_FABRI: Number;
    PRODUCTO_PROCESO: Number;
    MATERIA_PRIMA: Number;
    IVA_ACREDITABLE: Number;
    DEUDORES_DIV: Number;
    TOTAL_CIRCULANTE: Number;
    TOTAL_AF: Number;
    TOTAL_ACTIVOS: Number;
    CREDITO_PROV: Number;
    PROV_IVAxPAGAR: Number;
    ACREEDORES_DIV: Number;
    NOMINA_DESTAJO: Number;
    NOMINA_INDIRECTA: Number;
    DEUDA_CRE: Number;
    IVAxPAGAR: Number;
    TOTAL_PASIVOS: Number;
    TOTAL_PATRI: Number;
    CAPITAL_INI: Number;
    UTILIDAD_EJE: Number;
    UTILIDAD_REIN: Number;
    INCREMENTO_CAP: Number;
    TOTAL_PAS_PAT: Number;

    incicializarVariables() {
        this.ID = 0;
        this.CAJA = 0;
        this.BANCOS = 0;
        this.CREDITO_CLI = 0;
        this.IVAxCOBRAR = 0;
        this.ALMACEN = 0;
        this.PRODUC_COM = 0;
        this.PRODUC_FABRI = 0;
        this.PRODUCTO_PROCESO = 0;
        this.MATERIA_PRIMA = 0;
        this.IVA_ACREDITABLE = 0;
        this.DEUDORES_DIV = 0;
        this.TOTAL_CIRCULANTE = 0;
        this.TOTAL_AF = 0;
        this.TOTAL_ACTIVOS = 0;
        this.CREDITO_PROV = 0;
        this.PROV_IVAxPAGAR = 0;
        this.ACREEDORES_DIV = 0;
        this.NOMINA_DESTAJO = 0;
        this.NOMINA_INDIRECTA = 0;
        this.DEUDA_CRE = 0;
        this.IVAxPAGAR = 0;
        this.TOTAL_PASIVOS = 0;
        this.TOTAL_PATRI = 0;
        this.CAPITAL_INI = 0;
        this.UTILIDAD_EJE = 0;
        this.UTILIDAD_REIN = 0;
        this.INCREMENTO_CAP = 0;
        this.TOTAL_PAS_PAT = 0;
    }

    llenarCampos(datos: balanceinicialService) {
        this.ID = datos.ID;
        this.CAJA = datos.CAJA;
        this.BANCOS = datos.BANCOS;
        this.CREDITO_CLI = datos.CREDITO_CLI;
        this.IVAxCOBRAR = datos.IVAxCOBRAR;
        this.ALMACEN = datos.ALMACEN;
        this.PRODUC_COM = datos.PRODUC_COM;
        this.PRODUC_FABRI = datos.PRODUC_FABRI;
        this.PRODUCTO_PROCESO = datos.PRODUCTO_PROCESO;
        this.MATERIA_PRIMA = datos.MATERIA_PRIMA;
        this.IVA_ACREDITABLE = datos.IVA_ACREDITABLE;
        this.DEUDORES_DIV = datos.DEUDORES_DIV;
        this.TOTAL_CIRCULANTE = datos.TOTAL_CIRCULANTE;
        this.TOTAL_AF = datos.TOTAL_AF;
        this.TOTAL_ACTIVOS = datos.TOTAL_ACTIVOS;
        this.CREDITO_PROV = datos.CREDITO_PROV;
        this.PROV_IVAxPAGAR = datos.PROV_IVAxPAGAR;
        this.ACREEDORES_DIV = datos.ACREEDORES_DIV;
        this.NOMINA_DESTAJO = datos.NOMINA_DESTAJO;
        this.NOMINA_INDIRECTA = datos.NOMINA_INDIRECTA;
        this.DEUDA_CRE = datos.DEUDA_CRE;
        this.IVAxPAGAR = datos.IVAxPAGAR;
        this.TOTAL_PASIVOS = datos.TOTAL_PASIVOS;
        this.TOTAL_PATRI = datos.TOTAL_PATRI;
        this.CAPITAL_INI = datos.CAPITAL_INI;
        this.UTILIDAD_EJE = datos.UTILIDAD_EJE;
        this.UTILIDAD_REIN = datos.UTILIDAD_REIN;
        this.INCREMENTO_CAP = datos.INCREMENTO_CAP;
        this.TOTAL_PAS_PAT = datos.TOTAL_PAS_PAT;
    }

}
