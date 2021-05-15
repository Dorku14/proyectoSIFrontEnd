import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialActivosFijosComponent } from './balance-inicial-activos-fijos.component';

describe('BalanceInicialActivosFijosComponent', () => {
  let component: BalanceInicialActivosFijosComponent;
  let fixture: ComponentFixture<BalanceInicialActivosFijosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialActivosFijosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialActivosFijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
