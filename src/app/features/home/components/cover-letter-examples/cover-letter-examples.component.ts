import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-cover-letter-examples',
  templateUrl: './cover-letter-examples.component.html',
  styleUrls: ['./cover-letter-examples.component.scss'],
})
export class CoverLetterExamplesComponent implements OnDestroy {

  public examples: any[] = [];

  private subscription = new Subscription();

  constructor(
    private translate: TranslateService
  ) {
    this.subscription.add(
      this.translate.stream('home.cover-letter')
        .subscribe((testimonial) => {
          this.examples = [1, 2, 3, 4].map((index) => {
            const testI18n = testimonial[`example-${index}`];
            return {
              title: testI18n.title,
              content: testI18n.content,
            }
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
