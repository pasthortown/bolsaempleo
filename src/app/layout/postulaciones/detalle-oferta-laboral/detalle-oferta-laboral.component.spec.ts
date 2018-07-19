import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOfertaLaboralComponent } from './detalle-oferta-laboral.component';

describe('DetalleOfertaLaboralComponent', () => {
  let component: DetalleOfertaLaboralComponent;
  let fixture: ComponentFixture<DetalleOfertaLaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleOfertaLaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleOfertaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
