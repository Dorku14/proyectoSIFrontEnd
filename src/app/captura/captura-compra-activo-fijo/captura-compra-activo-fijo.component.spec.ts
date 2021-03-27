import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaCompraActivoFijoComponent } from './captura-compra-activo-fijo.component';

describe('CapturaCompraActivoFijoComponent', () => {
  let component: CapturaCompraActivoFijoComponent;
  let fixture: ComponentFixture<CapturaCompraActivoFijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaCompraActivoFijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaCompraActivoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
