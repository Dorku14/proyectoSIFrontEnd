import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialDeudoresDiversosComponent } from './balance-inicial-deudores-diversos.component';

describe('BalanceInicialDeudoresDiversosComponent', () => {
  let component: BalanceInicialDeudoresDiversosComponent;
  let fixture: ComponentFixture<BalanceInicialDeudoresDiversosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialDeudoresDiversosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialDeudoresDiversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
