import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDetalleBancosComponent } from './balance-inicial-detalle-bancos.component';

describe('BalanceInicialDetalleBancosComponent', () => {
  let component: BalanceInicialDetalleBancosComponent;
  let fixture: ComponentFixture<BalanceInicialDetalleBancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDetalleBancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDetalleBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
