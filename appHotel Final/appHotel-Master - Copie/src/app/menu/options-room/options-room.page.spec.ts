import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsRoomPage } from './options-room.page';

describe('OptionsRoomPage', () => {
  let component: OptionsRoomPage;
  let fixture: ComponentFixture<OptionsRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
