import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaComisionesComponent } from './captura-comisiones.component';

describe('CapturaComisionesComponent', () => {
  let component: CapturaComisionesComponent;
  let fixture: ComponentFixture<CapturaComisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaComisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaComisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
