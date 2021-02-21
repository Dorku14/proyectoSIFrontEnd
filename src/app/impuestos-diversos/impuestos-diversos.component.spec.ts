import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestosDiversosComponent } from './impuestos-diversos.component';

describe('ImpuestosDiversosComponent', () => {
  let component: ImpuestosDiversosComponent;
  let fixture: ComponentFixture<ImpuestosDiversosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpuestosDiversosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestosDiversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
