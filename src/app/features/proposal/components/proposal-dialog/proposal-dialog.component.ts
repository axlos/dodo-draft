import { Component } from "@angular/core";
import { Job } from "../../models/job.model";
import { NbDialogRef } from "@nebular/theme";
import { Profile } from "../../../../core/models/profile.model";

@Component({
  templateUrl: './proposal-dialog.component.html',
})
export class ProposalDialogComponent {

  public profile: Profile;
  public job: Job;
  public loading: boolean;

  constructor(
    private dialogRef: NbDialogRef<ProposalDialogComponent>
  ) {
  }

  public saveProposal(id: string, job: Job): void {
    this.dialogRef.close({ id, job });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}

