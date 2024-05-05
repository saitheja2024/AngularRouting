import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private el: ElementRef) { 
    console.log("initiated directive")
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const inputElement = this.el.nativeElement;
    const inputValue = inputElement.value.toLowerCase()
    .replace((/(?<=\b)\p{L}/gu), (match: string) => match.toUpperCase());
  //  inputValue.filter((item:any, key:any)=>{ return item.charAt(0).toUpperCase() });
    inputElement.value = inputValue;
  }
}
