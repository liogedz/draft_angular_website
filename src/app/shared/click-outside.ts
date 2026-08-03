import {Directive, ElementRef, HostListener, output} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutside {

  // @Output() clickOutside = new EventEmitter<void>();
  clickOutside = output<void>()// same, with shorter syntax

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

}
