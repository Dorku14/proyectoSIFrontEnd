import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaInteresCobradoComponent } from './captura-interes-cobrado.component';

describe('CapturaInteresCobradoComponent', () => {
  let component: CapturaInteresCobradoComponent;
  let fixture: ComponentFixture<CapturaInteresCobradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaInteresCobradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaInteresCobradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
