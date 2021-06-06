import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleCreditoProveedoresComponent } from './balance-inicial-detalle-credito-proveedores.component';

describe('BalanceInicialDetalleCreditoProveedoresComponent', () => {
  let component: BalanceInicialDetalleCreditoProveedoresComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleCreditoProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleCreditoProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleCreditoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
