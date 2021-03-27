import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaNominaPrestacionesComponent } from './captura-nomina-prestaciones.component';

describe('CapturaNominaPrestacionesComponent', () => {
  let component: CapturaNominaPrestacionesComponent;
  let fixture: ComponentFixture<CapturaNominaPrestacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaNominaPrestacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaNominaPrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
