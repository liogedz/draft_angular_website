import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-success',
  imports: [RouterLink],
  templateUrl: './contact-success.html',
  styleUrl: './contact-success.css',
})
export class ContactSuccess {
  sendAnother = output();
  onSendAnother() {
    this.sendAnother.emit();
  }
}
