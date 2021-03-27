import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPagoCreditoProveedoresComponent } from './captura-pago-credito-proveedores.component';

describe('CapturaPagoCreditoProveedoresComponent', () => {
  let component: CapturaPagoCreditoProveedoresComponent;
  let fixture: ComponentFixture<CapturaPagoCreditoProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaPagoCreditoProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPagoCreditoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
