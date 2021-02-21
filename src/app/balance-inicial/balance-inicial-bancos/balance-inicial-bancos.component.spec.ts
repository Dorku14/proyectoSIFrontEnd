import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialBancosComponent } from './balance-inicial-bancos.component';

describe('BalanceInicialBancosComponent', () => {
  let component: BalanceInicialBancosComponent;
  let fixture: ComponentFixture<BalanceInicialBancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialBancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
