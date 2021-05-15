import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleActivosFijosComponent } from './balance-inicial-detalle-activos-fijos.component';

describe('BalanceInicialDetalleActivosFijosComponent', () => {
  let component: BalanceInicialDetalleActivosFijosComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleActivosFijosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleActivosFijosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleActivosFijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
