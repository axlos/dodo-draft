import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SuggestVariant } from "../../../../core/models/suggest-variant.model";

@Component({
  selector: 'app-suggest-variants',
  templateUrl: './suggest-variants.component.html',
  styleUrls: ['./suggest-variants.component.scss']
})
export class SuggestVariantsComponent implements OnInit {
  @Input()
  public summaryVariants: SuggestVariant[] = [];

  @Input()
  public suggesting: boolean = false;
  @Input()
  public savingVariant: boolean = false;
  @Output()
  public suggestVariants = new EventEmitter<void>();
  @Output()
  public optimize = new EventEmitter<void>();
  @Output()
  public approve = new EventEmitter<string>();
  @Output()
  public cancelAll = new EventEmitter<string>();
  public currentIndex: number = 0;

  ngOnInit(): void {
    this.currentIndex = 0;
  }

  public back(): void {
    this.currentIndex--;
  }

  public next(): void {
    this.currentIndex++;
  }

  public onApprove(): void {
    this.approve.emit(this.summaryVariants[this.currentIndex].content);
  }

  public onOptimize(): void {
    this.currentIndex = 0;
    this.optimize.emit();
  }

}
