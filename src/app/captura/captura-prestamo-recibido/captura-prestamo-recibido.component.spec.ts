import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPrestamoRecibidoComponent } from './captura-prestamo-recibido.component';

describe('CapturaPrestamoRecibidoComponent', () => {
  let component: CapturaPrestamoRecibidoComponent;
  let fixture: ComponentFixture<CapturaPrestamoRecibidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaPrestamoRecibidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPrestamoRecibidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
