import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleCreditoClientesComponent } from './balance-inicial-detalle-credito-clientes.component';

describe('BalanceInicialDetalleCreditoClientesComponent', () => {
  let component: BalanceInicialDetalleCreditoClientesComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleCreditoClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleCreditoClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleCreditoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
