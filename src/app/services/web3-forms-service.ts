import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactData } from '@common/contact-data';
import { environment } from '@common/environment';

@Injectable({ providedIn: 'root' })
export class Web3FormsService {
  url = environment.web3FormUrl;
  key = environment.web3FormKey;
  constructor(private http: HttpClient) {}

  send(data: ContactData, captchaToken: string) {
    return this.http.post(this.url, {
      access_key: this.key,
      ...data,
      'h-captcha-response': captchaToken,
    });
  }
}
