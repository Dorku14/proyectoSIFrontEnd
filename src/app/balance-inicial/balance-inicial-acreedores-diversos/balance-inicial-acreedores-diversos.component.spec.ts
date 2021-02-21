import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialAcreedoresDiversosComponent } from './balance-inicial-acreedores-diversos.component';

describe('BalanceInicialAcreedoresDiversosComponent', () => {
  let component: BalanceInicialAcreedoresDiversosComponent;
  let fixture: ComponentFixture<BalanceInicialAcreedoresDiversosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialAcreedoresDiversosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialAcreedoresDiversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
