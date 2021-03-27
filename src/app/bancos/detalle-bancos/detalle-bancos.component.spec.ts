import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBancosComponent } from './detalle-bancos.component';

describe('DetalleBancosComponent', () => {
  let component: DetalleBancosComponent;
  let fixture: ComponentFixture<DetalleBancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleBancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
