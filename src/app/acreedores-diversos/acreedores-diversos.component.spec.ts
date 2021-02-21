import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcreedoresDiversosComponent } from './acreedores-diversos.component';

describe('AcreedoresDiversosComponent', () => {
  let component: AcreedoresDiversosComponent;
  let fixture: ComponentFixture<AcreedoresDiversosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcreedoresDiversosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcreedoresDiversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
