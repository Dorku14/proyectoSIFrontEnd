export enum PATH {
    paginaMestra = 'PMA'
}

export enum NombreComponente{
    PRODCOMERCIAL = 'PC',
    SERVICIOS = 'SRV',
    PRODFABRICADOS = 'PF',
    MATERIAPRIMA = 'MT',
    MANOSDOBRA = 'MO',
    CATEGORIA = 'CAT',
    UNIDADDMEDIDA = 'UM',
    PRODUCCION = 'PRODUCCION',
    ASIGNARMATERIASP = 'ASIGNARMP',
    IMPUESTOS = 'IM',
    COMPRAS = 'COMPRAS',
    VENTAS = 'VENTAS',
    CLIENTES = 'CLIENTES',
    PROVEEDORES = 'PROVEEDORES'
}

export enum clasesEstilos{
    noActivo = 'noActivo',
    Activo = 'Activo'
}

export enum MODO{
    ALTA = 'ALTA',
    MODIFICAR = 'MODIFICAR',
    DETALLE = 'DETALLE',
    REACTIVAR = 'REACTIVAR',
}

export const EXITO = '00';
export const NOEXISTE = '10';
export const direccionHttp = 'http://127.0.0.1:8000/api/';

export const mascaraMoneda = { prefix: '$ ', thousands: ',', decimal: '.' , align:'left',allowNegative:false,precision: 2};

export enum TIPOMOVDOCS{
  COMPRAS = 'C',
  VENTAS = 'V'
}
