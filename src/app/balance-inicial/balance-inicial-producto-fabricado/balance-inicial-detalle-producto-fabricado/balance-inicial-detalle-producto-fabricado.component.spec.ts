import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleProductoFabricadoComponent } from './balance-inicial-detalle-producto-fabricado.component';

describe('BalanceInicialDetalleProductoFabricadoComponent', () => {
  let component: BalanceInicialDetalleProductoFabricadoComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleProductoFabricadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleProductoFabricadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleProductoFabricadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
