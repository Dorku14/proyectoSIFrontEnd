import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoOtorgadoComponent } from './prestamo-otorgado.component';

describe('PrestamoOtorgadoComponent', () => {
  let component: PrestamoOtorgadoComponent;
  let fixture: ComponentFixture<PrestamoOtorgadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamoOtorgadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoOtorgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
