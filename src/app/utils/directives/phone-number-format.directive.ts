import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNumberFormat]'
})
export class PhoneNumberFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputElement = this.el.nativeElement;
    const inputValue = inputElement.value;

    // Apply the desired phone number formatting
    const formattedValue = this.formatPhoneNumber(inputValue);

    // Update the input field value with the formatted value
    inputElement.value = formattedValue;
  }

  private formatPhoneNumber(value: string): string {
    let phoneNumber = value.replace(/\D/g, '');
   
    if (phoneNumber.length < 4) {
      phoneNumber = '(' + phoneNumber;
    } else if (phoneNumber.length < 7) {
      phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3);
    } else {
      phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6);
    }

    return phoneNumber;
  }
}
