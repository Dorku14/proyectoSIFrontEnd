import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaBancoEfectivoComponent } from './captura-banco-efectivo.component';

describe('CapturaBancoEfectivoComponent', () => {
  let component: CapturaBancoEfectivoComponent;
  let fixture: ComponentFixture<CapturaBancoEfectivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaBancoEfectivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaBancoEfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
