import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionCursosComponent } from './capacitacion-cursos.component';

describe('CapacitacionCursosComponent', () => {
  let component: CapacitacionCursosComponent;
  let fixture: ComponentFixture<CapacitacionCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacitacionCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitacionCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
