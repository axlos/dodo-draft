import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Job } from "../../models/job.model";
import { JobHistory } from "../../models/job-history.model";

@Component({
  selector: 'app-proposal-history',
  templateUrl: './proposal-history.component.html',
  styleUrls: ['./proposal-history.component.scss']
})
export class ProposalHistoryComponent {

  @Input()
  public loading: boolean = false;

  @Input()
  public jobHistory: JobHistory | null = null

  @Output()
  public delete = new EventEmitter<string>();

}
