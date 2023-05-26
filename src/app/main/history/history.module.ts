import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { HistoryComponent } from "./history.component";
import { HistoryRoutingModule } from "./history-routing.module";

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    HistoryRoutingModule,
    SharedModule
  ],
  providers: []
})
export class HistoryModule {
}
