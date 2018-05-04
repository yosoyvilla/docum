import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumsComponent } from './docums.component';

describe('DocumsComponent', () => {
  let component: DocumsComponent;
  let fixture: ComponentFixture<DocumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
