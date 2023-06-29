import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { JobItem } from "../../interfaces/job-item.interface";
import { CrudButtonsConfig } from "../../../../shared/components/crud-buttons/crud-buttons-config";

@Component({
  selector: 'app-proposal-history',
  templateUrl: './proposal-history.component.html',
  styleUrls: ['./proposal-history.component.scss']
})
export class ProposalHistoryComponent implements OnInit {

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
  public breakpoints: string;

  ngOnInit() {
    this.breakpoints = window.innerWidth <= 576 ? 'sm' : 'md';
  }

  public onDelete() {
    this.delete.emit(this.jobHistory?.job._id);
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event: any) {
    const screenWidth = event.target.innerWidth;
    this.breakpoints = screenWidth <= 576 ? 'sm' : 'md';
  }
}
