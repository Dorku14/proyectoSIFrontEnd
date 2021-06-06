import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleAcreedoresDiversosComponent } from './balance-inicial-detalle-acreedores-diversos.component';

describe('BalanceInicialDetalleAcreedoresDiversosComponent', () => {
  let component: BalanceInicialDetalleAcreedoresDiversosComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleAcreedoresDiversosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleAcreedoresDiversosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleAcreedoresDiversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
