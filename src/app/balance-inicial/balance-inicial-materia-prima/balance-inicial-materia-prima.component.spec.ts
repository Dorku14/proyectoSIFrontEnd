import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialMateriaPrimaComponent } from './balance-inicial-materia-prima.component';

describe('BalanceInicialMateriaPrimaComponent', () => {
  let component: BalanceInicialMateriaPrimaComponent;
  let fixture: ComponentFixture<BalanceInicialMateriaPrimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialMateriaPrimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
