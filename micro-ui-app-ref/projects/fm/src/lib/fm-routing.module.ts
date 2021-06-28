import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views/views.component';
import { RealtimeComponent } from './realtime/realtime.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'realtime', component: RealtimeComponent },
  { path: 'views', component: ViewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FmRoutingModule {
}

