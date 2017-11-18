import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleOnlineComponent } from './people-online.component';

describe('PeopleOnlineComponent', () => {
  let component: PeopleOnlineComponent;
  let fixture: ComponentFixture<PeopleOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
