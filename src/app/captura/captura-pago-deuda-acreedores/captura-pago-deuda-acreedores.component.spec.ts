import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPagoDeudaAcreedoresComponent } from './captura-pago-deuda-acreedores.component';

describe('CapturaPagoDeudaAcreedoresComponent', () => {
  let component: CapturaPagoDeudaAcreedoresComponent;
  let fixture: ComponentFixture<CapturaPagoDeudaAcreedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaPagoDeudaAcreedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPagoDeudaAcreedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
