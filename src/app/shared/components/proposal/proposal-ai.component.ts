import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Proposal } from "../../../features/proposal/models/proposal.model";
import { CrudButtonsConfig } from "../crud-buttons/crud-buttons-config";

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
  @Input()
  public crudConfig: CrudButtonsConfig = {
    edit: false,
    delete: true,
    confirmEdit: false
  };
  @Output()
  public delete = new EventEmitter<Proposal>();

  public onDelete(): void {
    this.delete.emit(this.proposal);
  }

  public async copyToClipboard() {
    // Create a new div element
    const tempElement = document.createElement('div');
    // Set the HTML content
    tempElement.innerHTML = this.proposal?.coverLetter;
    // Get the text content
    let textContent = tempElement.textContent || '';
    // Remove all spaces
    textContent = textContent.trim().replace(/[ \t]{2,}/g, ' ');
    // Copy to clipboard
    await navigator.clipboard.writeText(textContent).then(function() {
    }, function(err) {
    });
  }
}
