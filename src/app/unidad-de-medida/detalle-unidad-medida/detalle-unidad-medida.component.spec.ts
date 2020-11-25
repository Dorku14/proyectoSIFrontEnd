import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUnidadMedidaComponent } from './detalle-unidad-medida.component';

describe('DetalleUnidadMedidaComponent', () => {
  let component: DetalleUnidadMedidaComponent;
  let fixture: ComponentFixture<DetalleUnidadMedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleUnidadMedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUnidadMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
