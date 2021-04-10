import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialProductoComercialComponent } from './balance-inicial-producto-comercial.component';

describe('BalanceInicialProductoComercialComponent', () => {
  let component: BalanceInicialProductoComercialComponent;
  let fixture: ComponentFixture<BalanceInicialProductoComercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialProductoComercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialProductoComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
