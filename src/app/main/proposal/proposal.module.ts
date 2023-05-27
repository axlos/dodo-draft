import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { ProposalComponent } from "./proposal.component";
import { ProposalRoutingModule } from "./proposal-routing.module";
import { ProposalFormComponent } from "./components/profile-form/proposal-form.component";
import { ProposalListComponent } from "./components/proposal-list/proposal-list.component";

@NgModule({
  declarations: [
    ProposalComponent,
    ProposalFormComponent,
    ProposalListComponent
  ],
  imports: [
    ProposalRoutingModule,
    SharedModule
  ],
  providers: []
})
export class ProposalModule {
}
