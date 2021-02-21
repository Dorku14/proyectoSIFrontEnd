import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialComponent } from './balance-inicial.component';

describe('BalanceInicialComponent', () => {
  let component: BalanceInicialComponent;
  let fixture: ComponentFixture<BalanceInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
