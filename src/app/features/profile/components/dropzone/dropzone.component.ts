import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent {

  @Output()
  public selectFile: EventEmitter<File> = new EventEmitter<File>();
  @Output()
  public removeFile: EventEmitter<void> = new EventEmitter<any>();

  public file: File | null = null;

  public onSelect(event: any): void {
    if (this.file === null) {
      this.file = event.addedFiles[0] as File;
      this.selectFile.emit(this.file);
    }
  }

  public onRemove(): void {
    this.file = null;
    this.removeFile.emit();
  }

}
