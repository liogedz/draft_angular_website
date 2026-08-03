import { Component, signal } from '@angular/core';
import { ContactData } from '@common/contact-data';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';

@Component({
  selector: 'app-contact-component',
  imports: [FormRoot],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
  standalone: true,
})
export class ContactComponent {
  contactModel = signal<ContactData>({
    email: '',
    subject: '',
    message: '',
  });

  contactForm = form(this.contactModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Valid email is required' });
    required(fieldPath.subject, { message: 'Please provide a subject' });
    required(fieldPath.message, { message: 'Type your message here' });
  });
}
