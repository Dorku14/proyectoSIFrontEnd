import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaBancoBancoComponent } from './captura-banco-banco.component';

describe('CapturaBancoBancoComponent', () => {
  let component: CapturaBancoBancoComponent;
  let fixture: ComponentFixture<CapturaBancoBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaBancoBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaBancoBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
