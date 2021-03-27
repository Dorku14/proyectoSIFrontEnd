import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaIsrComponent } from './captura-isr.component';

describe('CapturaIsrComponent', () => {
  let component: CapturaIsrComponent;
  let fixture: ComponentFixture<CapturaIsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaIsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaIsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
