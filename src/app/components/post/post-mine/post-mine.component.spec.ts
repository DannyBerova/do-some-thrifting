import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMineComponent } from './post-mine.component';

describe('PostMineComponent', () => {
  let component: PostMineComponent;
  let fixture: ComponentFixture<PostMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
