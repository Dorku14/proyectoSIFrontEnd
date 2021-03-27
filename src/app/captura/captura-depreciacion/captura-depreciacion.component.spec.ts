import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaDepreciacionComponent } from './captura-depreciacion.component';

describe('CapturaDepreciacionComponent', () => {
  let component: CapturaDepreciacionComponent;
  let fixture: ComponentFixture<CapturaDepreciacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaDepreciacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
