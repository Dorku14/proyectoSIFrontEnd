import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPagoPrestamoComponent } from './captura-pago-prestamo.component';

describe('CapturaPagoPrestamoComponent', () => {
  let component: CapturaPagoPrestamoComponent;
  let fixture: ComponentFixture<CapturaPagoPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaPagoPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPagoPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
