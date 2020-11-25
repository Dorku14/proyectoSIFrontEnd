import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleManoDeObraComponent } from './detalle-mano-de-obra.component';

describe('DetalleManoDeObraComponent', () => {
  let component: DetalleManoDeObraComponent;
  let fixture: ComponentFixture<DetalleManoDeObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleManoDeObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleManoDeObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
