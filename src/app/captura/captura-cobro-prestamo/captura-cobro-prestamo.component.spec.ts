import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaCobroPrestamoComponent } from './captura-cobro-prestamo.component';

describe('CapturaCobroPrestamoComponent', () => {
  let component: CapturaCobroPrestamoComponent;
  let fixture: ComponentFixture<CapturaCobroPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaCobroPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaCobroPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
