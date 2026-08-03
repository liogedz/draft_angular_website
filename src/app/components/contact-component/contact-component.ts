import { Component, computed, signal } from '@angular/core';
import { ContactData } from '@common/contact-data';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Web3FormsService } from '@services/web3-forms-service';

@Component({
  selector: 'app-contact-component',
  imports: [FormRoot, FormField],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
  standalone: true,
})
export class ContactComponent {
  constructor(private web3FormService: Web3FormsService) {}
  contactModel = signal<ContactData>({
    email: '',
    subject: '',
    message: '',
  });

  contactForm = form(
    this.contactModel,
    (fieldPath) => {
      required(fieldPath.email, { message: 'Email is required' });
      email(fieldPath.email, { message: 'Valid email is required' });
      required(fieldPath.subject, { message: 'Please provide a subject' });
      required(fieldPath.message, { message: 'Type your message here' });
    },
    {
      submission: {
        action: async (f) => {
          await firstValueFrom(this.web3FormService.send(f().value()));
        },
      },
    },
  );

  hasFormErrors = computed(
    () =>
      this.contactForm.email().invalid() ||
      this.contactForm.subject().invalid() ||
      this.contactForm.message().invalid(),
  );

  formTouched = computed(
    () =>
      this.contactForm.email().touched() ||
      this.contactForm.subject().touched() ||
      this.contactForm.message().touched(),
  );

  isFormDisabled = computed(() => this.hasFormErrors());
}
