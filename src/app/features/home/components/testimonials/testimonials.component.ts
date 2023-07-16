import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnDestroy {
  public testimonials: any[] = [];

  private subscription = new Subscription();

  constructor(
    private translate: TranslateService
  ) {
    this.subscription.add(
      this.translate.stream('home.testimonials')
        .subscribe((testimonial) => {
          this.testimonials = [1, 2, 3].map((index) => {
            const testI18n = testimonial[`testimonial-${index}`];
            return {
              photo: testI18n.photo,
              name: testI18n.name,
              role: testI18n.role,
              text: testI18n.text,
            }
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
