import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoProveedoresComponent } from './credito-proveedores.component';

describe('CreditoProveedoresComponent', () => {
  let component: CreditoProveedoresComponent;
  let fixture: ComponentFixture<CreditoProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditoProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
