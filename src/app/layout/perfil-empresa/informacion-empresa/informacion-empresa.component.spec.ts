import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionEmpresaComponent } from './informacion-empresa.component';

describe('ProfesionalesComponent', () => {
  let component: InformacionEmpresaComponent;
  let fixture: ComponentFixture<InformacionEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
