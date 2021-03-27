import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaCobroClientesComponent } from './captura-cobro-clientes.component';

describe('CapturaCobroClientesComponent', () => {
  let component: CapturaCobroClientesComponent;
  let fixture: ComponentFixture<CapturaCobroClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaCobroClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaCobroClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
