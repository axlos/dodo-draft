import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { HistoryComponent } from "./history.component";
import { HistoryRoutingModule } from "./history-routing.module";
import { ProposalHistoryComponent } from "./proposal-history/proposal-history.component";

@NgModule({
  declarations: [
    HistoryComponent,
    ProposalHistoryComponent
  ],
  imports: [
    HistoryRoutingModule,
    SharedModule
  ],
  providers: []
})
export class HistoryModule {
}
