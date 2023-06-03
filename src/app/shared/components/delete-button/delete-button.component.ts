import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

  @Input()
  public loading: boolean = false;

  @Output()
  public delete = new EventEmitter<void>();

  public displayConfirm: boolean = false;
  public displayRemove: boolean = true;

  public confirm(): void {
    this.displayConfirm = true;
    this.displayRemove = false;
  }

  public cancel(): void {
    this.displayConfirm = false;
    this.displayRemove = true;
  }
}
