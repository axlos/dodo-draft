import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ProposalComponent } from "./proposal.component";
import { ProposalRoutingModule } from "./proposal-routing.module";

@NgModule({
  declarations: [
    ProposalComponent
  ],
  imports: [
    ProposalRoutingModule,
    SharedModule
  ],
  providers: []
})
export class ProposalModule {
}
