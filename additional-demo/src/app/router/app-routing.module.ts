import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../components/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      // { path: '', redirectTo: '/skins', pathMatch: 'full'},
      // { path: 'dashboard', component: DashboardComponent }
  ] },

  // { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
