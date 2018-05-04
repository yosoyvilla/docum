import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyuserdataComponent } from './myuserdata.component';

describe('MyuserdataComponent', () => {
  let component: MyuserdataComponent;
  let fixture: ComponentFixture<MyuserdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyuserdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyuserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
