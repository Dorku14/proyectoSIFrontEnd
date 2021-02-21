import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDeudaCreditosComponent } from './balance-inicial-deuda-creditos.component';

describe('BalanceInicialDeudaCreditosComponent', () => {
  let component: BalanceInicialDeudaCreditosComponent;
  let fixture: ComponentFixture<BalanceInicialDeudaCreditosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDeudaCreditosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDeudaCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
