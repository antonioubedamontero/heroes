import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('change') onInputChange() {
    const elem = this.elementRef.nativeElement;
    const textCapitalize = this.capitalize(elem.value)
    elem.value = textCapitalize;
  }

  private capitalize(text: string): string {
    if (!text) {
      return '';
    }
    const textAsArray: string[] = text.split(' ');
    const textCapitalize = textAsArray.map((subStr: string) => {
      return subStr[0].toUpperCase()+subStr.slice(1);
    });
    return textCapitalize.join(' ');
  }
}
