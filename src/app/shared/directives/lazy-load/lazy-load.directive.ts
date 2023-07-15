import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
})
export class LazyLoadDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
    console.log('loading directive LazyLoadDirective');
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log({
          'evaluating entry': entry,
        });
        if (entry.isIntersecting) {
          const content = this.el.nativeElement;
          content.classList.add('loaded-content');
          observer.disconnect();
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }
}
