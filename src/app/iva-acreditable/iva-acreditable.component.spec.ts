import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaAcreditableComponent } from './iva-acreditable.component';

describe('IvaAcreditableComponent', () => {
  let component: IvaAcreditableComponent;
  let fixture: ComponentFixture<IvaAcreditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvaAcreditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaAcreditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
