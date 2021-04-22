import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleProductoComercialComponent } from './balance-inicial-detalle-producto-comercial.component';

describe('BalanceInicialDetalleProductoComercialComponent', () => {
  let component: BalanceInicialDetalleProductoComercialComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleProductoComercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleProductoComercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleProductoComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
