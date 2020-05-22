import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureRegistryComponent } from './secure-registry.component';

describe('SecureRegistryComponent', () => {
  let component: SecureRegistryComponent;
  let fixture: ComponentFixture<SecureRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
