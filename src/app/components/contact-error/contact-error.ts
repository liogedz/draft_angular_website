import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-error',
  imports: [RouterLink],
  templateUrl: './contact-error.html',
  styleUrl: './contact-error.css',
})
export class ContactError {
  anotherTry = output();
  onAnotherTry() {
    this.anotherTry.emit();
  }
}
