import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'wordCount'
})
export class WordCountPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string, limit: number): SafeHtml {
    let length = 0;
    let colorClass = 'text-warning-300';

    if (value) {
      length = (
        value.split(' ') ?? []
      ).length;
    }

    if (length > limit) {
      colorClass = 'text-danger';
    }

    return this.sanitizer.bypassSecurityTrustHtml(
      `<strong class="${colorClass}">${limit - length}</strong> / <span>${limit}</span>`
    );
  }
}
