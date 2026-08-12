import { Component, computed, signal } from '@angular/core';
import { ContactData } from '@common/contact-data';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Web3FormsService } from '@services/web3-forms-service';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { ContactError } from '@components/contact-error/contact-error';
import { ContactSuccess } from '@components/contact-success/contact-success';

@Component({
  selector: 'app-contact',
  imports: [FormRoot, FormField, NgHcaptchaModule, ContactError, ContactSuccess],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  standalone: true,
})
export class Contact {
  readonly status = signal<'idle' | 'success' | 'sending' | 'error'>('idle');
  readonly errorMessage = signal('');
  captchaToken = signal('');
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
          this.status.set('sending');
          try {
            await firstValueFrom(this.web3FormService.send(f().value(), this.captchaToken()));
            this.status.set('success');
            this.errorMessage.set('');
          } catch (err) {
            this.status.set('error');
            this.errorMessage.set('Failed to send message');
          }
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
  isCaptchaMissing = computed(() => !this.captchaToken());
  isFormDisabled = computed(() => this.hasFormErrors() || this.isCaptchaMissing());

  constructor(private web3FormService: Web3FormsService) {}

  onVerify(token: string) {
    this.captchaToken.set(token);
  }

  onExpired() {
    this.captchaToken.set('');
  }

  onError() {
    this.captchaToken.set('');
  }

  onSendAnother() {
    this.status.set('idle');
    this.contactModel.update((value) => ({
      ...value,
      subject: '',
      message: '',
    }));
  }
}
