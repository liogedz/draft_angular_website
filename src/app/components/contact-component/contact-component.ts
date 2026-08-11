import { Component, computed, signal } from '@angular/core';
import { ContactData } from '@common/contact-data';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Web3FormsService } from '@services/web3-forms-service';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { ContactError } from '@components/contact-error/contact-error';
import { ContactSuccess } from '@components/contact-success/contact-success';

@Component({
  selector: 'app-contact-component',
  imports: [FormRoot, FormField, NgHcaptchaModule, ContactError, ContactSuccess],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
  standalone: true,
})
export class ContactComponent {
  readonly status = signal<'idle' | 'success' | 'sending' | 'error'>('idle');
  readonly errorMessage = signal('');
  captchaToken = signal('');
  onVerify(token: string) {
    this.captchaToken.set(token);
  }
  onExpired() {
    this.captchaToken.set('');
  }
  onError() {
    this.captchaToken.set('');
  }

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
          this.status.set('sending');
          try {
            await firstValueFrom(this.web3FormService.send(f().value(), this.captchaToken()));
            this.status.set('success');
            this.errorMessage.set('');
            // this.resetModel();
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

  resetModel() {
    this.contactModel.set({
      email: '',
      subject: '',
      message: '',
    });
  }
  onSendAnother() {
    this.status.set('idle');
  }
}
