import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { HistoryRoutingModule } from "./history-routing.module";
import { HistoryComponent } from "./containers/history.component";
import { ProposalHistoryComponent } from "./components/proposal-history/proposal-history.component";

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
