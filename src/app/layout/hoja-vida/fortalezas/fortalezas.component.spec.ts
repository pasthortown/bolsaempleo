import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FortalezasComponent } from './fortalezas.component';

describe('FortalezasComponent', () => {
  let component: FortalezasComponent;
  let fixture: ComponentFixture<FortalezasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FortalezasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FortalezasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
