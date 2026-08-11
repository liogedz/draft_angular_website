import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSuccess } from './contact-success';

describe('ContactSuccess', () => {
  let component: ContactSuccess;
  let fixture: ComponentFixture<ContactSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSuccess],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
