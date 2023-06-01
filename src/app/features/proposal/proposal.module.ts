import { NgModule } from '@angular/core';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { SharedModule } from "../../shared/shared.module";
import { ProposalComponent } from "./containers/proposal/proposal.component";
import { ProposalRoutingModule } from "./proposal-routing.module";
import { ProposalFormComponent } from "./components/profile-form/proposal-form.component";
import { ProposalListComponent } from "./components/proposal-list/proposal-list.component";
import { HistoryComponent } from "./containers/history/history.component";
import { ProposalHistoryComponent } from "./components/proposal-history/proposal-history.component";
import { JobEffects } from "./store/job/job.effects";
import { jobFeature } from "./store/job/job.feature";
import { JobService } from "./services/job.service";

@NgModule({
  declarations: [
    ProposalComponent,
    ProposalFormComponent,
    ProposalListComponent,
    HistoryComponent,
    ProposalHistoryComponent
  ],
  imports: [
    SharedModule,
    ProposalRoutingModule,
    EffectsModule.forFeature([
      JobEffects
    ]),
    StoreModule.forFeature(jobFeature),
  ],
  providers: [
    JobService
  ]
})
export class ProposalModule {
}
