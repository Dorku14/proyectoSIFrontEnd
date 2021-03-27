import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaVentaActivoFijoComponent } from './captura-venta-activo-fijo.component';

describe('CapturaVentaActivoFijoComponent', () => {
  let component: CapturaVentaActivoFijoComponent;
  let fixture: ComponentFixture<CapturaVentaActivoFijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaVentaActivoFijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaVentaActivoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
