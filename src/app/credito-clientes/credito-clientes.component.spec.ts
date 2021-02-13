import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoClientesComponent } from './credito-clientes.component';

describe('CreditoClientesComponent', () => {
  let component: CreditoClientesComponent;
  let fixture: ComponentFixture<CreditoClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditoClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
