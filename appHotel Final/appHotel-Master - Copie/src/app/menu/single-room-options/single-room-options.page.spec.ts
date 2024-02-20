import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRoomOptionsPage } from './single-room-options.page';

describe('SingleRoomOptionsPage', () => {
  let component: SingleRoomOptionsPage;
  let fixture: ComponentFixture<SingleRoomOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleRoomOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRoomOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
