import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDestroyComponent } from './user-destroy.component';

describe('UserDestroyComponent', () => {
  let component: UserDestroyComponent;
  let fixture: ComponentFixture<UserDestroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDestroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDestroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
