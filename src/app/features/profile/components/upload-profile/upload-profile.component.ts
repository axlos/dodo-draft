import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.scss']
})
export class UploadProfileComponent {

  @Output()
  public fileSelected: EventEmitter<File | null> = new EventEmitter();

  public removeFile():void {
    this.fileSelected.emit(null);
  }
  public selectFile(file: File): void {
    this.fileSelected.emit(file);
  };
}
