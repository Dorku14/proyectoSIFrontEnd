import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaDestajoComponent } from './nomina-destajo.component';

describe('NominaDestajoComponent', () => {
  let component: NominaDestajoComponent;
  let fixture: ComponentFixture<NominaDestajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominaDestajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominaDestajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
