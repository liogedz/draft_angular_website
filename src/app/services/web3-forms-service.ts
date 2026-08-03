import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactData } from '@common/contact-data';
import { ENVIRONMENT } from '@common/environment';

@Service()
export class Web3FormsService {
  url=ENVIRONMENT.web3FormUrl
  key=ENVIRONMENT.web3FormKey
  constructor(private http: HttpClient) {}

  send(data: ContactData) {
    return this.http.post(this.url, {
      access_key: this.key,
      ...data,
    });
  }
}
