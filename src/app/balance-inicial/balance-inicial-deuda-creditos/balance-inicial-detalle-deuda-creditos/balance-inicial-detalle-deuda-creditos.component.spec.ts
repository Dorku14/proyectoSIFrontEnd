import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleDeudaCreditosComponent } from './balance-inicial-detalle-deuda-creditos.component';

describe('BalanceInicialDetalleDeudaCreditosComponent', () => {
  let component: BalanceInicialDetalleDeudaCreditosComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleDeudaCreditosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleDeudaCreditosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleDeudaCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
