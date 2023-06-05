import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CrudButtonsConfig } from "./crud-buttons-config";

@Component({
  selector: 'app-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent {

  @Input()
  public loading: boolean = false;
  @Input()
  public config: CrudButtonsConfig = {
    edit: true,
    delete: true
  };
  @Output()
  public delete = new EventEmitter<void>();
  @Output()
  public save = new EventEmitter<void>();
  @Output()
  public cancel = new EventEmitter<void>();
  @Output()
  public edit = new EventEmitter<void>();

  public deleting: boolean = false;
  public editing: boolean = false;

  public onConfirm(): void {
    if (this.editing) {
      this.editing = false;
      this.save.emit();
    } else if (this.deleting) {
      this.deleting = false;
      this.delete.emit();
    }
  }

  public onEdit(): void {
    this.editing = true;
    this.edit.emit();
  }

  public onCancel(): void {
    this.editing = false;
    this.deleting = false;
    this.cancel.emit();
  }

  public onDelete(): void {
    this.deleting = true;
  }
}
