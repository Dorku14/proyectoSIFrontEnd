import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaImpuestosComponent } from './captura-impuestos.component';

describe('CapturaImpuestosComponent', () => {
  let component: CapturaImpuestosComponent;
  let fixture: ComponentFixture<CapturaImpuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaImpuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
