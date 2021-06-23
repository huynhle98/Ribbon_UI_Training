import { NgModule } from '@angular/core';
import { FmComponent } from './fm.component';
import { HomeComponent } from './home/home.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { ViewsComponent } from './views/views.component';
import { FmRoutingModule } from './fm-routing.module';

@NgModule({
  declarations: [FmComponent, HomeComponent, RealtimeComponent, ViewsComponent],
  imports: [
    FmRoutingModule
  ],
  exports: [FmRoutingModule]
})
export class FmModule { }
