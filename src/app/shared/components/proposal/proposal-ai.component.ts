import { Component, Input } from "@angular/core";
import { Proposal } from "../../../features/proposal/models/proposal.model";

@Component({
  selector: 'app-proposal-ai',
  templateUrl: './proposal-ai.component.html',
  styleUrls: ['./proposal-ai.component.scss']
})
export class ProposalAiComponent {

  @Input()
  public proposal: Proposal | null = null;

  @Input()
  public loading: boolean = false;

}
