import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureListComponent } from './secure-list.component';

describe('SecureListComponent', () => {
  let component: SecureListComponent;
  let fixture: ComponentFixture<SecureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
