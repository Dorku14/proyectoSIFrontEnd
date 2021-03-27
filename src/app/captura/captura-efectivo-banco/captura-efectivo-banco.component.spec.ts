import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaEfectivoBancoComponent } from './captura-efectivo-banco.component';

describe('CapturaEfectivoBancoComponent', () => {
  let component: CapturaEfectivoBancoComponent;
  let fixture: ComponentFixture<CapturaEfectivoBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaEfectivoBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaEfectivoBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
