import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdminEmpresaComponent } from './detalle-admin-empresa.component';

describe('DetalleAdminEmpresaComponent', () => {
  let component: DetalleAdminEmpresaComponent;
  let fixture: ComponentFixture<DetalleAdminEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdminEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdminEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
