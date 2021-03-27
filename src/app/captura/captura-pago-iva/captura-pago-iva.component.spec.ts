import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPagoIvaComponent } from './captura-pago-iva.component';

describe('CapturaPagoIvaComponent', () => {
  let component: CapturaPagoIvaComponent;
  let fixture: ComponentFixture<CapturaPagoIvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaPagoIvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPagoIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
