import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoRecibidoComponent } from './prestamo-recibido.component';

describe('PrestamoRecibidoComponent', () => {
  let component: PrestamoRecibidoComponent;
  let fixture: ComponentFixture<PrestamoRecibidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamoRecibidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoRecibidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
