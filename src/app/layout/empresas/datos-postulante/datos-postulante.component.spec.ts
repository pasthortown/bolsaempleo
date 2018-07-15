import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPostulanteComponent } from './datos-postulante.component';

describe('DatosPostulanteComponent', () => {
  let component: DatosPostulanteComponent;
  let fixture: ComponentFixture<DatosPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
