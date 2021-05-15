import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaActivosFijosComponent } from './categoria-activos-fijos.component';

describe('CategoriaActivosFijosComponent', () => {
  let component: CategoriaActivosFijosComponent;
  let fixture: ComponentFixture<CategoriaActivosFijosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaActivosFijosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaActivosFijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
