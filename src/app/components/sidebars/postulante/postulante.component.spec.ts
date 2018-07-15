import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulanteComponent } from './postulante.component';

describe('PostulanteComponent', () => {
  let component: PostulanteComponent;
  let fixture: ComponentFixture<PostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
