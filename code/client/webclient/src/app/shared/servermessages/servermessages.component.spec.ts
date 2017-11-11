import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServermessagesComponent } from './servermessages.component';

describe('ServermessagesComponent', () => {
  let component: ServermessagesComponent;
  let fixture: ComponentFixture<ServermessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServermessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServermessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
