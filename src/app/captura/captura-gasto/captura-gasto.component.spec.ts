import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaGastoComponent } from './captura-gasto.component';

describe('CapturaGastoComponent', () => {
  let component: CapturaGastoComponent;
  let fixture: ComponentFixture<CapturaGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
