import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPrestamoOtorgadoComponent } from './captura-prestamo-otorgado.component';

describe('CapturaPrestamoOtorgadoComponent', () => {
  let component: CapturaPrestamoOtorgadoComponent;
  let fixture: ComponentFixture<CapturaPrestamoOtorgadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaPrestamoOtorgadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPrestamoOtorgadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
