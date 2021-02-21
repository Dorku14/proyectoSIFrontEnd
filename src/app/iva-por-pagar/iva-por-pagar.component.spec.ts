import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaPorPagarComponent } from './iva-por-pagar.component';

describe('IvaPorPagarComponent', () => {
  let component: IvaPorPagarComponent;
  let fixture: ComponentFixture<IvaPorPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvaPorPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaPorPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
