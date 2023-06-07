import { Component, EventEmitter, Input, Output } from "@angular/core";
import { JobItem } from "../../models/job-item.model";
import { NbComponentStatus } from "@nebular/theme/components/component-status";
import { CrudButtonsConfig } from "../../../../shared/components/crud-buttons/crud-buttons-config";

@Component({
  selector: 'app-proposal-history',
  templateUrl: './proposal-history.component.html',
  styleUrls: ['./proposal-history.component.scss']
})
export class ProposalHistoryComponent {

  @Input()
  public loading: boolean = false;

  @Input()
  public jobHistory: JobItem | null = null

  @Output()
  public delete = new EventEmitter<string>();

  public crudConfig: CrudButtonsConfig = {
    edit: false,
    delete: true
  };
  public proposalCrudConfig: CrudButtonsConfig = {
    edit: false,
    delete: false
  };

  onDelete() {
    this.delete.emit(this.jobHistory?.job._id);
  }

  public get accent(): NbComponentStatus {
    let _accent: NbComponentStatus = 'basic';
    if (this.jobHistory !== null && this.jobHistory.removing) {
      _accent = 'danger';
    }
    return _accent;
  }
}
