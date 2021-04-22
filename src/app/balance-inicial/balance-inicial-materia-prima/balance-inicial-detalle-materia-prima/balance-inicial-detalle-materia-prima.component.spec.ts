import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleMateriaPrimaComponent } from './balance-inicial-detalle-materia-prima.component';

describe('BalanceInicialDetalleMateriaPrimaComponent', () => {
  let component: BalanceInicialDetalleMateriaPrimaComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleMateriaPrimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleMateriaPrimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
