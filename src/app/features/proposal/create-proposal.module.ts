import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { CreateProposalComponent } from "./containers/create-proposal.component";
import { CreateProposalRoutingModule } from "./create-proposal-routing.module";
import { ProposalFormComponent } from "./components/profile-form/proposal-form.component";
import { ProposalListComponent } from "./components/proposal-list/proposal-list.component";

@NgModule({
  declarations: [
    CreateProposalComponent,
    ProposalFormComponent,
    ProposalListComponent
  ],
  imports: [
    CreateProposalRoutingModule,
    SharedModule
  ],
  providers: []
})
export class CreateProposalModule {
}
