import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaProfesionalComponent } from './experiencia-profesional.component';

describe('ExperienciaProfesionalComponent', () => {
  let component: ExperienciaProfesionalComponent;
  let fixture: ComponentFixture<ExperienciaProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienciaProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienciaProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
