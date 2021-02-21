import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialCreditoProveedoresComponent } from './balance-inicial-credito-proveedores.component';

describe('BalanceInicialCreditoProveedoresComponent', () => {
  let component: BalanceInicialCreditoProveedoresComponent;
  let fixture: ComponentFixture<BalanceInicialCreditoProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialCreditoProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialCreditoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
