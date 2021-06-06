import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleProductoEnProcesoComponent } from './balance-inicial-detalle-producto-en-proceso.component';

describe('BalanceInicialDetalleProductoEnProcesoComponent', () => {
  let component: BalanceInicialDetalleProductoEnProcesoComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleProductoEnProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleProductoEnProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleProductoEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
