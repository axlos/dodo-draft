import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Job } from "../../models/job.model";
import { Proposal } from "../../models/proposal.model";

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss']
})
export class ProposalListComponent {

  @Input()
  public job: Job | null = null;
  @Input()
  public loading: boolean = false;
  @Input()
  public saving: boolean = false;
  @Output()
  public delete = new EventEmitter<{
    job: Job,
    proposal: Proposal
  }>();

  public fakeProposal: Proposal = {} as Proposal;
}
