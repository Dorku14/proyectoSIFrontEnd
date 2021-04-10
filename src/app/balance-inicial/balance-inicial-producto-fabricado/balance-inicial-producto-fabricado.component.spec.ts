import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInicialProductoFabricadoComponent } from './balance-inicial-producto-fabricado.component';

describe('BalanceInicialProductoFabricadoComponent', () => {
  let component: BalanceInicialProductoFabricadoComponent;
  let fixture: ComponentFixture<BalanceInicialProductoFabricadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceInicialProductoFabricadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceInicialProductoFabricadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
