import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialCreditoClientesComponent } from './balance-inicial-credito-clientes.component';

describe('BalanceInicialCreditoClientesComponent', () => {
  let component: BalanceInicialCreditoClientesComponent;
  let fixture: ComponentFixture<BalanceInicialCreditoClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialCreditoClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialCreditoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
