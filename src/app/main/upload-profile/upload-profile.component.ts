import { Component } from "@angular/core";

@Component({
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.scss']
})
export class UploadProfileComponent {

  // in app.component.ts
  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
