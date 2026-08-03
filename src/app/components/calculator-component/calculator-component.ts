import {Component, computed, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';
import {CurrencyPipe, NgClass} from '@angular/common';
import {LIST_SERVICES} from '@common/list-services';

@Component({
  selector: 'app-calculator-component',
  imports: [
    FormField,
    CurrencyPipe,
    NgClass
  ],
  templateUrl: './calculator-component.html',
  styleUrl: './calculator-component.css',
})
export class CalculatorComponent {
  protected services = LIST_SERVICES

  protected formModel = signal<boolean[]>(this.services.map(() => false));
  protected calcForm = form(this.formModel);

  protected totalPrice = computed(() => {
    const states = this.formModel();
    return states.reduce((sum, isSelected, index) => {
      return isSelected ? sum + this.services[index].price : sum;
    }, 0);
  });

}
