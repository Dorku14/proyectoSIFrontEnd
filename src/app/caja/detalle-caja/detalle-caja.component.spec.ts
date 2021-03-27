import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCajaComponent } from './detalle-caja.component';

describe('DetalleCajaComponent', () => {
  let component: DetalleCajaComponent;
  let fixture: ComponentFixture<DetalleCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
