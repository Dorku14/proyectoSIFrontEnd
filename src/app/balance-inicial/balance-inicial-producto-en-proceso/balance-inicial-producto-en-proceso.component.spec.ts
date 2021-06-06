import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialProductoEnProcesoComponent } from './balance-inicial-producto-en-proceso.component';

describe('BalanceInicialProductoEnProcesoComponent', () => {
  let component: BalanceInicialProductoEnProcesoComponent;
  let fixture: ComponentFixture<BalanceInicialProductoEnProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialProductoEnProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialProductoEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
