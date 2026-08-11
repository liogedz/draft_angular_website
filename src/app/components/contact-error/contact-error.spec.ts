import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactError } from './contact-error';

describe('ContactError', () => {
  let component: ContactError;
  let fixture: ComponentFixture<ContactError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactError],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
