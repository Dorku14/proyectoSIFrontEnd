import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaInteresPagadoComponent } from './captura-interes-pagado.component';

describe('CapturaInteresPagadoComponent', () => {
  let component: CapturaInteresPagadoComponent;
  let fixture: ComponentFixture<CapturaInteresPagadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaInteresPagadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaInteresPagadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
